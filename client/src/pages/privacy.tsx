import { usePageMeta } from '../lib/usePageMeta';
import PageHero from '../components/page-hero';
import { company, confirmed } from '../../../shared/company';

export default function PrivacyPage() {
  usePageMeta('Privacy Policy', 'How Sreeraj Tools handles the information you share through the website enquiry form.');
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
      <PageHero
        id="privacy-title"
        eyebrow="Privacy"
        title="Privacy Policy"
        lead={`How ${company.displayName} handles the information you share through this website.`}
        size="sm"
      />

      <section className="section-tight bg-surface">
        <div className="shell max-w-3xl">
          <div className="panel divide-y divide-rule-soft">
            {sections.map(([title, paras]) => (
              <div key={title} className="px-6 py-7 md:px-8">
                <h2 className="t-h3 text-[19px]">{title}</h2>
                {paras.map((p) => (
                  <p key={p} className="mt-3 text-[16px] leading-relaxed text-ink-soft">{p}</p>
                ))}
              </div>
            ))}
            <div className="bg-surface-panel px-6 py-7 md:px-8">
              <h2 className="t-h3 text-[19px]">Questions</h2>
              <p className="mt-3 text-[16px] leading-relaxed text-ink-soft">
                {email
                  ? <>Write to us at <a href={`mailto:${email}`} className="font-semibold text-ink underline decoration-accent-line underline-offset-4">{email}</a>.</>
                  : 'Please use the enquiry form and we will respond directly.'}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
