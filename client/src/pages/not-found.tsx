import { SearchX } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';
import { CtaLink } from '../components/cta';

export default function NotFound() {
  usePageMeta('Page not found', 'The page you were looking for could not be found.');

  return (
    <section className="section bg-surface" aria-labelledby="notfound-title">
      <div className="shell max-w-xl text-center">
        <span className="icon-tile mx-auto h-14 w-14 bg-surface-card">
          <SearchX className="h-6 w-6" aria-hidden="true" />
        </span>
        <p className="t-eyebrow mt-7">Error 404</p>
        <h1 id="notfound-title" className="t-h1 mt-3">
          We could not find that page
        </h1>
        <p className="t-lead mt-5">
          The link may be out of date. You can search the catalogue by product code, or send us the requirement directly.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <CtaLink href="/products" arrow="tile">
            Search the catalogue
          </CtaLink>
          <CtaLink href="/quote" variant="secondary">
            Request a Quote
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
