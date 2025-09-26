import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock, Users, Zap, Factory, Award } from 'lucide-react';
import { RFQForm } from '../../../components/ui/rfq-form';

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    details: ["+91-XXX-XXXX-XXX", "Mon-Fri: 8AM-6PM IST"],
    color: "lime"
  },
  {
    icon: Mail,
    title: "Email",
    details: ["info@neoautomatics.com", "quotes@neoautomatics.com"],
    color: "violet"
  },
  {
    icon: MapPin,
    title: "Location",
    details: ["Pune, Maharashtra, India", "3 Manufacturing Units"],
    color: "lime"
  },
  {
    icon: Clock,
    title: "Response Time",
    details: ["Quote: Within 24 hours", "Technical: Within 4 hours"],
    color: "violet"
  }
];

const contactReasons = [
  {
    icon: Factory,
    title: "New Projects",
    description: "Request quotes for new component manufacturing projects",
    cta: "Get Quote"
  },
  {
    icon: Users,
    title: "Technical Support",
    description: "Engineering assistance and design optimization consultation",
    cta: "Contact Engineers"
  },
  {
    icon: Award,
    title: "Quality Queries",
    description: "Quality documentation, certifications, and PPAP requirements",
    cta: "Quality Team"
  },
  {
    icon: Zap,
    title: "Rapid Prototyping",
    description: "Quick turnaround prototyping and development support",
    cta: "Prototype Request"
  }
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-base">
      {/* Hero Section */}
      <section className="relative py-28 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 aurora-bg opacity-10" />
        <div className="geometric-shape geometric-shape-1" />
        <div className="geometric-shape geometric-shape-2" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-primary mb-6 tracking-tight leading-tight">
              Request a <span className="gradient-text">Quote</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted max-w-4xl mx-auto leading-relaxed">
              Get a personalized quote for your precision machining needs.
              Our expert team will review your requirements and provide a 
              <span className="text-lime font-semibold"> competitive proposal within 24 hours</span>.
            </p>
          </motion.div>

          {/* Contact Info Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              const iconColor = info.color === 'lime' ? 'text-lime' : 'text-violet';
              
              return (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center glass-card p-6 glow-hover group"
                >
                  <IconComponent className={`h-8 w-8 ${iconColor} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`} />
                  <h3 className="font-display font-semibold text-primary mb-3">{info.title}</h3>
                  {info.details.map((detail, detailIndex) => (
                    <div key={detailIndex} className="text-muted text-sm mb-1">
                      {detail}
                    </div>
                  ))}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Reasons */}
      <section className="py-20 md:py-28 bg-elevated">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 tracking-tight">
              How Can We <span className="gradient-text">Help?</span>
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Whether you need quotes, technical support, or quality documentation, our team is ready to assist.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactReasons.map((reason, index) => {
              const IconComponent = reason.icon;
              
              return (
                <motion.div
                  key={reason.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center glass-card p-8 glow-hover group"
                >
                  <IconComponent className="h-12 w-12 text-lime mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-display font-semibold text-primary mb-4">
                    {reason.title}
                  </h3>
                  <p className="text-muted mb-6 leading-relaxed">{reason.description}</p>
                  <div className="text-violet font-medium text-sm">{reason.cta}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* RFQ Form Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 tracking-tight">
              Submit Your <span className="gradient-text">Requirements</span>
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Fill out the form below with your project details. Include technical drawings for the most accurate quote.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-card p-8 md:p-12 glow-hover"
          >
            <RFQForm />
          </motion.div>
        </div>
      </section>

      {/* Additional Contact Methods */}
      <section className="py-20 md:py-28 bg-elevated">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 tracking-tight">
              Alternative <span className="gradient-text">Contact</span>
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Prefer other communication methods? We're flexible to work with your preferences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center glass-card p-8 glow-hover group"
            >
              <Mail className="h-12 w-12 text-lime mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-display font-semibold text-primary mb-4">Direct Email</h3>
              <p className="text-muted mb-6 leading-relaxed">
                Send your requirements directly to our engineering team for immediate attention.
              </p>
              <a 
                href="mailto:quotes@neoautomatics.com" 
                className="btn-primary text-sm inline-flex items-center magnetic-btn group"
                data-testid="contact-direct-email"
              >
                Send Email
                <Mail className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center glass-card p-8 glow-hover group"
            >
              <Phone className="h-12 w-12 text-violet mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-display font-semibold text-primary mb-4">Phone Call</h3>
              <p className="text-muted mb-6 leading-relaxed">
                Speak directly with our technical team for immediate assistance and consultation.
              </p>
              <a 
                href="tel:+91-XXX-XXXX-XXX" 
                className="btn-secondary text-sm inline-flex items-center magnetic-btn group"
                data-testid="contact-phone-call"
              >
                Call Now
                <Phone className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center glass-card p-8 glow-hover group"
            >
              <Factory className="h-12 w-12 text-lime mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-display font-semibold text-primary mb-4">Facility Visit</h3>
              <p className="text-muted mb-6 leading-relaxed">
                Schedule a visit to our manufacturing facility to see our capabilities firsthand.
              </p>
              <a 
                href="mailto:info@neoautomatics.com?subject=Facility%20Visit%20Request" 
                className="btn-secondary text-sm inline-flex items-center magnetic-btn group"
                data-testid="contact-facility-visit"
              >
                Schedule Visit
                <MapPin className="ml-2 h-4 w-4 group-hover:translate-y-0.5 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}