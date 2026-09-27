import { CtaLink } from '../cta';
import HeroVideo from '../hero-video';
import Reveal from '../reveal';
import { categories, totalProductCount } from '../../../../shared/catalog';
import { numberWord } from '../../lib/number-words';

const operationCount = categories.filter((c) => !c.enquiryOnly).length;

/**
 * Full-bleed hero: machining footage behind an ivory veil, copy centred.
 * The section has a fixed minimum height and the video is absolutely
 * positioned, so nothing shifts while it loads.
 */
export default function HomeHero() {
  return (
    <section className="hero-cinema" aria-labelledby="hero-title">
      <HeroVideo />
      <div className="hero-cinema-veil" aria-hidden="true" />

      <div className="shell relative flex flex-col items-center pb-24 pt-16 text-center md:pb-28 md:pt-20">
        <Reveal>
          <p className="t-kicker flex items-center justify-center gap-3 font-semibold text-ink-soft">
            <span className="hidden h-px w-8 bg-bronze sm:block" aria-hidden="true" />
            <span>
              Carbide inserts · Cutting tools<span className="hidden sm:inline"> · </span>
              <br className="sm:hidden" />
              Custom sourcing
            </span>
            <span className="hidden h-px w-8 bg-bronze sm:block" aria-hidden="true" />
          </p>
        </Reveal>

        <Reveal delay={80}>
          <h1 id="hero-title" className="t-display mx-auto mt-7">
            <span className="block">Find the right insert.</span>
            <span className="block text-ink-soft">Source it with confidence.</span>
          </h1>
        </Reveal>

        <Reveal delay={160}>
          <p className="t-lead mx-auto mt-7 max-w-[38rem] text-ink-soft">
            Browse {totalProductCount} listed codes across {numberWord(operationCount)} machining operations — or send us an ISO code,
            drawing, photograph or sample for a requirement-based quotation.
          </p>
        </Reveal>

        <Reveal delay={240} className="w-full sm:w-auto">
          <div className="mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <CtaLink href="/products" arrow="tile" className="w-full max-w-[20rem] sm:w-auto">
              Explore Products
            </CtaLink>
            <CtaLink href="/contact#enquiry" variant="secondary" className="w-full max-w-[20rem] sm:w-auto">
              Request a Quote
            </CtaLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
