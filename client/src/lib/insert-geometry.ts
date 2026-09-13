import { decodeInsert } from './iso-decoder';

/**
 * Turns an insert code into drawable geometry.
 *
 * Everything here is read from the designation itself: the shape letter, the
 * clearance letter (negative inserts have straight walls, positive ones taper),
 * the hole/chipbreaker letter, and — for ISO 1832 codes — thickness and corner
 * radius. Nothing is inferred about grade, coating or performance.
 */

export type Pt = [number, number];
export type HoleType = 'none' | 'cylindrical' | 'countersunk';

export interface InsertSpec {
  /** Top-face outline in unit space, centred on 0,0, max radius ≈ 1, corners already rounded. */
  outline: Pt[];
  hole: HoleType;
  holeRadius: number;
  chipbreaker: boolean;
  positive: boolean;
  /** Wall height as a fraction of the half-size. */
  thickness: number;
  /** In-plane presentation angle, degrees. */
  rotation: number;
}

const rad = (d: number) => (d * Math.PI) / 180;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function normalise(pts: Pt[]): Pt[] {
  const m = Math.max(...pts.map(([x, y]) => Math.hypot(x, y))) || 1;
  return pts.map(([x, y]) => [x / m, y / m]);
}

const regular = (n: number, startDeg: number): Pt[] =>
  Array.from({ length: n }, (_, i) => {
    const a = rad(startDeg + (360 / n) * i);
    return [Math.cos(a), Math.sin(a)] as Pt;
  });

/** Rhombus whose acute corners sit left and right. */
const rhombus = (acute: number): Pt[] => {
  const x = Math.cos(rad(acute / 2));
  const y = Math.sin(rad(acute / 2));
  return normalise([[-x, 0], [0, -y], [x, 0], [0, y]]);
};

/** Trigon: three 80° cutting corners joined by shallow 160° bends. */
const trigon = (): Pt[] => {
  const pts: Pt[] = [];
  for (let i = 0; i < 3; i++) {
    const a = -90 + 120 * i;
    pts.push([Math.cos(rad(a)), Math.sin(rad(a))]);
    pts.push([0.66 * Math.cos(rad(a + 60)), 0.66 * Math.sin(rad(a + 60))]);
  }
  return pts;
};

const parallelogram = (angle: number, w: number, h: number): Pt[] => {
  const s = h / Math.tan(rad(angle));
  return normalise([[-w + s, -h], [w + s, -h], [w - s, h], [-w - s, h]]);
};

/** Grooving insert with a cutting head at each end and a clamping waist. */
const BONE: Pt[] = normalise([
  [-1, -0.19], [-0.74, -0.19], [-0.66, -0.12], [0.66, -0.12], [0.74, -0.19], [1, -0.19],
  [1, 0.19], [0.74, 0.19], [0.66, 0.12], [-0.66, 0.12], [-0.74, 0.19], [-1, 0.19],
]);

/** Laydown threading insert: a 60° profile tooth at each corner. */
function toothed(base: Pt[]): Pt[] {
  const out: Pt[] = [];
  const n = base.length;
  const lerp = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  for (let i = 0; i < n; i++) {
    const v = base[i];
    out.push(lerp(v, base[(i - 1 + n) % n], 0.16));
    out.push([v[0] * 1.1, v[1] * 1.1]);
    out.push(lerp(v, base[(i + 1) % n], 0.16));
  }
  return normalise(out);
}

const signedArea = (pts: Pt[]) =>
  pts.reduce((a, p, i) => {
    const q = pts[(i + 1) % pts.length];
    return a + p[0] * q[1] - q[0] * p[1];
  }, 0) / 2;

/** Rounds each convex corner with a true circular fillet; concave corners are left sharp. */
function fillet(pts: Pt[], r: number, steps = 5): Pt[] {
  if (r <= 0.001) return pts;
  const orientation = Math.sign(signedArea(pts));
  const out: Pt[] = [];
  const n = pts.length;

  for (let i = 0; i < n; i++) {
    const v = pts[i];
    const p = pts[(i - 1 + n) % n];
    const q = pts[(i + 1) % n];

    const cross = (v[0] - p[0]) * (q[1] - v[1]) - (v[1] - p[1]) * (q[0] - v[0]);
    if (Math.sign(cross) !== orientation) {
      out.push(v);
      continue;
    }

    const l1 = Math.hypot(p[0] - v[0], p[1] - v[1]);
    const l2 = Math.hypot(q[0] - v[0], q[1] - v[1]);
    const u1: Pt = [(p[0] - v[0]) / l1, (p[1] - v[1]) / l1];
    const u2: Pt = [(q[0] - v[0]) / l2, (q[1] - v[1]) / l2];
    const theta = Math.acos(clamp(u1[0] * u2[0] + u1[1] * u2[1], -1, 1));
    if (theta > rad(175)) {
      out.push(v);
      continue;
    }

    let d = r / Math.tan(theta / 2);
    let rr = r;
    const maxD = 0.45 * Math.min(l1, l2);
    if (d > maxD) {
      d = maxD;
      rr = d * Math.tan(theta / 2);
    }

    const p1: Pt = [v[0] + u1[0] * d, v[1] + u1[1] * d];
    const p2: Pt = [v[0] + u2[0] * d, v[1] + u2[1] * d];
    const bx = u1[0] + u2[0];
    const by = u1[1] + u2[1];
    const bl = Math.hypot(bx, by) || 1;
    const cd = rr / Math.sin(theta / 2);
    const c: Pt = [v[0] + (bx / bl) * cd, v[1] + (by / bl) * cd];

    const a1 = Math.atan2(p1[1] - c[1], p1[0] - c[0]);
    let delta = Math.atan2(p2[1] - c[1], p2[0] - c[0]) - a1;
    while (delta > Math.PI) delta -= 2 * Math.PI;
    while (delta < -Math.PI) delta += 2 * Math.PI;

    for (let s = 0; s <= steps; s++) {
      const a = a1 + delta * (s / steps);
      out.push([c[0] + Math.cos(a) * rr, c[1] + Math.sin(a) * rr]);
    }
  }
  return out;
}

// ISO 1832 position 4 — fixing and chipbreaker.
const HOLE: Record<string, HoleType> = {
  A: 'cylindrical', G: 'cylindrical', M: 'cylindrical',
  B: 'countersunk', C: 'countersunk', H: 'countersunk', J: 'countersunk',
  T: 'countersunk', U: 'countersunk', W: 'countersunk', X: 'countersunk',
  N: 'none', R: 'none',
};
const CHIPBREAKER = new Set(['G', 'H', 'J', 'M', 'R', 'T', 'U', 'X']);

export function insertSpec(rawCode: string, rawFamily?: string): InsertSpec {
  const code = rawCode.trim().toUpperCase();
  const family = (rawFamily ?? code.match(/^\d*[A-Z]+/)?.[0] ?? '').toUpperCase();
  const letters = code.replace(/^\d+/, '');

  if (family === 'MGMN') {
    return { outline: fillet(BONE, 0.05), hole: 'none', holeRadius: 0, chipbreaker: true, positive: true, thickness: 0.2, rotation: -16 };
  }
  if (family === 'TDC') {
    return { outline: fillet(parallelogram(62, 1, 0.13), 0.03), hole: 'none', holeRadius: 0, chipbreaker: true, positive: true, thickness: 0.18, rotation: -14 };
  }
  if (family === '16ER' || family === '16IR') {
    return { outline: fillet(toothed(regular(3, -90)), 0.015), hole: 'cylindrical', holeRadius: 0.19, chipbreaker: true, positive: true, thickness: 0.22, rotation: family === '16IR' ? 180 : 0 };
  }

  const segments = decodeInsert(code);
  const meaning = (key: string) => segments?.find((s) => s.key === key)?.meaning ?? '';
  const thicknessMm = parseFloat(meaning('thickness'));
  const cornerMm = parseFloat(meaning('corner'));
  const thickness = Number.isFinite(thicknessMm) ? clamp(thicknessMm / 18, 0.14, 0.34) : 0.22;
  const corner = segments ? (Number.isFinite(cornerMm) ? clamp(cornerMm / 6, 0.025, 0.2) : 0.025) : 0.09;

  let base: Pt[];
  let rotation = 0;
  let holeRadius = 0.2;
  let round = false;

  // Families like 3PKT / 4NKT name their corner count with a leading digit.
  const lead = /^\d/.test(family) ? family[0] : letters[0];
  switch (lead) {
    case '3': case 'T': base = regular(3, -90); break;
    case 'C': base = rhombus(80); rotation = -30; break;
    case 'M': case 'Q': base = rhombus(86); rotation = -30; break;
    case 'E': base = rhombus(75); rotation = -30; break;
    case 'D': base = rhombus(55); rotation = -30; holeRadius = 0.17; break;
    case 'V': base = rhombus(35); rotation = -30; holeRadius = 0.13; break;
    case 'W': base = trigon(); break;
    case 'R': base = regular(48, 0); round = true; holeRadius = 0.24; break;
    case 'P': base = regular(5, -90); break;
    case 'H': base = regular(6, 0); break;
    case 'O': base = regular(8, 22.5); break;
    case 'L': base = normalise([[-1, -0.46], [1, -0.46], [1, 0.46], [-1, 0.46]]); rotation = -14; holeRadius = 0.15; break;
    case 'A': base = parallelogram(85, 1, 0.55); rotation = -14; holeRadius = 0.16; break;
    case 'B': base = parallelogram(82, 1, 0.55); rotation = -14; holeRadius = 0.16; break;
    case 'K': base = parallelogram(55, 1, 0.5); rotation = -14; holeRadius = 0.14; break;
    case 'J': base = parallelogram(85, 1, 0.5); rotation = -14; holeRadius = 0.15; break;
    case 'X': base = parallelogram(78, 1, 0.5); rotation = -14; holeRadius = 0.15; break;
    default: base = regular(4, 45); rotation = 10;
  }

  const clearance = letters[1];
  const type = letters[3];
  const positive = Boolean(clearance) && clearance !== 'N';
  const hole: HoleType = HOLE[type] ?? 'countersunk';
  const chipbreaker = type && type in HOLE ? CHIPBREAKER.has(type) : true;

  return { outline: round ? base : fillet(base, corner), hole, holeRadius, chipbreaker, positive, thickness, rotation };
}
