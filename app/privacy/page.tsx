import { Metadata } from "next/metadata";
import SectionWrapper from "@/components/ui/section-wrapper";
import { Shield, Eye, Lock, UserCheck } from "lucide-react";
import companyData from "@/data/company.json";

export const metadata: Metadata = {
  title: "Privacy Policy - Data Protection & Privacy | Neo Automatics",
  description: "Learn how Neo Automatics protects your personal information and maintains privacy in accordance with applicable data protection laws.",
};

export default function PrivacyPage() {
  const { company } = companyData;
  const lastUpdated = "January 1, 2024";

  return (
    <div className="pt-16">
      {/* Header */}
      <SectionWrapper className="py-20 bg-slate-900 text-white">
        <div className="text-center">
          <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            Privacy <span className="gradient-text">Policy</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            We are committed to protecting your privacy and ensuring the security 
            of your personal information.
          </p>
          <p className="text-slate-400 mt-4">
            Last updated: {lastUpdated}
          </p>
        </div>
      </SectionWrapper>

      {/* Privacy Principles */}
      <SectionWrapper className="py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">
            Our Privacy Principles
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We follow these core principles in handling your personal data
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-sky-500" />
            </div>
            <h3 className="text-lg font-display font-semibold text-slate-900 mb-2">
              Transparency
            </h3>
            <p className="text-slate-600 text-sm">
              Clear information about data collection and usage
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-lg font-display font-semibold text-slate-900 mb-2">
              Security
            </h3>
            <p className="text-slate-600 text-sm">
              Strong protection measures for your data
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UserCheck className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-lg font-display font-semibold text-slate-900 mb-2">
              Control
            </h3>
            <p className="text-slate-600 text-sm">
              Your rights to access and control your data
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="text-lg font-display font-semibold text-slate-900 mb-2">
              Compliance
            </h3>
            <p className="text-slate-600 text-sm">
              Adherence to applicable privacy laws
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Privacy Policy Content */}
      <SectionWrapper className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div className="glass-card p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">
                1. Information We Collect
              </h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  <strong>Personal Information:</strong> When you contact us or submit an RFQ, we may collect:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Name and contact information (email, phone number)</li>
                  <li>Company name and business information</li>
                  <li>Technical specifications and requirements</li>
                  <li>File uploads (drawings, specifications)</li>
                </ul>
                <p>
                  <strong>Website Usage Information:</strong> We automatically collect:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>IP address and browser information</li>
                  <li>Pages visited and time spent on our website</li>
                  <li>Referring website information</li>
                </ul>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">
                2. How We Use Your Information
              </h2>
              <div className="space-y-4 text-slate-700">
                <p>We use the information we collect to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Respond to your inquiries and provide quotations</li>
                  <li>Process and fulfill your manufacturing requests</li>
                  <li>Communicate about our products and services</li>
                  <li>Improve our website and user experience</li>
                  <li>Comply with legal and regulatory requirements</li>
                </ul>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">
                3. Information Sharing and Disclosure
              </h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties except:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>With your explicit consent</li>
                  <li>To service providers who assist in our operations</li>
                  <li>When required by law or legal process</li>
                  <li>To protect our rights, property, or safety</li>
                </ul>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">
                4. Data Security
              </h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  We implement appropriate technical and organizational measures to protect your personal information:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Secure data transmission using SSL encryption</li>
                  <li>Access controls and authentication measures</li>
                  <li>Regular security assessments and updates</li>
                  <li>Employee training on data protection</li>
                </ul>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">
                5. Your Rights
              </h2>
              <div className="space-y-4 text-slate-700">
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Access your personal information we hold</li>
                  <li>Correct inaccurate or incomplete information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Object to processing of your personal information</li>
                  <li>Withdraw consent where applicable</li>
                </ul>
                <p>
                  To exercise these rights, please contact us at{' '}
                  <a href={`mailto:${company.email}`} className="text-sky-600 hover:text-sky-700">
                    {company.email}
                  </a>
                </p>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">
                6. Cookies and Tracking
              </h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  Our website may use cookies and similar technologies to enhance user experience and analyze website usage. You can manage cookie preferences through your browser settings.
                </p>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">
                7. Data Retention
              </h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  We retain personal information only as long as necessary to fulfill the purposes for which it was collected, comply with legal obligations, or resolve disputes.
                </p>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">
                8. Changes to This Policy
              </h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date.
                </p>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">
                9. Contact Information
              </h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  If you have questions about this privacy policy or our data practices, please contact us:
                </p>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <p><strong>{company.name}</strong></p>
                  <p>{company.hq}</p>
                  <p>Email: <a href={`mailto:${company.email}`} className="text-sky-600 hover:text-sky-700">{company.email}</a></p>
                  <p>Phone: <a href={`tel:${company.phone}`} className="text-sky-600 hover:text-sky-700">{company.phone}</a></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
