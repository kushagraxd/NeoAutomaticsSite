import { Metadata } from "next/metadata";
import SectionWrapper from "@/components/ui/section-wrapper";
import { FileText, Scale, AlertCircle, CheckCircle } from "lucide-react";
import companyData from "@/data/company.json";

export const metadata: Metadata = {
  title: "Terms of Service - Website Terms & Conditions | Neo Automatics",
  description: "Read the terms and conditions for using the Neo Automatics website and engaging our manufacturing services.",
};

export default function TermsPage() {
  const { company } = companyData;
  const lastUpdated = "January 1, 2024";

  return (
    <div className="pt-16">
      {/* Header */}
      <SectionWrapper className="py-20 bg-slate-900 text-white">
        <div className="text-center">
          <FileText className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            Terms of <span className="gradient-text">Service</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            These terms govern your use of our website and our manufacturing services.
          </p>
          <p className="text-slate-400 mt-4">
            Last updated: {lastUpdated}
          </p>
        </div>
      </SectionWrapper>

      {/* Key Terms Overview */}
      <SectionWrapper className="py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">
            Key Terms Overview
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Important aspects of our terms and conditions
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Scale className="w-8 h-8 text-sky-500" />
            </div>
            <h3 className="text-lg font-display font-semibold text-slate-900 mb-2">
              Fair Use
            </h3>
            <p className="text-slate-600 text-sm">
              Responsible use of our website and services
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-lg font-display font-semibold text-slate-900 mb-2">
              Service Terms
            </h3>
            <p className="text-slate-600 text-sm">
              Clear conditions for our manufacturing services
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-lg font-display font-semibold text-slate-900 mb-2">
              Limitations
            </h3>
            <p className="text-slate-600 text-sm">
              Understanding our liability limitations
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="text-lg font-display font-semibold text-slate-900 mb-2">
              Intellectual Property
            </h3>
            <p className="text-slate-600 text-sm">
              Protection of intellectual property rights
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Terms of Service Content */}
      <SectionWrapper className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div className="glass-card p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">
                1. Acceptance of Terms
              </h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  By accessing and using the {company.name} website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">
                2. Website Use
              </h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  <strong>Permitted Use:</strong> You may use our website for:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Viewing company information and capabilities</li>
                  <li>Submitting legitimate business inquiries</li>
                  <li>Downloading publicly available resources</li>
                  <li>Contacting us for manufacturing services</li>
                </ul>
                <p>
                  <strong>Prohibited Use:</strong> You may not:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Use the website for any unlawful purpose</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Transmit viruses or malicious code</li>
                  <li>Interfere with the website's operation</li>
                </ul>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">
                3. Manufacturing Services
              </h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  <strong>Quotations:</strong> All quotations are valid for 30 days unless otherwise specified. Prices are subject to change based on material costs, specifications, and market conditions.
                </p>
                <p>
                  <strong>Orders:</strong> Orders are subject to our acceptance and production capacity. We reserve the right to decline orders that do not meet our quality standards or business criteria.
                </p>
                <p>
                  <strong>Delivery:</strong> Delivery timelines are estimates and may vary based on production schedules, material availability, and other factors beyond our control.
                </p>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">
                4. Intellectual Property
              </h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  <strong>Our Content:</strong> All content on this website, including text, graphics, logos, and images, is the property of {company.name} and is protected by copyright and other intellectual property laws.
                </p>
                <p>
                  <strong>Customer Designs:</strong> We respect the intellectual property rights of our customers. Any designs, drawings, or specifications provided by customers remain their property and are treated as confidential.
                </p>
                <p>
                  <strong>Confidentiality:</strong> We maintain strict confidentiality regarding customer designs, specifications, and business information.
                </p>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">
                5. Quality and Warranties
              </h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  <strong>Quality Assurance:</strong> We manufacture products in accordance with agreed specifications and our ISO 9001:2015 quality standards.
                </p>
                <p>
                  <strong>Warranty:</strong> We warrant that our products will be free from defects in materials and workmanship under normal use. Any warranty claims must be made within a reasonable time period.
                </p>
                <p>
                  <strong>Limitation:</strong> Our warranty is limited to repair or replacement of defective products. We do not warrant fitness for any particular purpose unless specifically agreed in writing.
                </p>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">
                6. Limitation of Liability
              </h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  In no event shall {company.name} be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>
                <p>
                  Our total liability for any claim shall not exceed the amount paid by the customer for the specific products or services giving rise to the claim.
                </p>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">
                7. Privacy and Data Protection
              </h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the website, to understand our practices.
                </p>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">
                8. Governing Law
              </h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  These terms shall be governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts in Rohtak, Haryana.
                </p>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl mb-8">
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">
                9. Changes to Terms
              </h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of the website constitutes acceptance of the modified terms.
                </p>
              </div>
            </div>

            <div className="glass-card p-8 rounded-2xl">
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">
                10. Contact Information
              </h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  If you have any questions about these terms of service, please contact us:
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
