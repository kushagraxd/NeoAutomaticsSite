import { motion } from 'framer-motion';
import { usePageTitle } from '../lib/usePageTitle';
import { Users, Target, Lightbulb, Award, Factory, Clock, Shield, Zap, CheckCircle } from 'lucide-react';

const companyValues = [
  {
    icon: Users,
    title: "Expert Team",
    description: "20+ years of combined experience in precision manufacturing and engineering excellence",
    color: "amber"
  },
  {
    icon: Target,
    title: "Precision Focus",
    description: "Committed to delivering components that exceed specifications with uncompromising quality",
    color: "red"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Continuous improvement and adoption of cutting-edge manufacturing technologies",
    color: "amber"
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "ISO 9001:2015 certified processes ensuring consistent excellence in every component",
    color: "red"
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
  usePageTitle('About Us - 20+ Years of Manufacturing Excellence', 'Learn about Neo Automatics, a family-run ISO 9001:2015 certified manufacturer with 20+ years of experience in precision machined components.');
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
              for <span className="text-amber font-semibold">automotive, agriculture, and industrial</span> applications.
            </p>
            <p className="text-lg text-muted max-w-4xl mx-auto leading-relaxed">
              With over 20 years of manufacturing excellence, Neo Automatics has established
              itself as a trusted partner for OEMs and Tier-1 suppliers. Our state-of-the-art
              facility houses <span className="text-red font-semibold">30+ CNC machines</span> and maintains ISO 9001:2015 certification.
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
                  data-testid={`company-stat-${stat.label.toLowerCase().replace(/[^a-z]/g, '-')}`}
                >
                  <IconComponent className="h-8 w-8 text-amber mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-3xl font-display font-bold text-amber mb-2">{stat.value}</div>
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
              const iconColor = value.color === 'amber' ? 'text-amber' : 'text-red';
              
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
                data-testid={`milestone-${milestone.year}`}
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
                  <h3 className="text-xl font-display font-semibold text-primary mb-2 group-hover:text-amber transition-colors duration-300">
                    {leader.name}
                  </h3>
                  <div className="text-red font-medium mb-4">{leader.role}</div>
                  <p className="text-muted leading-relaxed mb-6">{leader.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-display font-semibold text-primary mb-3">Expertise</h4>
                  <div className="flex flex-wrap gap-2">
                    {leader.expertise.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="px-3 py-1 text-xs rounded-full border border-amber/30 bg-amber/10 text-amber"
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

      {/* Leadership Message */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 tracking-tight">
              Message from <span className="gradient-text">Leadership</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-12 glow-hover"
            data-testid="leadership-message"
          >
            <div className="flex items-start gap-8 max-w-4xl mx-auto">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber/20 to-red/20 flex items-center justify-center">
                  <span className="text-2xl font-display font-bold text-amber">KD</span>
                </div>
              </div>
              <div className="flex-1">
                <blockquote className="text-lg md:text-xl text-muted leading-relaxed italic mb-6">
                  "At Neo Automatics, we believe precision is not just about meeting specifications – it's about exceeding expectations. 
                  For over two decades, our team has been dedicated to pushing the boundaries of manufacturing excellence. Every component 
                  we produce carries with it our commitment to quality, innovation, and the success of our partners. As we look towards 
                  the future, we remain focused on delivering solutions that drive the automotive, agricultural, and industrial sectors forward."
                </blockquote>
                <div className="flex items-center gap-2">
                  <div>
                    <div className="text-lg font-display font-semibold text-primary">Kushagra Dhingra</div>
                    <div className="text-amber font-medium">Founder & Managing Director</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Manufacturing Units Map */}
      <section className="py-20 md:py-28 bg-elevated">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 tracking-tight">
              Our Manufacturing <span className="gradient-text">Network</span>
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Three strategically located manufacturing units in Pune, Maharashtra, ensuring optimal production capacity and logistics.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Map SVG */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
              data-testid="manufacturing-units-map"
            >
              <h3 className="text-xl font-display font-semibold text-primary mb-6 text-center">Pune Manufacturing Hub</h3>
              <svg viewBox="0 0 400 300" className="w-full h-auto">
                {/* Background */}
                <rect width="400" height="300" fill="currentColor" className="text-elevated opacity-50" />
                
                {/* Pune city outline (simplified) */}
                <path
                  d="M80 120 L120 100 L180 110 L240 105 L280 120 L320 140 L300 180 L280 220 L220 240 L160 235 L100 220 L70 180 Z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="text-amber opacity-60"
                />
                
                {/* Unit locations */}
                <g className="text-amber">
                  {/* Unit 1 */}
                  <circle cx="140" cy="150" r="8" fill="currentColor" />
                  <text x="140" y="145" textAnchor="middle" className="text-xs font-semibold" fill="currentColor">1</text>
                  
                  {/* Unit 2 */}
                  <circle cx="200" cy="170" r="8" fill="currentColor" />
                  <text x="200" y="165" textAnchor="middle" className="text-xs font-semibold" fill="currentColor">2</text>
                  
                  {/* Unit 3 */}
                  <circle cx="240" cy="140" r="8" fill="currentColor" />
                  <text x="240" y="135" textAnchor="middle" className="text-xs font-semibold" fill="currentColor">3</text>
                </g>
                
                {/* Connection lines */}
                <g stroke="currentColor" strokeWidth="1" className="text-red opacity-40">
                  <line x1="140" y1="150" x2="200" y2="170" strokeDasharray="5,5" />
                  <line x1="200" y1="170" x2="240" y2="140" strokeDasharray="5,5" />
                  <line x1="240" y1="140" x2="140" y2="150" strokeDasharray="5,5" />
                </g>
                
                {/* Title */}
                <text x="200" y="40" textAnchor="middle" className="text-lg font-display font-semibold" fill="currentColor">
                  Pune, Maharashtra
                </text>
              </svg>
            </motion.div>

            {/* Unit Details */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {[
                {
                  unit: "Unit 1",
                  area: "Pimpri-Chinchwad",
                  specialization: "CNC Machining & Turning",
                  machines: "12 CNC Machines",
                  focus: "Automotive Components"
                },
                {
                  unit: "Unit 2", 
                  area: "Hadapsar",
                  specialization: "Precision Grinding & Finishing",
                  machines: "8 CNC Machines",
                  focus: "Agricultural Parts"
                },
                {
                  unit: "Unit 3",
                  area: "Chakan",
                  specialization: "Assembly & Quality Control",
                  machines: "10+ CNC Machines",
                  focus: "Industrial Components"
                }
              ].map((unit, index) => (
                <motion.div
                  key={unit.unit}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="glass-card p-6 glow-hover group"
                  data-testid={`unit-${unit.unit.toLowerCase().replace(' ', '-')}`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full ${index % 2 === 0 ? 'bg-amber' : 'bg-red'} flex items-center justify-center text-base font-bold text-black`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-display font-semibold text-primary mb-2">{unit.unit} - {unit.area}</h4>
                      <div className="space-y-1 text-sm text-muted">
                        <div><span className="text-amber font-medium">Specialization:</span> {unit.specialization}</div>
                        <div><span className="text-red font-medium">Capacity:</span> {unit.machines}</div>
                        <div><span className="text-amber font-medium">Primary Focus:</span> {unit.focus}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
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