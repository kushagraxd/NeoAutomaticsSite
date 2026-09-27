import { useEffect, useRef, useState, type CSSProperties, type ReactNode, type SVGProps } from 'react';
import { useReducedMotion } from '../lib/useReducedMotion';

/*
 * A 3D-style illustration made of flat SVG layers stacked in a CSS perspective
 * scene. It is not a 3D model: each layer is an ordinary drawing given its own
 * depth, so a tilt produces parallax.
 *
 * States (data-state):
 *   rest    before it scrolls into view — layers held back
 *   in      layers settle into the composed drawing (scroll entry)
 *   active  hover or keyboard focus on the parent — tilt and separate
 *   static  reduced motion — the composed drawing, no movement
 * Touch devices see the scroll-entry animation; nothing depends on hover.
 */

export interface LayeredVisualProps {
  /** Accessible description of the drawing. */
  label: string;
  /** True while the parent card is hovered or holds focus. */
  active: boolean;
  /** Scene tilt when active, in degrees: [rotateX, rotateY]. */
  tilt?: [number, number];
  className?: string;
  children: ReactNode;
}

export default function LayeredVisual({ label, active, tilt = [12, -14], className = '', children }: LayeredVisualProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setEntered(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setEntered(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  const state = reduced ? 'static' : !entered ? 'rest' : active ? 'active' : 'in';

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className={`lv ${className}`}
      data-state={state}
      style={{ '--tilt-x': `${tilt[0]}deg`, '--tilt-y': `${tilt[1]}deg` } as CSSProperties}
    >
      <div className="lv-scene">{children}</div>
    </div>
  );
}

export interface LayerProps extends Omit<SVGProps<SVGSVGElement>, 'style'> {
  /** Depth when active, px. */
  z?: number;
  /** Extra offset when active, px. */
  dx?: number;
  dy?: number;
  /** Entry stagger, ms. */
  delay?: number;
  /** Where the layer starts before entry, px (positive = from below). */
  fromY?: number;
}

/** One depth plane. Every layer shares the 320 × 200 drawing space so they align. */
export function Layer({ z = 0, dx = 0, dy = 0, delay = 0, fromY = 16, className = '', children, ...rest }: LayerProps) {
  return (
    <svg
      viewBox="0 0 320 200"
      className={`lv-layer ${className}`}
      style={{ '--z': `${z}px`, '--dx': `${dx}px`, '--dy': `${dy}px`, '--d': `${delay}ms`, '--from-y': `${fromY}px` } as CSSProperties}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}
