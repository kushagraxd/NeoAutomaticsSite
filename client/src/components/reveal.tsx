import type { ReactNode } from 'react';
import { useReveal } from '../lib/useReveal';

export interface RevealProps {
  children: ReactNode;
  /** Stagger in ms, for sequencing siblings. */
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article';
}

/**
 * Fades and lifts its children into place the first time they scroll into
 * view. Falls back to plain visible content when motion is reduced.
 */
export default function Reveal({ children, delay = 0, className = '', as = 'div' }: RevealProps) {
  const { ref, shown } = useReveal<HTMLDivElement>();
  const Tag = as as 'div';

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? 'reveal-in' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
