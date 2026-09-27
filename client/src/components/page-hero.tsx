import type { ReactNode } from 'react';
import Reveal from './reveal';

export interface PageHeroProps {
  /** Id for the h1, used to label the section. */
  id: string;
  title: ReactNode;
  lead?: ReactNode;
  /** Short sentence-case label above the title. */
  eyebrow?: ReactNode;
  /** Rendered above the eyebrow, e.g. a breadcrumb. */
  above?: ReactNode;
  /** Decorative background composition (see hero-backdrops.tsx). Hidden from assistive technology. */
  media?: ReactNode;
  /** Search field, actions or chips under the lead. */
  children?: ReactNode;
  size?: 'lg' | 'md' | 'sm';
  /** Title element; product pages use a mono code as the title. */
  titleClassName?: string;
}

const PADDING = {
  lg: 'py-20 md:py-28',
  md: 'py-16 md:py-20',
  sm: 'py-12 md:py-16',
};

/**
 * Centred hero for inner pages: copy over product-related media, with an
 * ivory veil strongest behind the text. No side images — the media sits
 * behind the content.
 */
export default function PageHero({ id, title, lead, eyebrow, above, media, children, size = 'lg', titleClassName = 't-h1' }: PageHeroProps) {
  return (
    <section className="page-hero" aria-labelledby={id}>
      {media && (
        <>
          <div className="page-hero-media" aria-hidden="true">
            {media}
          </div>
          <div className="page-hero-veil" aria-hidden="true" />
        </>
      )}
      <div className={`shell relative flex flex-col items-center text-center ${PADDING[size]}`}>
        {above}
        {eyebrow && (
          <Reveal>
            <p className="t-eyebrow">{eyebrow}</p>
          </Reveal>
        )}
        <Reveal delay={60}>
          <h1 id={id} className={`${titleClassName} mx-auto ${eyebrow ? 'mt-4' : ''} max-w-[22ch]`}>
            {title}
          </h1>
        </Reveal>
        {lead && (
          <Reveal delay={120}>
            <p className="t-lead mx-auto mt-5 max-w-[42rem]">{lead}</p>
          </Reveal>
        )}
        {children && (
          <Reveal delay={180} className="mt-9 w-full">
            {children}
          </Reveal>
        )}
      </div>
    </section>
  );
}
