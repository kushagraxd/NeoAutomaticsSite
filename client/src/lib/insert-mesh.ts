import { insertSpec, type Pt } from './insert-geometry';

/*
 * Solid 3D mesh for an insert, generated from the same ISO-derived outline the
 * 2D illustrations use (insert-geometry.ts). A representative model — the
 * outline, clearance, hole type and chipbreaker come from the designation;
 * the bevel and chipbreaker proportions are stylised.
 *
 * The outline is sampled in polar form (every insert outline is star-shaped
 * about its centre), then a cross-section profile is swept around it:
 * side wall → bevelled edge → land → chipbreaker groove → plateau → hole.
 * Each band keeps its own vertices, so creases stay sharp while shading
 * around the outline stays smooth.
 */

export interface InsertMesh {
  positions: Float32Array;
  normals: Float32Array;
  /** Per-vertex material tone: 1 = ground carbide, lower = shadowed recesses. */
  shades: Float32Array;
  count: number;
}

const SAMPLES = 144;

/** Distance from the centre to the outline along angle `a`. */
function rayRadius(poly: Pt[], a: number): number {
  const dx = Math.cos(a);
  const dy = Math.sin(a);
  let best = Infinity;
  for (let i = 0; i < poly.length; i++) {
    const [x1, y1] = poly[i];
    const [x2, y2] = poly[(i + 1) % poly.length];
    const ex = x2 - x1;
    const ey = y2 - y1;
    const den = dx * ey - dy * ex;
    if (Math.abs(den) < 1e-9) continue;
    const t = (x1 * ey - y1 * ex) / den;
    const u = (x1 * dy - y1 * dx) / den;
    if (t > 1e-6 && u >= -1e-6 && u <= 1 + 1e-6) best = Math.min(best, t);
  }
  return Number.isFinite(best) ? best : 0;
}

/** A ring of the profile: radius at sample i, and its height. */
interface Ring {
  radius: (i: number) => number;
  z: number;
}

export function buildInsertMesh(code: string, family?: string): InsertMesh {
  const spec = insertSpec(code, family);
  const rot = (spec.rotation * Math.PI) / 180;
  const angles = Array.from({ length: SAMPLES }, (_, i) => (i / SAMPLES) * Math.PI * 2);
  const outer = angles.map((a) => rayRadius(spec.outline, a));

  const T = spec.thickness;
  const top = T / 2;
  const bevel = Math.min(0.03, T * 0.16);
  const groove = T * 0.16;
  const base = spec.positive ? 0.86 : 1; // positive inserts taper towards the seat

  const scaled = (k: number) => (i: number) => outer[i] * k;
  const hole = spec.hole === 'none' ? 0 : spec.holeRadius;
  // Never let the hole reach the plateau ring on slender outlines.
  const holeAt = (r: number) => (i: number) => Math.min(r, outer[i] * 0.52);

  const profile: Array<{ ring: Ring; shade: number }> = [
    { ring: { radius: scaled(base), z: -top }, shade: 0.8 },
    { ring: { radius: scaled(1), z: top - bevel }, shade: 1.18 }, // side wall
    { ring: { radius: scaled(0.965), z: top }, shade: 1.0 }, // bevelled cutting edge
  ];
  if (spec.chipbreaker) {
    profile.push(
      { ring: { radius: scaled(0.86), z: top }, shade: 0.8 }, // land
      { ring: { radius: scaled(0.77), z: top - groove }, shade: 0.9 },
      { ring: { radius: scaled(0.67), z: top - groove * 0.3 }, shade: 1.0 }, // groove
      { ring: { radius: scaled(0.6), z: top }, shade: 1.0 },
    );
  }
  if (hole > 0) {
    const lip = spec.hole === 'countersunk' ? hole * 1.5 : hole * 1.08;
    profile.push(
      { ring: { radius: holeAt(lip), z: top }, shade: 0.95 }, // plateau
      { ring: { radius: holeAt(hole), z: spec.hole === 'countersunk' ? top - T * 0.38 : top - 0.012 }, shade: 0.55 }, // lip / countersink
      { ring: { radius: holeAt(hole), z: -top + 0.012 }, shade: 0.3 }, // hole wall
    );
  } else {
    profile.push({ ring: { radius: () => 0, z: top }, shade: 1.0 });
  }

  const bottom: Array<{ ring: Ring; shade: number }> = [
    { ring: { radius: scaled(base), z: -top }, shade: 0.6 },
    { ring: { radius: hole > 0 ? holeAt(hole) : () => 0, z: -top }, shade: 0.6 },
  ];

  const pos: number[] = [];
  const nor: number[] = [];
  const shd: number[] = [];

  const point = (ring: Ring, i: number): [number, number, number] => {
    const a = angles[i % SAMPLES] + rot;
    const r = ring.radius(i % SAMPLES);
    return [r * Math.cos(a), r * Math.sin(a), ring.z];
  };

  const band = (a: Ring, b: Ring, shade: number) => {
    const A = Array.from({ length: SAMPLES }, (_, i) => point(a, i));
    const B = Array.from({ length: SAMPLES }, (_, i) => point(b, i));
    // One face normal per quad, then averaged per column: smooth around the outline, sharp between bands.
    const face = A.map((_, i) => {
      const j = (i + 1) % SAMPLES;
      const u = sub(A[j], A[i]);
      let v = sub(B[i], A[i]);
      if (len(v) < 1e-6) v = sub(B[j], A[i]);
      return normalise(cross(u, v));
    });
    const col = face.map((n, i) => normalise(add(n, face[(i - 1 + SAMPLES) % SAMPLES])));
    for (let i = 0; i < SAMPLES; i++) {
      const j = (i + 1) % SAMPLES;
      const quad: Array<[number, number, number]> = [A[i], A[j], B[j], A[i], B[j], B[i]];
      const quadN = [col[i], col[j], col[j], col[i], col[j], col[i]];
      quad.forEach((p, k) => {
        pos.push(...p);
        nor.push(...quadN[k]);
        shd.push(shade);
      });
    }
  };

  for (let k = 0; k < profile.length - 1; k++) band(profile[k].ring, profile[k + 1].ring, profile[k + 1].shade);
  band(bottom[0].ring, bottom[1].ring, bottom[1].shade);

  return {
    positions: new Float32Array(pos),
    normals: new Float32Array(nor),
    shades: new Float32Array(shd),
    count: pos.length / 3,
  };
}

type V3 = [number, number, number];
const sub = (a: V3, b: V3): V3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const add = (a: V3, b: V3): V3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
const cross = (a: V3, b: V3): V3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const len = (a: V3) => Math.hypot(a[0], a[1], a[2]);
const normalise = (a: V3): V3 => {
  const l = len(a) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
};
