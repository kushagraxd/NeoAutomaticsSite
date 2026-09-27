import type { ReactNode } from 'react';
import Reveal from '../reveal';

export interface SectionHeaderProps {
  id: string;
  title: ReactNode;
  lead: ReactNode;
  /** Rendered under the lead, e.g. a search field. */
  children?: ReactNode;
}

/** Heading left, supporting line right, bottoms aligned; stacked below 1024 px. */
export default function SectionHeader({ id, title, lead, children }: SectionHeaderProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
      <Reveal>
        <h2 id={id} className="t-h2">
          {title}
        </h2>
      </Reveal>
      <Reveal delay={80}>
        <p className="t-lead max-w-xl">{lead}</p>
        {children}
      </Reveal>
    </div>
  );
}
