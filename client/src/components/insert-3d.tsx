import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import InsertRender from './insert-render';
import { buildInsertMesh } from '../lib/insert-mesh';
import { useReducedMotion } from '../lib/useReducedMotion';
import type { CategoryId } from '../../../shared/catalog';

/*
 * A representative insert as a real 3D object: a procedural mesh (see
 * lib/insert-mesh.ts) drawn with plain WebGL — no 3D library.
 *
 * - Turns slowly about the vertical axis, so the side wall and thickness come
 *   round; lights stay fixed, so shading and highlights change as it turns.
 * - Drag sideways to inspect; the turn pauses while dragging and resumes after.
 *   Vertical swipes still scroll the page (touch-action: pan-y).
 * - WebGL starts only when the card nears the viewport and renders only while
 *   visible; resolution is capped at 1.75× on dense screens.
 * - Reduced motion: one still three-quarter view.
 * - No WebGL: the 2D illustration stays in place. It is also shown until the
 *   first 3D frame is ready, so the card never flashes empty.
 */

export interface Insert3DProps {
  code: string;
  family: string;
  category: CategoryId;
  /** Short operation name for the accessible label, e.g. "turning". */
  operation: string;
  /** Called on a tap or click without a drag — lets the card's link keep working over the canvas. */
  onSelect?: () => void;
}

const MAX_DPR = 1.75;
const TURN_SECONDS = 16;
const TILT = -0.72; // face tipped back ≈ 41°, so the top face, hole and chipbreaker read, and the side wall shows as it turns
const VIEW_PITCH = 0.36;
const DISTANCE = 4.9;
const REST_YAW = 0.75; // three-quarter view

const VERT = `
attribute vec3 aPos;
attribute vec3 aNor;
attribute float aShade;
uniform mat4 uMVP;
uniform mat4 uMV;
uniform mat3 uNM;
varying vec3 vN;
varying vec3 vP;
varying float vS;
void main() {
  vec4 p = uMV * vec4(aPos, 1.0);
  vP = p.xyz;
  vN = uNM * aNor;
  vS = aShade;
  gl_Position = uMVP * vec4(aPos, 1.0);
}`;

const FRAG = `
precision mediump float;
varying vec3 vN;
varying vec3 vP;
varying float vS;
uniform vec3 uBase;
void main() {
  vec3 v = normalize(-vP);
  vec3 n = normalize(vN);
  // Any surface we can see faces the camera, whatever the triangle winding.
  if (dot(n, v) < 0.0) n = -n;
  // Studio lighting: a soft key from front-left above, a cool fill from the right, a rim from behind.
  vec3 key = normalize(vec3(-0.35, 0.55, 0.8));
  vec3 fill = normalize(vec3(0.8, 0.1, 0.5));
  vec3 back = normalize(vec3(0.2, 0.6, -0.8));
  float diffuse = max(dot(n, key), 0.0) * 0.8 + max(dot(n, fill), 0.0) * 0.32 + max(dot(n, back), 0.0) * 0.18;
  float spec = pow(max(dot(n, normalize(key + v)), 0.0), 60.0) * 0.75
             + pow(max(dot(n, normalize(fill + v)), 0.0), 24.0) * 0.22;
  float rim = pow(1.0 - max(dot(n, v), 0.0), 3.0) * 0.28;
  vec3 colour = uBase * vS * (0.32 + diffuse) + vec3(spec + rim) * clamp(vS, 0.35, 1.0);
  gl_FragColor = vec4(colour, 1.0);
}`;

type M4 = Float32Array;
const perspective = (fov: number, aspect: number, near: number, far: number): M4 => {
  const f = 1 / Math.tan(fov / 2);
  const nf = 1 / (near - far);
  return new Float32Array([f / aspect, 0, 0, 0, 0, f, 0, 0, 0, 0, (far + near) * nf, -1, 0, 0, 2 * far * near * nf, 0]);
};
const multiply = (a: M4, b: M4): M4 => {
  const o = new Float32Array(16);
  for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) {
    let s = 0;
    for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k];
    o[c * 4 + r] = s;
  }
  return o;
};
const rotX = (t: number): M4 => {
  const c = Math.cos(t), s = Math.sin(t);
  return new Float32Array([1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1]);
};
const rotY = (t: number): M4 => {
  const c = Math.cos(t), s = Math.sin(t);
  return new Float32Array([c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1]);
};
const translate = (x: number, y: number, z: number): M4 => new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1]);
const normalMatrix = (m: M4) => new Float32Array([m[0], m[1], m[2], m[4], m[5], m[6], m[8], m[9], m[10]]);

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const s = gl.createShader(type);
  if (!s) return null;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
}

export default function Insert3D({ code, family, category, operation, onSelect }: Insert3DProps) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const shadowRef = useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const [near, setNear] = useState(false);
  const [status, setStatus] = useState<'pending' | 'ready' | 'unsupported'>('pending');
  const selectRef = useRef(onSelect);
  selectRef.current = onSelect;

  // Lazy start: only create a WebGL context once the card approaches the viewport.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setNear(true);
        io.disconnect();
      }
    }, { rootMargin: '250px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!near) return;
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const gl = canvas.getContext('webgl', { alpha: true, antialias: true, premultipliedAlpha: true }) as WebGLRenderingContext | null;
    const vs = gl && compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = gl && compile(gl, gl.FRAGMENT_SHADER, FRAG);
    const prog = gl && vs && fs ? gl.createProgram() : null;
    if (!gl || !vs || !fs || !prog) {
      setStatus('unsupported');
      return;
    }
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      setStatus('unsupported');
      return;
    }
    gl.useProgram(prog);

    const mesh = buildInsertMesh(code, family);
    const attrib = (name: string, data: Float32Array, size: number) => {
      const buf = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      const loc = gl.getAttribLocation(prog, name);
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
      return buf;
    };
    const buffers = [attrib('aPos', mesh.positions, 3), attrib('aNor', mesh.normals, 3), attrib('aShade', mesh.shades, 1)];
    const uMVP = gl.getUniformLocation(prog, 'uMVP');
    const uMV = gl.getUniformLocation(prog, 'uMV');
    const uNM = gl.getUniformLocation(prog, 'uNM');
    gl.uniform3f(gl.getUniformLocation(prog, 'uBase'), 0.52, 0.54, 0.57); // ground carbide
    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);

    let width = 0;
    let height = 0;
    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      width = Math.max(1, Math.round(wrap.clientWidth * dpr));
      height = Math.max(1, Math.round(wrap.clientHeight * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    // Each model starts at its own angle so the cards don't turn in lockstep; reduced motion keeps the three-quarter view.
    const phase = reduced ? 0 : (Array.from(code).reduce((h, ch) => h + ch.charCodeAt(0), 0) % 7) * 0.9;
    let yaw = REST_YAW + phase;
    const draw = () => {
      resize();
      gl.viewport(0, 0, width, height);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      const proj = perspective(0.5, width / height, 0.1, 20);
      const view = multiply(translate(0, 0, -DISTANCE), rotX(VIEW_PITCH));
      const model = multiply(rotY(yaw), rotX(TILT));
      const mv = multiply(view, model);
      gl.uniformMatrix4fv(uMVP, false, multiply(proj, mv));
      gl.uniformMatrix4fv(uMV, false, mv);
      gl.uniformMatrix3fv(uNM, false, normalMatrix(mv));
      gl.drawArrays(gl.TRIANGLES, 0, mesh.count);
      // The floor shadow narrows as the insert turns edge-on.
      if (shadowRef.current) shadowRef.current.style.transform = `translateX(-50%) scaleX(${0.72 + 0.28 * Math.abs(Math.cos(yaw))})`;
    };

    draw();
    setStatus('ready');

    // Continuous turn only while visible and motion is allowed.
    let visible = true;
    let frame = 0;
    let last = 0;
    let dragging = false;
    let resumeAt = 0;
    const tick = (t: number) => {
      frame = 0;
      const dt = last ? Math.min(0.05, (t - last) / 1000) : 0;
      last = t;
      if (!dragging && t >= resumeAt) yaw += (dt * Math.PI * 2) / TURN_SECONDS;
      draw();
      if (visible && !reduced) frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!frame && visible && !reduced) {
        last = 0;
        frame = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };
    const io =
      typeof IntersectionObserver !== 'undefined'
        ? new IntersectionObserver(([e]) => {
            visible = e.isIntersecting;
            if (visible) start();
            else stop();
          })
        : null;
    io?.observe(wrap);
    start();

    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(() => !frame && draw()) : null;
    ro?.observe(wrap);

    // Drag to inspect.
    let lastX = 0;
    let travel = 0;
    const down = (e: PointerEvent) => {
      dragging = true;
      travel = 0;
      lastX = e.clientX;
      canvas.setPointerCapture(e.pointerId);
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      travel += Math.abs(dx);
      yaw += dx * 0.012;
      lastX = e.clientX;
      if (!frame) draw();
    };
    const up = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      resumeAt = performance.now() + 1500;
      if (canvas.hasPointerCapture(e.pointerId)) canvas.releasePointerCapture(e.pointerId);
      // A tap rather than a drag opens the card, as the rest of the card does.
      if (e.type === 'pointerup' && travel < 6) selectRef.current?.();
    };
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);

    const lost = (e: Event) => {
      e.preventDefault();
      stop();
      setStatus('unsupported');
    };
    canvas.addEventListener('webglcontextlost', lost);

    return () => {
      stop();
      io?.disconnect();
      ro?.disconnect();
      canvas.removeEventListener('pointerdown', down);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up);
      canvas.removeEventListener('pointercancel', up);
      canvas.removeEventListener('webglcontextlost', lost);
      buffers.forEach((b) => gl.deleteBuffer(b));
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [near, code, family, reduced]);

  const label = reduced || status === 'unsupported'
    ? `Representative ${operation} insert, three-quarter view`
    : `Rotating representative ${operation} insert — drag to turn it`;

  return (
    // z-[1] lifts the scene above the card's stretched link so it can be dragged.
    <div ref={wrapRef} className="relative z-[1] h-full w-full" role="img" aria-label={label}>
      <span
        ref={shadowRef}
        className="pointer-events-none absolute bottom-[14%] left-1/2 h-[9%] w-[52%] rounded-[50%] bg-[radial-gradient(closest-side,rgba(40,33,22,0.28),transparent)]"
        style={{ transform: 'translateX(-50%)' }}
        aria-hidden="true"
      />
      {status !== 'ready' && (
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <InsertRender code={code} family={family} category={category} className="h-[82%] w-[82%] max-w-[320px]" />
        </div>
      )}
      {status !== 'unsupported' && (
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 h-full w-full cursor-grab touch-pan-y transition-opacity duration-300 active:cursor-grabbing ${status === 'ready' ? 'opacity-100' : 'opacity-0'}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
