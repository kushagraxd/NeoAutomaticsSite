import { motion } from 'framer-motion';
import { Cog, Wrench, Settings, CheckCircle, Factory, Zap, Award, Clock, Users, Target } from 'lucide-react';

const capabilities = [
  {
    icon: Cog,
    title: "CNC Machining",
    description: "Precision 3, 4, and 5-axis CNC machining with 30+ advanced machines",
    features: ["3-Axis to 5-Axis CNC", "VMC & HMC", "Swiss-Type Turning", "Micro Machining"],
    color: "lime"
  },
  {
    icon: Wrench,
    title: "Heat Treatment",
    description: "In-house heat treatment facilities for enhanced material properties",
    features: ["Hardening & Tempering", "Annealing", "Stress Relieving", "Case Hardening"],
    color: "violet"
  },
  {
    icon: Settings,
    title: "Quality Control",
    description: "Advanced inspection systems ensuring ISO 9001:2015 compliance",
    features: ["CMM Inspection", "Surface Testing", "Dimensional Analysis", "PPAP Ready"],
    color: "lime"
  },
  {
    icon: Factory,
    title: "Manufacturing",
    description: "End-to-end manufacturing solutions from prototyping to volume production",
    features: ["NPD Support", "Rapid Prototyping", "Volume Production", "JIT Delivery"],
    color: "violet"
  },
  {
    icon: Award,
    title: "Quality Systems",
    description: "Certified quality management systems with continuous improvement",
    features: ["ISO 9001:2015", "PPAP Level 3", "SPC Implementation", "Lean Manufacturing"],
    color: "lime"
  },
  {
    icon: Users,
    title: "Engineering Support",
    description: "Technical expertise supporting design optimization and manufacturability",
    features: ["DFM Analysis", "Cost Optimization", "Material Selection", "Process Engineering"],
    color: "violet"
  }
];

const stats = [
  { value: "30+", label: "CNC Machines", icon: Cog },
  { value: "3", label: "Manufacturing Units", icon: Factory },
  { value: "20+", label: "Years Experience", icon: Clock },
  { value: "100%", label: "PPAP Ready", icon: Target }
];

export default function CapabilitiesPage() {
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
              Manufacturing <span className="gradient-text">Capabilities</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted max-w-4xl mx-auto leading-relaxed">
              Advanced precision manufacturing capabilities serving OEMs and Tier-1 suppliers
              with <span className="text-lime font-semibold">30+ CNC machines</span> and comprehensive quality systems.
            </p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          >
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={stat.label} className="text-center glass-card p-6 glow-hover">
                  <IconComponent className="h-8 w-8 text-lime mx-auto mb-4" />
                  <div className="text-3xl font-display font-bold text-lime mb-2">{stat.value}</div>
                  <div className="text-muted font-medium">{stat.label}</div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="py-20 md:py-28 bg-elevated">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 tracking-tight">
              Core <span className="gradient-text">Capabilities</span>
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Comprehensive manufacturing solutions combining advanced technology with proven expertise.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => {
              const IconComponent = capability.icon;
              const iconColor = capability.color === 'lime' ? 'text-lime' : 'text-violet';
              
              return (
                <motion.div
                  key={capability.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card p-8 glow-hover group"
                  data-testid={`capability-${capability.title.toLowerCase().replace(/[^a-z]/g, '-')}`}
                >
                  <IconComponent className={`h-12 w-12 ${iconColor} mb-6 group-hover:scale-110 transition-transform duration-300`} />
                  <h3 className="text-xl font-display font-semibold text-primary mb-4">
                    {capability.title}
                  </h3>
                  <p className="text-muted mb-6 leading-relaxed">{capability.description}</p>
                  
                  <ul className="space-y-2">
                    {capability.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-muted">
                        <CheckCircle className="h-4 w-4 text-lime mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Flow */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 tracking-tight">
              Manufacturing <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Streamlined workflow from concept to delivery ensuring quality and efficiency at every step.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Design Analysis", desc: "DFM review and optimization" },
              { step: "02", title: "Prototyping", desc: "Rapid prototype development" },
              { step: "03", title: "Production", desc: "Volume manufacturing execution" },
              { step: "04", title: "Quality & Delivery", desc: "Final inspection and shipping" }
            ].map((process, index) => (
              <motion.div
                key={process.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center glass-card p-6 glow-hover"
              >
                <div className="text-4xl font-display font-bold gradient-text mb-4">{process.step}</div>
                <h3 className="text-lg font-display font-semibold text-primary mb-3">{process.title}</h3>
                <p className="text-muted">{process.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-elevated">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 tracking-tight">
              Ready to Discuss Your <span className="gradient-text">Requirements?</span>
            </h2>
            <p className="text-xl text-muted mb-12 leading-relaxed">
              Let our engineering team help you optimize your designs for manufacturability and cost-effectiveness.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <a 
                href="/contact" 
                className="btn-primary magnetic-btn group inline-flex items-center justify-center"
                data-testid="cta-contact-engineering"
              >
                <Zap className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Contact Engineering Team
              </a>
              <a 
                href="/neo-capability-profile.pdf" 
                className="btn-secondary magnetic-btn inline-flex items-center justify-center"
                data-testid="cta-download-capabilities"
                download
              >
                Download Capabilities Profile
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}