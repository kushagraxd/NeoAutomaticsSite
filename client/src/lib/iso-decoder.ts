/**
 * Reads an indexable insert designation according to ISO 1832.
 *
 * Only the positions defined by the standard are interpreted. Anything after
 * the corner position (chipbreaker/geometry suffixes such as -MA or -MK) is
 * manufacturer-specific, and is reported as such rather than guessed at.
 */

export type SegmentKey = 'shape' | 'clearance' | 'tolerance' | 'type' | 'size' | 'thickness' | 'corner' | 'geometry';

export interface Segment {
  key: SegmentKey;
  chars: string;
  label: string;
  meaning: string;
}

export const SEGMENT_COLOURS: Record<SegmentKey, string> = {
  shape: '#E3B55F',
  clearance: '#4FC7B6',
  tolerance: '#6E9BFF',
  type: '#A98BF5',
  size: '#F07E9A',
  thickness: '#F59E5B',
  corner: '#9BD35A',
  geometry: '#A1A1AA',
};

const SHAPE: Record<string, string> = {
  C: 'Rhombic, 80° corner',
  D: 'Rhombic, 55° corner',
  K: 'Parallelogram, 55° corner',
  L: 'Rectangular',
  R: 'Round',
  S: 'Square, 90° corner',
  T: 'Triangular, 60° corner',
  V: 'Rhombic, 35° corner',
  W: 'Trigon, 80° corner',
};

const CLEARANCE: Record<string, string> = {
  N: '0° — negative insert, usable on both faces',
  A: '3° clearance',
  B: '5° clearance',
  C: '7° clearance — positive insert',
  P: '11° clearance — positive insert',
  D: '15° clearance',
  E: '20° clearance',
  F: '25° clearance',
  G: '30° clearance',
};

const TOLERANCE: Record<string, string> = {
  M: 'Class M — sintered to size, the usual class for general turning',
  U: 'Class U — sintered, wider tolerance',
  G: 'Class G — ground, tighter inscribed-circle tolerance',
  E: 'Class E — ground, tight tolerance on circle and thickness',
  H: 'Class H — precision ground',
  C: 'Class C — precision ground',
  A: 'Class A — precision ground',
  F: 'Class F — precision ground',
  J: 'Class J — ground corner, sintered sides',
  K: 'Class K — ground corner, sintered sides',
  L: 'Class L — ground corner, sintered sides',
};

const TYPE: Record<string, string> = {
  A: 'Central hole, no chipbreaker',
  G: 'Central hole, chipbreaker on both faces',
  M: 'Central hole, chipbreaker on one face',
  N: 'No hole, no chipbreaker',
  R: 'No hole, chipbreaker on one face',
  T: 'Countersunk hole (40–60°), chipbreaker on one face',
  W: 'Countersunk hole (40–60°), no chipbreaker',
  H: 'Countersunk hole (70–90°), chipbreaker on one face',
  C: 'Countersunk hole (70–90°), no chipbreaker',
  U: 'Countersunk hole (40–60°), chipbreaker on both faces',
  X: 'Special design — see manufacturer drawing',
};

const THICKNESS: Record<string, string> = {
  '01': '1.59 mm', T1: '1.98 mm', '02': '2.38 mm', T2: '2.78 mm',
  '03': '3.18 mm', T3: '3.97 mm', '04': '4.76 mm', '05': '5.56 mm',
  '06': '6.35 mm', '07': '7.94 mm', '09': '9.52 mm',
};

const PATTERN =
  /^([CDKLRSTVW])([ABCDEFGNP])([ACEFGHJKLMU])([ACGHMNRTUWX])(\d{2})(\d{2}|T\d)(\d{2}|M0|MO)(.*)$/;

export function decodeInsert(input: string): Segment[] | null {
  const code = input.trim().toUpperCase().replace(/\s+/g, '');
  const m = PATTERN.exec(code);
  if (!m) return null;

  const [, shape, clearance, tolerance, type, size, thickness, corner, rest] = m;
  const round = shape === 'R';

  const segments: Segment[] = [
    { key: 'shape', chars: shape, label: 'Shape', meaning: SHAPE[shape] },
    { key: 'clearance', chars: clearance, label: 'Clearance angle', meaning: CLEARANCE[clearance] },
    { key: 'tolerance', chars: tolerance, label: 'Tolerance class', meaning: TOLERANCE[tolerance] },
    { key: 'type', chars: type, label: 'Hole & chipbreaker', meaning: TYPE[type] },
    {
      key: 'size',
      chars: size,
      label: round ? 'Diameter' : 'Cutting edge length',
      meaning: `${Number(size)} mm${round ? ' diameter' : ' nominal edge length'}`,
    },
    {
      key: 'thickness',
      chars: thickness,
      label: 'Thickness',
      meaning: THICKNESS[thickness] ?? 'Thickness code',
    },
    {
      key: 'corner',
      chars: corner,
      label: round ? 'Corner' : 'Corner radius',
      meaning:
        corner === 'M0' || corner === 'MO'
          ? 'Round insert — no corner radius'
          : corner === '00'
            ? 'Sharp corner'
            : `${(Number(corner) / 10).toFixed(1)} mm radius`,
    },
  ];

  const suffix = rest.replace(/^-/, '');
  if (suffix) {
    segments.push({
      key: 'geometry',
      chars: rest,
      label: 'Geometry / chipbreaker',
      meaning: 'Manufacturer-specific designation — confirmed at quotation',
    });
  }

  return segments;
}
