import type { ComponentType } from 'react';
import LayeredVisual, { Layer } from '../layered-visual';
import type { CategoryId } from '../../../../shared/catalog';

/*
 * Animated drawings for the enquiry-led categories. Each is a set of flat
 * layers in a perspective scene (see layered-visual.tsx) with motion that
 * explains the category — generic forms, not a specific product, supplier or
 * claimed geometry. Carbide parts reuse the metallic gradients from
 * InsertRenderDefs so they read as the same material as the catalogue.
 */

export interface EnquiryVisualProps {
  active: boolean;
}

const LINE = 'stroke-ink';
const FAINT = 'stroke-ink-muted';

function Dimension({ x1, x2, y, text }: { x1: number; x2: number; y: number; text: string }) {
  return (
    <g>
      <path className={`lv-grow-x ${FAINT}`} strokeWidth="1" d={`M${x1} ${y}H${x2}M${x1} ${y - 5}V${y + 5}M${x2} ${y - 5}V${y + 5}`} />
      <rect x={(x1 + x2) / 2 - 20} y={y - 7} width="40" height="14" className="lv-fade fill-surface-stage" />
      <text x={(x1 + x2) / 2} y={y + 3.5} textAnchor="middle" className="lv-fade fill-ink-muted font-mono" fontSize="10">
        {text}
      </text>
    </g>
  );
}

/* ------------------------------------------------------------ Mining */

/** A carbide button in side elevation: shaded cylinder body and a tip profile. */
function Button({ cx, tip }: { cx: number; tip: string }) {
  return (
    <g>
      <path d={`M${cx - 22} 100V153a3 3 0 0 0 3 3H${cx + 19}a3 3 0 0 0 3-3V100Z`} fill="url(#srt-side)" />
      <path d={`${tip}Z`} fill="url(#srt-top)" />
      <path d={`M${cx - 16} 104V150`} stroke="rgba(255,255,255,.28)" strokeWidth="2" />
      <path d={`${tip}M${cx - 22} 100V153a3 3 0 0 0 3 3H${cx + 19}a3 3 0 0 0 3-3V100`} className={LINE} strokeWidth="1.25" />
    </g>
  );
}

/** Spherical, ballistic and conical tips on separate planes: they part and regroup in depth. */
function Mining({ active }: EnquiryVisualProps) {
  return (
    <LayeredVisual label="Carbide mining buttons with spherical, ballistic and conical tips" active={active} tilt={[10, -20]}>
      <Layer z={0}>
        <path d="M24 158H296" className={FAINT} strokeWidth="1" />
        {[80, 160, 240].map((cx) => (
          <ellipse key={cx} cx={cx} cy={160} rx="30" ry="5" className="lv-shadow fill-ink" opacity="0.14" />
        ))}
      </Layer>
      <Layer z={56} dx={-18} dy={-4} delay={60}>
        <Button cx={80} tip="M58 100a22 22 0 0 1 44 0" />
      </Layer>
      <Layer z={92} dy={-14} delay={160}>
        <Button cx={160} tip="M138 100C138 80 150 64 160 61C170 64 182 80 182 100" />
        <path d="M160 61V100" className="lv-fade stroke-accent-ink" strokeWidth="1.25" strokeDasharray="3 3" />
      </Layer>
      <Layer z={56} dx={18} dy={-4} delay={260}>
        <Button cx={240} tip="M218 100L236 65Q240 59 244 65L262 100" />
      </Layer>
      <Layer z={10} delay={420}>
        <Dimension x1={138} x2={182} y={178} text="Ø d" />
      </Layer>
    </LayeredVisual>
  );
}

/* ------------------------------------------------------------ Tube scraper */

/** The scraper travels along the tube; the surface behind it is left clean. */
function TubeScraper({ active }: EnquiryVisualProps) {
  return (
    <LayeredVisual label="Scraper insert travelling along a tube, leaving the surface clean behind it" active={active} tilt={[16, -10]}>
      <Layer z={0}>
        <defs>
          <pattern id="lv-hatch-tube" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <path d="M0 0V6" className={FAINT} strokeWidth="0.75" />
          </pattern>
        </defs>
        <path d="M20 96H300V108H20Z" fill="url(#lv-hatch-tube)" />
        <path d="M20 146H300V158H20Z" fill="url(#lv-hatch-tube)" />
        <path d="M20 108H300M20 146H300M20 158H300" className={LINE} strokeWidth="1.5" />
        <path d="M20 127H300" className={FAINT} strokeWidth="1" strokeDasharray="14 4 2 4" />
        <path d="M222 184H288M280 178L288 184L280 190" className={`lv-fade ${FAINT}`} strokeWidth="1.25" />
      </Layer>
      <Layer z={16} delay={80}>
        {/* Deposit on the surface, full length */}
        <path d="M20 96C34 90 44 91 56 94S80 90 96 93S122 91 134 94S152 91 166 94S190 90 206 93S232 91 246 94S270 90 286 93L300 95" className={FAINT} strokeWidth="1.5" />
        {/* Cleaned band, growing behind the scraper */}
        <g className="lv-clean">
          <rect x="20" y="84" width="280" height="12" className="fill-surface-stage" />
          <path d="M20 96H300" className="stroke-accent-ink" strokeWidth="2" />
        </g>
      </Layer>
      <Layer z={30} delay={120}>
        <path d="M20 16H300M20 20H300" className={FAINT} strokeWidth="0.75" opacity="0.7" />
      </Layer>
      <Layer z={58} delay={160}>
        <g className="lv-scraper">
          <path d="M134 20H166V64H134Z" className={`${LINE} fill-surface-card`} strokeWidth="1.5" />
          <circle cx="150" cy="42" r="5" className={FAINT} strokeWidth="1" />
          <path d="M136 64H164L158 90H142Z" fill="url(#srt-top)" />
          <path d="M136 64H164L158 90H142Z" className={LINE} strokeWidth="1.25" />
        </g>
      </Layer>
    </LayeredVisual>
  );
}

/* ------------------------------------------------------------ Special design */

const FORM = 'M66 56H218L244 82V122H176Q164 146 152 122H66Z';

/** Blueprint to product: the outline is drawn, dimensioned, then the part lifts off the sheet. */
function SpecialDesign({ active }: EnquiryVisualProps) {
  return (
    <LayeredVisual label="A special form insert drawn, dimensioned and made from its drawing" active={active} tilt={[18, -16]}>
      <Layer z={0}>
        <path d="M112 44V134M52 89H258" className={`lv-fade ${FAINT}`} strokeWidth="0.75" strokeDasharray="10 4 2 4" />
      </Layer>
      <Layer z={10} delay={60}>
        <path d={FORM} pathLength={1} className={`lv-draw ${LINE}`} strokeWidth="1.5" />
        <circle cx="112" cy="89" r="11" pathLength={1} className={`lv-draw ${LINE}`} strokeWidth="1.5" />
      </Layer>
      <Layer z={22} delay={500}>
        <path d="M164 136L196 160H226" className="lv-grow-x stroke-accent-ink" strokeWidth="1.25" />
        <text x="230" y="163.5" className="lv-fade fill-accent-ink font-mono" fontSize="10.5">
          R 3.0
        </text>
        <path d="M270 56V122M265 56H275M265 122H275" className={`lv-grow-y ${FAINT}`} strokeWidth="1" />
        <text x="280" y="93" className="lv-fade fill-ink-muted font-mono" fontSize="10">
          h
        </text>
        <Dimension x1={66} x2={244} y={180} text="L" />
      </Layer>
      <Layer z={64} dx={-12} dy={-16} delay={1100}>
        <g className="lv-product">
          <path d={FORM} fill="url(#srt-top)" />
          <path d={FORM} fill="url(#srt-sheen)" />
          <ellipse cx="112" cy="89" rx="11" ry="11" fill="#0b0c0e" />
          <path d={FORM} stroke="rgba(255,255,255,.35)" strokeWidth="0.9" />
        </g>
      </Layer>
    </LayeredVisual>
  );
}

/* ------------------------------------------------------------ Tool holder */

/*
 * Screw-clamp turning holder, top view. Parts separate along the clamping
 * screw's axis — out of the pocket, towards the viewer — which is the order
 * they come apart in practice: screw, insert, then seat.
 */
function ToolHolder({ active }: EnquiryVisualProps) {
  const at = 'translate(66 99) rotate(45)';
  return (
    <LayeredVisual label="Turning tool holder with its seat, insert and clamping screw separating along the screw axis" active={active} tilt={[36, -8]}>
      <Layer z={0}>
        <path d="M64 78H292V128H44V98Z" className={`${LINE} fill-surface-card`} strokeWidth="1.5" />
        <path d="M120 78V128M292 78V128" className={FAINT} strokeWidth="1" />
        <g transform={at}>
          <path d="M-25 0L0 -20.5L25 0L0 20.5Z" className={FAINT} strokeWidth="1" strokeDasharray="3 3" />
        </g>
        <Dimension x1={44} x2={292} y={162} text="L1" />
      </Layer>
      <Layer z={18} dy={-2} delay={120} fromY={-18}>
        <g transform={at}>
          <path d="M-23.5 0L0 -19L23.5 0L0 19Z" className={`${FAINT} fill-rule-strong`} strokeWidth="1" />
        </g>
      </Layer>
      <Layer z={42} dy={-6} delay={260} fromY={-18}>
        <g transform={at}>
          <path d="M-21 0L0 -17L21 0L0 17Z" fill="url(#srt-top)" />
          <path d="M-21 0L0 -17L21 0L0 17Z" stroke="rgba(255,255,255,.4)" strokeWidth="0.9" />
          <circle r="5.5" fill="#1c1f23" />
        </g>
      </Layer>
      <Layer z={70} dy={-12} delay={400} fromY={-18}>
        <g transform={at}>
          <circle r="4.6" fill="url(#srt-side)" />
          <circle r="4.6" className={LINE} strokeWidth="1" />
          <path d="M-2.4 -2.4L2.4 2.4" stroke="#0b0c0e" strokeWidth="1.2" />
        </g>
      </Layer>
    </LayeredVisual>
  );
}

export const ENQUIRY_ILLUSTRATIONS: Partial<Record<CategoryId, ComponentType<EnquiryVisualProps>>> = {
  mining: Mining,
  'tube-scraper': TubeScraper,
  special: SpecialDesign,
  tooling: ToolHolder,
};
