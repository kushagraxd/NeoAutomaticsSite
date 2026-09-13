import { useMemo } from 'react';
import { insertSpec, type Pt } from '../lib/insert-geometry';
import { TONES } from '../lib/category-tones';
import type { CategoryId } from '../../../shared/catalog';

/*
 * Illustrated carbide insert, generated per product code.
 *
 * The top face is projected at a viewing tilt and extruded by the insert's
 * thickness. Positive inserts taper towards the base. Walls are drawn as the
 * convex hull of the top and bottom outlines, with the top face painted over,
 * so only the front walls show — one path regardless of corner detail.
 *
 * Shared gradients live once in <InsertRenderDefs/>, so a page of 200 renders
 * does not duplicate 1,400 gradient definitions.
 */

const CX = 100;
const CY = 72;
const S = 64;
const TILT = 0.56;

function project(pts: Pt[], rotation: number, scale = 1, dy = 0): Pt[] {
  const a = (rotation * Math.PI) / 180;
  const c = Math.cos(a);
  const s = Math.sin(a);
  return pts.map(([x, y]) => {
    const rx = (x * c - y * s) * scale;
    const ry = (x * s + y * c) * scale;
    return [CX + rx * S, CY + ry * S * TILT + dy] as Pt;
  });
}

function hull(points: Pt[]): Pt[] {
  const p = [...points].sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: Pt, a: Pt, b: Pt) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower: Pt[] = [];
  for (const q of p) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], q) <= 0) lower.pop();
    lower.push(q);
  }
  const upper: Pt[] = [];
  for (let i = p.length - 1; i >= 0; i--) {
    const q = p[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], q) <= 0) upper.pop();
    upper.push(q);
  }
  upper.pop();
  lower.pop();
  return lower.concat(upper);
}

const path = (pts: Pt[]) => `M${pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join('L')}Z`;

export interface InsertRenderProps {
  code: string;
  family?: string;
  category: CategoryId;
  className?: string;
  title?: string;
}

export default function InsertRender({ code, family, category, className, title }: InsertRenderProps) {
  const geo = useMemo(() => {
    const spec = insertSpec(code, family);
    const T = spec.thickness * S;
    const top = project(spec.outline, spec.rotation);
    const bottom = project(spec.outline, spec.rotation, spec.positive ? 0.86 : 1, T);
    return {
      spec,
      top: path(top),
      wall: path(hull([...top, ...bottom])),
      groove: spec.chipbreaker ? path(project(spec.outline, spec.rotation, 0.8)) : null,
      land: spec.chipbreaker ? path(project(spec.outline, spec.rotation, 0.63)) : null,
      baseY: Math.max(...bottom.map((pt) => pt[1])),
    };
  }, [code, family]);

  const { spec, top, wall, groove, land, baseY } = geo;
  const r = spec.holeRadius * S;

  return (
    <svg viewBox="0 0 200 170" className={className} role="img" aria-label={title ?? `${code} insert illustration`}>
      <ellipse cx={CX} cy={baseY + 10} rx={S * 1.15} ry={S * 0.24} fill={`url(#srt-shadow-${category})`} />
      <ellipse cx={CX} cy={baseY + 3} rx={S * 0.82} ry={S * 0.1} fill="url(#srt-contact)" />
      <path d={wall} fill="url(#srt-side)" />
      <path d={top} fill="url(#srt-top)" />
      {groove && <path d={groove} fill="url(#srt-groove)" />}
      {land && <path d={land} fill="url(#srt-land)" />}
      <path d={top} fill="url(#srt-sheen)" />
      {spec.hole === 'countersunk' && (
        <>
          <ellipse cx={CX} cy={CY} rx={r * 1.55} ry={r * 1.55 * TILT} fill="url(#srt-sink)" />
          <ellipse cx={CX} cy={CY} rx={r} ry={r * TILT} fill="#0b0c0e" />
        </>
      )}
      {spec.hole === 'cylindrical' && (
        <>
          <ellipse cx={CX} cy={CY} rx={r} ry={r * TILT} fill="#0b0c0e" stroke="rgba(255,255,255,.22)" strokeWidth=".8" />
          <ellipse cx={CX} cy={CY + r * TILT * 0.38} rx={r * 0.78} ry={r * TILT * 0.55} fill="#1c1f23" />
        </>
      )}
      <path d={top} fill="none" stroke="rgba(255,255,255,.38)" strokeWidth=".9" strokeLinejoin="round" />
    </svg>
  );
}

/** Mount once near the app root. Not display:none — hidden SVG gradients fail to paint in some browsers. */
export function InsertRenderDefs() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
      <defs>
        <linearGradient id="srt-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8d9299" />
          <stop offset=".45" stopColor="#60656c" />
          <stop offset="1" stopColor="#373a40" />
        </linearGradient>
        <linearGradient id="srt-side" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#474b51" />
          <stop offset=".5" stopColor="#2a2d32" />
          <stop offset="1" stopColor="#16181b" />
        </linearGradient>
        <linearGradient id="srt-groove" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2a2d32" />
          <stop offset="1" stopColor="#44484e" />
        </linearGradient>
        <linearGradient id="srt-land" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a4a9b1" />
          <stop offset=".5" stopColor="#6d727a" />
          <stop offset="1" stopColor="#42464c" />
        </linearGradient>
        <linearGradient id="srt-sheen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity=".32" />
          <stop offset=".6" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="srt-sink" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#1a1c1f" />
          <stop offset=".55" stopColor="#3a3e44" />
          <stop offset="1" stopColor="#7a8088" />
        </radialGradient>
        <radialGradient id="srt-contact" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#000" stopOpacity=".45" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        {Object.entries(TONES).map(([id, t]) => (
          <radialGradient key={id} id={`srt-shadow-${id}`} cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor={`rgb(${t.rgb})`} stopOpacity=".42" />
            <stop offset="1" stopColor={`rgb(${t.rgb})`} stopOpacity="0" />
          </radialGradient>
        ))}
      </defs>
    </svg>
  );
}
