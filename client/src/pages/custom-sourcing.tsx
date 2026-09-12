import { Link } from 'wouter';
import { ArrowRight, FileText, Camera, Hash, Ruler } from 'lucide-react';
import { usePageMeta } from '../lib/usePageMeta';
import InsertGlyph from '../components/insert-glyph';

const INPUTS = [
  { icon: Hash, title: 'A product code', body: 'The ISO designation printed on your current insert box, even if the brand differs.' },
  { icon: FileText, title: 'A drawing', body: 'A dimensioned drawing or DXF/STEP file for a form tool or special geometry.' },
  { icon: Camera, title: 'A photograph', body: 'A clear photo of the insert or the worn part, with something for scale.' },
  { icon: Ruler, title: 'A sample', body: 'The physical insert you currently use, which we can match against.' },
];

export default function CustomSourcingPage() {
  usePageMeta(
    'Custom Sourcing',
    'Send a code, drawing, photograph or sample and ShreeRaj Tools will source carbide inserts and cutting tools to your specification from producers in China and Taiwan.',
  );

  return (
    <>
      <section className="bg-night py-14 text-night-ink md:py-20">
        <div className="shell grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <span className="accent-rule-dark mb-5" />
            <h1 className="text-h1">Custom sourcing</h1>
            <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-night-muted">
              Not every requirement matches a catalogue code. If you need a size that is hard to find,
              a geometry suited to a particular material, or a replacement for something that has been
              discontinued, send us what you have and we will work back to a specification.
            </p>
            <Link href="/quote" className="btn-primary mt-8">
              Share your requirement <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="hidden grid-cols-2 gap-3 lg:grid" aria-hidden="true">
            {['Trigon 80°', 'Rhombic 55°', 'Round', 'Rectangular'].map((s) => (
              <div key={s} className="flex aspect-square items-center justify-center border border-night-line bg-night-soft">
                <InsertGlyph shape={s} onDark className="h-20 w-20" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="shell">
          <span className="accent-rule-dark mb-5" />
          <h2 className="text-h2">What we need from you</h2>
          <p className="mt-3 max-w-2xl text-[17px] text-ink-soft">
            Any one of these is enough to start. The more you can share, the more precisely we can quote.
          </p>
          <div className="mt-9 grid gap-px border border-rule bg-rule sm:grid-cols-2">
            {INPUTS.map((i) => (
              <div key={i.title} className="bg-white p-7">
                <i.icon className="h-6 w-6 text-accent-ink" aria-hidden="true" />
                <h3 className="mt-4 text-h3">{i.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-muted">{i.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-rule bg-surface-subtle py-16 md:py-20">
        <div className="shell max-w-3xl">
          <span className="accent-rule-dark mb-5" />
          <h2 className="text-h2">What we can and cannot promise</h2>
          <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
            Sourcing flexibility is not the same as guaranteed availability, and we would rather be
            straight with you about that.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="border-l-2 border-accent-ink pl-5">
              <h3 className="text-h3">We will</h3>
              <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-ink-soft">
                <li>Check your requirement against the suppliers we work with.</li>
                <li>Tell you the specification, quantity and lead time we can actually get.</li>
                <li>Say so plainly when something is not available to us.</li>
              </ul>
            </div>
            <div className="border-l-2 border-rule pl-5">
              <h3 className="text-h3">We will not</h3>
              <ul className="mt-3 space-y-2 text-[15px] leading-relaxed text-ink-soft">
                <li>Quote a specification we have not confirmed with a supplier.</li>
                <li>Promise a lead time before the source is confirmed.</li>
                <li>Substitute a different grade or geometry without telling you.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="shell flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-h2">Send us the requirement</h2>
            <p className="mt-2.5 max-w-xl text-[17px] text-ink-soft">
              Attach a drawing or photograph directly to the enquiry form — up to 10 MB.
            </p>
          </div>
          <Link href="/quote" className="btn-primary shrink-0">
            Request a Quote <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
