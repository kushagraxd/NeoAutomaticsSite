import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText } from 'lucide-react';
import { getCompanyInfo } from '../../../shared/company';

export default function PrivacyPage() {
  const companyInfo = getCompanyInfo();

  return (
    <div className="min-h-screen bg-base">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 hero-bg opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Shield className="h-16 w-16 text-amber mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-display font-bold text-primary mb-6 tracking-tight">
              Privacy <span className="gradient-text">Policy</span>
            </h1>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Your privacy and the confidentiality of your technical information is our top priority.
            </p>
            <p className="text-sm text-muted/70 mt-4">
              Last updated: September 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-20 md:py-28 bg-elevated">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 glow-hover"
              data-testid="privacy-section-information-collection"
            >
              <div className="flex items-start space-x-4">
                <Eye className="h-8 w-8 text-amber flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Information We Collect
                  </h2>
                  <ul className="space-y-3 text-muted">
                    <li>• Contact information when you submit RFQ forms</li>
                    <li>• Technical drawings and specifications you upload</li>
                    <li>• Company information and project details</li>
                    <li>• Website usage data for service improvement</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8 glow-hover"
              data-testid="privacy-section-data-protection"
            >
              <div className="flex items-start space-x-4">
                <Lock className="h-8 w-8 text-red flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Data Protection
                  </h2>
                  <ul className="space-y-3 text-muted">
                    <li>• All technical drawings are kept strictly confidential</li>
                    <li>• Industry-standard encryption for data transmission</li>
                    <li>• Access limited to authorized personnel only</li>
                    <li>• Physical and digital security measures in place</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card p-8 glow-hover"
              data-testid="privacy-section-information-sharing"
            >
              <div className="flex items-start space-x-4">
                <FileText className="h-8 w-8 text-amber flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Information Sharing
                  </h2>
                  <ul className="space-y-3 text-muted">
                    <li>• We do not sell or share your personal information</li>
                    <li>• Information only shared to fulfill manufacturing requests</li>
                    <li>• May disclose information if required by law</li>
                    <li>• All partners sign confidentiality agreements</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 glow-hover"
          >
            <h2 className="text-2xl font-display font-semibold text-primary mb-4">
              Questions About Privacy?
            </h2>
            <p className="text-muted mb-6 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us.
            </p>
            <a 
              href={`mailto:${companyInfo.email}`}
              className="text-amber hover:text-amber/80 font-semibold transition-colors"
              data-testid="link-privacy-contact"
            >
              {companyInfo.email}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}