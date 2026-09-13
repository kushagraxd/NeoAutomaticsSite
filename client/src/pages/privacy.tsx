import { usePageMeta } from '../lib/usePageMeta';
import { company, confirmed } from '../../../shared/company';

export default function PrivacyPage() {
  usePageMeta('Privacy Policy', 'How ShreeRaj Tools handles the information you share through the website enquiry form.');
  const email = confirmed(company.contact.email);

  const sections: Array<[string, string[]]> = [
    ['What we collect', [
      'When you send an enquiry we collect the name, company, email address and phone number you enter, along with the requirement details and any file you attach.',
      'We do not use advertising trackers or third-party analytics profiling on this site.',
    ]],
    ['Why we collect it', [
      'Solely to respond to your enquiry: to prepare a quotation, confirm a specification and arrange supply.',
      'We do not sell your information, and we do not share it with anyone except where it is necessary to source the product you asked about.',
    ]],
    ['Files you attach', [
      'Drawings and specifications you upload are used only to understand and quote your requirement. They are stored on our server and are not published anywhere on this website.',
    ]],
    ['How long we keep it', [
      'Enquiries are retained for as long as needed to handle the request and any resulting supply, and for the record-keeping period required of a business in India.',
    ]],
    ['Your choices', [
      'You can ask us what information we hold about you, ask for it to be corrected, or ask us to delete it. Contact us using the details on this site and we will action it.',
    ]],
  ];

  return (
    <>
      <section className="bg-night py-14 text-night-ink">
        <div className="shell max-w-3xl">
          <span className="accent-rule-dark mb-5" />
          <h1 className="text-h1">Privacy Policy</h1>
          <p className="mt-4 text-[16px] text-night-muted">
            How {company.displayName} handles the information you share through this website.
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="shell max-w-3xl">
          {sections.map(([title, paras]) => (
            <div key={title} className="mb-10">
              <h2 className="text-h3">{title}</h2>
              {paras.map((p) => (
                <p key={p} className="mt-3 text-[16px] leading-relaxed text-ink-soft">{p}</p>
              ))}
            </div>
          ))}
          <div className="rounded-lg border border-rule bg-surface-subtle p-6">
            <h2 className="text-h3">Questions</h2>
            <p className="mt-2 text-[16px] leading-relaxed text-ink-soft">
              {email
                ? <>Write to us at <a href={`mailto:${email}`} className="text-accent-ink hover:underline">{email}</a>.</>
                : 'Please use the enquiry form and we will respond directly.'}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
