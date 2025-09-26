import { motion } from 'framer-motion';
import { Users, Target, Lightbulb, Award, Factory, Clock, Shield, Zap, CheckCircle } from 'lucide-react';

const companyValues = [
  {
    icon: Users,
    title: "Expert Team",
    description: "20+ years of combined experience in precision manufacturing and engineering excellence",
    color: "lime"
  },
  {
    icon: Target,
    title: "Precision Focus",
    description: "Committed to delivering components that exceed specifications with uncompromising quality",
    color: "violet"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Continuous improvement and adoption of cutting-edge manufacturing technologies",
    color: "lime"
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "ISO 9001:2015 certified processes ensuring consistent excellence in every component",
    color: "violet"
  }
];

const companyStats = [
  { value: "2005", label: "Founded", icon: Clock },
  { value: "30+", label: "CNC Machines", icon: Factory },
  { value: "3", label: "Manufacturing Units", icon: Award },
  { value: "99.8%", label: "On-Time Delivery", icon: Target }
];

const milestones = [
  {
    year: "2005",
    title: "Company Founded",
    description: "Neo Automatics established with a focus on precision manufacturing"
  },
  {
    year: "2010",
    title: "ISO Certification",
    description: "Achieved ISO 9001:2008 certification, demonstrating commitment to quality"
  },
  {
    year: "2015",
    title: "Facility Expansion",
    description: "Expanded to 3 manufacturing units with advanced CNC capabilities"
  },
  {
    year: "2018",
    title: "Automotive Focus",
    description: "Specialized in automotive components with PPAP Level 3 readiness"
  },
  {
    year: "2020",
    title: "ISO 9001:2015",
    description: "Upgraded to ISO 9001:2015 with enhanced quality management systems"
  },
  {
    year: "2024",
    title: "Digital Transformation",
    description: "Implemented advanced manufacturing technologies and digital quality systems"
  }
];

const leadership = [
  {
    name: "Engineering Team",
    role: "Technical Leadership",
    description: "Expert engineers with decades of experience in precision manufacturing and quality systems",
    expertise: ["CNC Programming", "Quality Systems", "Process Engineering", "Materials Science"]
  },
  {
    name: "Operations Team",
    role: "Manufacturing Excellence",
    description: "Skilled operators and supervisors ensuring consistent production quality and efficiency",
    expertise: ["CNC Operations", "Quality Control", "Production Planning", "Continuous Improvement"]
  },
  {
    name: "Quality Team",
    role: "Quality Assurance",
    description: "Certified quality professionals maintaining ISO standards and customer satisfaction",
    expertise: ["ISO 9001:2015", "PPAP Documentation", "Statistical Analysis", "Supplier Quality"]
  }
];

export default function AboutPage() {
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
              About <span className="gradient-text">Neo Automatics</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted max-w-4xl mx-auto mb-8 leading-relaxed">
              Leading precision manufacturing company specializing in high-quality components
              for <span className="text-lime font-semibold">automotive, agriculture, and industrial</span> applications.
            </p>
            <p className="text-lg text-muted max-w-4xl mx-auto leading-relaxed">
              With over 20 years of manufacturing excellence, Neo Automatics has established
              itself as a trusted partner for OEMs and Tier-1 suppliers. Our state-of-the-art
              facility houses <span className="text-violet font-semibold">30+ CNC machines</span> and maintains ISO 9001:2015 certification.
            </p>
          </motion.div>

          {/* Company Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {companyStats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center glass-card p-6 glow-hover group"
                >
                  <IconComponent className="h-8 w-8 text-lime mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-3xl font-display font-bold text-lime mb-2">{stat.value}</div>
                  <div className="text-muted font-medium">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 md:py-28 bg-elevated">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 tracking-tight">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              The core principles that drive our commitment to manufacturing excellence and customer satisfaction.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => {
              const IconComponent = value.icon;
              const iconColor = value.color === 'lime' ? 'text-lime' : 'text-violet';
              
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card p-8 glow-hover group text-center"
                  data-testid={`value-${value.title.toLowerCase().replace(/[^a-z]/g, '-')}`}
                >
                  <IconComponent className={`h-12 w-12 ${iconColor} mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`} />
                  <h3 className="text-lg font-display font-semibold text-primary mb-4">
                    {value.title}
                  </h3>
                  <p className="text-muted leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 tracking-tight">
              Our <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Two decades of continuous growth and innovation in precision manufacturing.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-6 glow-hover group"
              >
                <div className="text-2xl font-display font-bold gradient-text mb-3 group-hover:scale-105 transition-transform duration-300">
                  {milestone.year}
                </div>
                <h3 className="text-lg font-display font-semibold text-primary mb-3">
                  {milestone.title}
                </h3>
                <p className="text-muted leading-relaxed">{milestone.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 md:py-28 bg-elevated">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 tracking-tight">
              Expert <span className="gradient-text">Leadership</span>
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Experienced professionals leading innovation and excellence in precision manufacturing.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8 glow-hover group"
              >
                <div className="mb-6">
                  <h3 className="text-xl font-display font-semibold text-primary mb-2 group-hover:text-lime transition-colors duration-300">
                    {leader.name}
                  </h3>
                  <div className="text-violet font-medium mb-4">{leader.role}</div>
                  <p className="text-muted leading-relaxed mb-6">{leader.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-display font-semibold text-primary mb-3">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {leader.expertise.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 text-xs rounded-full border border-lime/30 bg-lime/10 text-lime"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
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
              Partner with <span className="gradient-text">Excellence</span>
            </h2>
            <p className="text-xl text-muted mb-12 leading-relaxed">
              Join the leading OEMs who trust Neo Automatics for their critical component manufacturing needs.
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
                data-testid="cta-start-partnership"
              >
                <Zap className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Start Your Partnership
              </a>
              <a 
                href="/capabilities" 
                className="btn-secondary magnetic-btn inline-flex items-center justify-center"
                data-testid="cta-view-capabilities"
              >
                View Our Capabilities
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}