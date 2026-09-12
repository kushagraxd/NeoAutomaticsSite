import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';
import InsertGlyph from '../components/insert-glyph';

export default function NotFound() {
  usePageMeta('Page not found', 'The page you were looking for could not be found.');

  return (
    <section className="py-24 md:py-32">
      <div className="shell max-w-xl text-center">
        <InsertGlyph shape="Triangular" className="mx-auto mb-7 h-20 w-20" />
        <p className="label mb-3 text-accent-ink">Error 404</p>
        <h1 className="text-h1">We could not find that page</h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
          The link may be out of date. You can search the catalogue by product code, or send us the
          requirement directly.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/products" className="btn-primary">
            Search the catalogue <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/quote" className="btn-outline">Request a Quote</Link>
        </div>
      </div>
    </section>
  );
}
