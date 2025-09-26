import { motion } from 'framer-motion';
import { Car, Tractor, Factory, Zap, CheckCircle, Users, Award, Target } from 'lucide-react';

const industries = [
  {
    icon: Car,
    title: "Automotive",
    description: "Precision components for leading automotive OEMs and Tier-1 suppliers worldwide",
    features: [
      "Engine Components (Rocker Arms, Valve Guides)",
      "Transmission Parts (Gears, Shafts, Housings)",
      "Chassis Components (Brackets, Mounts)",
      "Steering & Suspension Parts"
    ],
    applications: ["Passenger Vehicles", "Commercial Vehicles", "Electric Vehicles", "Hybrid Systems"],
    color: "lime",
    stats: { clients: "15+", parts: "500K+", precision: "±0.005mm" }
  },
  {
    icon: Tractor,
    title: "Agriculture",
    description: "Durable, high-performance components for agricultural machinery and equipment",
    features: [
      "Hydraulic Components (Cylinders, Valves)",
      "Drivetrain Parts (Gears, Axles, Differentials)",
      "Implement Components (Blades, Brackets)",
      "Engine Parts (Blocks, Heads, Manifolds)"
    ],
    applications: ["Tractors", "Harvesters", "Planters", "Irrigation Systems"],
    color: "violet",
    stats: { clients: "12+", parts: "300K+", precision: "±0.01mm" }
  },
  {
    icon: Factory,
    title: "Industrial",
    description: "Specialized components for manufacturing equipment and industrial systems",
    features: [
      "Machine Tool Components",
      "Automation Parts (Actuators, Brackets)",
      "Pump & Valve Components",
      "Custom Manufacturing Fixtures"
    ],
    applications: ["CNC Machines", "Assembly Lines", "Process Equipment", "Material Handling"],
    color: "lime",
    stats: { clients: "20+", parts: "200K+", precision: "±0.02mm" }
  }
];

const industryBenefits = [
  {
    icon: Target,
    title: "Precision Engineering",
    description: "Tight tolerances and superior surface finishes meeting the most demanding specifications",
    color: "lime"
  },
  {
    icon: Award,
    title: "Quality Assurance",
    description: "ISO 9001:2015 certified processes with comprehensive PPAP documentation",
    color: "violet"
  },
  {
    icon: Users,
    title: "Technical Support",
    description: "Expert engineering team providing DFM analysis and cost optimization",
    color: "lime"
  },
  {
    icon: Zap,
    title: "Rapid Response",
    description: "Quick turnaround times from prototyping to full-scale production",
    color: "violet"
  }
];

export default function IndustriesPage() {
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
              Industries We <span className="gradient-text">Serve</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted max-w-4xl mx-auto leading-relaxed">
              Delivering precision manufacturing solutions across diverse industrial sectors
              with <span className="text-lime font-semibold">specialized expertise</span> and proven quality standards.
            </p>
          </motion.div>

          {/* Industry Benefits */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {industryBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              const iconColor = benefit.color === 'lime' ? 'text-lime' : 'text-violet';
              
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center glass-card p-6 glow-hover group"
                >
                  <IconComponent className={`h-10 w-10 ${iconColor} mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`} />
                  <h3 className="text-lg font-display font-semibold text-primary mb-3">{benefit.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-20 md:py-28 bg-elevated">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="space-y-20">
            {industries.map((industry, index) => {
              const IconComponent = industry.icon;
              const iconColor = industry.color === 'lime' ? 'text-lime' : 'text-violet';
              const isReverse = index % 2 === 1;
              
              return (
                <motion.div
                  key={industry.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${isReverse ? 'lg:grid-flow-col-dense' : ''}`}
                  data-testid={`industry-${industry.title.toLowerCase()}`}
                >
                  {/* Content */}
                  <div className={isReverse ? 'lg:col-start-2' : ''}>
                    <IconComponent className={`h-16 w-16 ${iconColor} mb-6`} />
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6 tracking-tight">
                      {industry.title}
                    </h2>
                    <p className="text-xl text-muted mb-8 leading-relaxed">
                      {industry.description}
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-8">
                      <div className="text-center glass-card p-4">
                        <div className={`text-2xl font-display font-bold ${iconColor} mb-1`}>{industry.stats.clients}</div>
                        <div className="text-muted text-sm">OEM Clients</div>
                      </div>
                      <div className="text-center glass-card p-4">
                        <div className={`text-2xl font-display font-bold ${iconColor} mb-1`}>{industry.stats.parts}</div>
                        <div className="text-muted text-sm">Parts/Year</div>
                      </div>
                      <div className="text-center glass-card p-4">
                        <div className={`text-2xl font-display font-bold ${iconColor} mb-1`}>{industry.stats.precision}</div>
                        <div className="text-muted text-sm">Tolerance</div>
                      </div>
                    </div>

                    {/* Key Products */}
                    <div className="mb-8">
                      <h3 className="text-lg font-display font-semibold text-primary mb-4">Key Products</h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {industry.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-muted">
                            <CheckCircle className="h-4 w-4 text-lime mr-3 flex-shrink-0" />
                            <span className="text-sm">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Applications */}
                    <div>
                      <h3 className="text-lg font-display font-semibold text-primary mb-4">Applications</h3>
                      <div className="flex flex-wrap gap-2">
                        {industry.applications.map((app, appIndex) => (
                          <span
                            key={appIndex}
                            className={`px-3 py-1 text-sm rounded-full border ${
                              industry.color === 'lime' 
                                ? 'border-lime/30 bg-lime/10 text-lime' 
                                : 'border-violet/30 bg-violet/10 text-violet'
                            }`}
                          >
                            {app}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Visual */}
                  <div className={`${isReverse ? 'lg:col-start-1' : ''}`}>
                    <div className="glass-card p-12 glow-hover group">
                      <div className="aspect-square bg-gradient-to-br from-lime/10 to-violet/10 rounded-2xl flex items-center justify-center group-hover:from-lime/20 group-hover:to-violet/20 transition-colors duration-300">
                        <IconComponent className={`h-24 w-24 ${iconColor} group-hover:scale-110 transition-transform duration-300`} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 tracking-tight">
              Partner with Industry <span className="gradient-text">Experts</span>
            </h2>
            <p className="text-xl text-muted mb-12 leading-relaxed">
              Join leading OEMs who trust Neo Automatics for their critical component manufacturing needs.
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
                data-testid="cta-discuss-project"
              >
                <Zap className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Discuss Your Project
              </a>
              <a 
                href="/products" 
                className="btn-secondary magnetic-btn inline-flex items-center justify-center"
                data-testid="cta-view-products"
              >
                View Product Portfolio
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}