import { motion } from 'framer-motion';
import { FileText, Scale, AlertTriangle, Shield } from 'lucide-react';
import { getCompanyInfo } from '../../../shared/company';

export default function TermsPage() {
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
            <FileText className="h-16 w-16 text-red mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-display font-bold text-primary mb-6 tracking-tight">
              Terms of <span className="gradient-text">Service</span>
            </h1>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Clear terms and conditions for our precision manufacturing services.
            </p>
            <p className="text-sm text-muted/70 mt-4">
              Last updated: September 2025
            </p>
          </motion.div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-20 md:py-28 bg-elevated">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 glow-hover"
              data-testid="terms-section-acceptance"
            >
              <div className="flex items-start space-x-4">
                <Scale className="h-8 w-8 text-amber flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Acceptance of Terms
                  </h2>
                  <ul className="space-y-3 text-muted">
                    <li>• By using our website, you accept these terms</li>
                    <li>• We reserve the right to update terms without prior notice</li>
                    <li>• Continued use constitutes acceptance of revised terms</li>
                    <li>• If you disagree, please discontinue use of our services</li>
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
              data-testid="terms-section-manufacturing"
            >
              <div className="flex items-start space-x-4">
                <FileText className="h-8 w-8 text-red flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Manufacturing Services
                  </h2>
                  <ul className="space-y-3 text-muted">
                    <li>• All quotes are estimates subject to final review</li>
                    <li>• Drawings must be in acceptable formats (PDF, DWG, DXF, STEP)</li>
                    <li>• Final pricing may vary based on material availability</li>
                    <li>• We reserve the right to decline unsuitable projects</li>
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
              data-testid="terms-section-quality"
            >
              <div className="flex items-start space-x-4">
                <Shield className="h-8 w-8 text-amber flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Quality & Liability
                  </h2>
                  <ul className="space-y-3 text-muted">
                    <li>• Products manufactured to ISO 9001:2015 standards</li>
                    <li>• 30-day warranty against defects in materials and workmanship</li>
                    <li>• Liability limited to repair, replacement, or refund</li>
                    <li>• Not liable for consequential damages or losses</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-card p-8 glow-hover"
              data-testid="terms-section-intellectual-property"
            >
              <div className="flex items-start space-x-4">
                <AlertTriangle className="h-8 w-8 text-red flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h2 className="text-2xl font-display font-semibold text-primary mb-4">
                    Intellectual Property
                  </h2>
                  <ul className="space-y-3 text-muted">
                    <li>• Customer retains ownership of all technical drawings</li>
                    <li>• We maintain confidentiality of customer IP</li>
                    <li>• Customer IP not used for other purposes</li>
                    <li>• Terms governed by Indian law and Mumbai jurisdiction</li>
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
              Questions About Terms?
            </h2>
            <p className="text-muted mb-6 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us.
            </p>
            <a 
              href={`mailto:${companyInfo.email}`}
              className="text-amber hover:text-amber/80 font-semibold transition-colors"
              data-testid="link-terms-contact"
            >
              {companyInfo.email}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}