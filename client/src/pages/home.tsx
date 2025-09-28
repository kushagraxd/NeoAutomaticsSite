import { motion } from 'framer-motion';
import { ArrowRight, Download, CheckCircle, Factory, Users, Award, Zap, DollarSign, Clock } from 'lucide-react';
import { Link } from 'wouter';
import { Button } from '../components/ui/button';
import Counter from '../../../components/ui/counter';
import AutoPartsBackdrop from '../../../components/AutoPartsBackdrop';
import { getCompanyInfo, getManufacturingCapabilities, formatCompanyName } from '../../../shared/company';
import { usePageTitle } from '../lib/usePageTitle';

// Trust logos placeholder data
const trustLogos = [
  { name: "OEM Partner 1", width: 120 },
  { name: "OEM Partner 2", width: 100 },
  { name: "Tier-1 Supplier", width: 140 },
  { name: "Industry Leader", width: 110 },
];

// Value pills data
const valuePills = [
  {
    title: "Cost Leadership",
    description: "Competitive pricing through process optimization",
    icon: DollarSign,
    color: "text-amber"
  },
  {
    title: "Reliability", 
    description: "ISO 9001:2015 certified quality systems",
    icon: Award,
    color: "text-red"
  },
  {
    title: "Speed & Agility",
    description: "Rapid prototyping and quick turnaround",
    icon: Zap,
    color: "text-amber"
  }
];

// Metrics data - now using company data
const getMetrics = (capabilities: any) => [
  { target: capabilities.machines.CNC, label: "CNC Machines", suffix: "+" },
  { target: capabilities.units.length, label: "Manufacturing Units", suffix: "" },
  { target: 2015, label: "ISO 9001 Certified", suffix: "" },
  { target: 100, label: "PPAP Ready", suffix: "%" }
];

// Featured products data
const featuredProducts = [
  {
    name: "Precision Collars",
    category: "Automotive",
    description: "High-precision RR Panel & Wheel Side collars",
    tolerance: "±0.02mm"
  },
  {
    name: "Rocker Arms",
    category: "Engine Components", 
    description: "Critical valve train components",
    tolerance: "±0.005mm"
  },
  {
    name: "Sprockets",
    category: "Industrial",
    description: "Power transmission components", 
    tolerance: "±0.01mm"
  }
];

export default function HomePage() {
  usePageTitle('Neo Automatics - Precision Machined Components for OEMs & Tier-1s', 'End-to-end machining, heat treatment & QA—delivered at scale. ISO 9001:2015 certified manufacturer with 20+ years experience.', '%s');
  
  const companyInfo = getCompanyInfo();
  const capabilities = getManufacturingCapabilities();
  const { firstWord, restOfName } = formatCompanyName(companyInfo.name);
  
  return (
    <div className="min-h-screen bg-base">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Professional AutoParts Backdrop */}
        <AutoPartsBackdrop />
        
        {/* Industrial hero background gradient */}
        <div className="absolute inset-0 hero-bg opacity-40" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-display font-bold text-primary mb-6 tracking-tight leading-tight">
              {firstWord} <span className="gradient-text">{restOfName}</span>
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-display font-semibold text-muted mb-8">
              Precision Machined Components for OEMs & Tier-1s
            </h2>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl md:text-2xl text-muted mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              End-to-end machining, heat treatment & QA—delivered at scale.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link href="/contact">
                <Button 
                  className="btn-primary magnetic-btn group" 
                  data-testid="hero-request-quote"
                  aria-label="Request a quote for precision machining services"
                >
                  <ArrowRight className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  Request a Quote
                </Button>
              </Link>
              
              <a 
                href="/neo-capability-profile.pdf" 
                download
                className="btn-secondary magnetic-btn group inline-flex items-center"
                data-testid="hero-download-capability"
                aria-label="Download Neo Automatics capability profile PDF"
              >
                <Download className="mr-2 h-5 w-5 group-hover:translate-y-0.5 transition-transform" />
                Download Capability Profile
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Trust Bar */}
      <section className="py-16 bg-elevated border-y border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <p className="text-muted font-medium">Trusted by leading OEMs & Tier-1 suppliers</p>
          </motion.div>
          
          <div className="flex justify-center items-center gap-12 opacity-40">
            {trustLogos.map((logo, index) => (
              <motion.div
                key={logo.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card rounded-2xl px-6 py-3"
                style={{ width: logo.width }}
              >
                <div className="text-muted font-medium text-sm">{logo.name}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Pills */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 tracking-tight">
              Why Industry Leaders <span className="gradient-text">Choose Us</span>
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Three core pillars that drive our manufacturing excellence and customer success.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {valuePills.map((pill, index) => {
              const IconComponent = pill.icon;
              return (
                <motion.div
                  key={pill.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card rounded-2xl p-8 glow-hover group"
                  data-testid={`value-pill-${pill.title.toLowerCase().replace(/[^a-z]/g, '-')}`}
                >
                  <IconComponent className={`h-12 w-12 ${pill.color} mb-6 group-hover:scale-110 transition-transform duration-300`} />
                  <h3 className="text-xl font-display font-semibold text-primary mb-4">
                    {pill.title}
                  </h3>
                  <p className="text-muted leading-relaxed">{pill.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="py-20 md:py-28 bg-elevated">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 tracking-tight">
              Manufacturing <span className="gradient-text">Excellence</span>
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Numbers that demonstrate our scale, capability, and commitment to quality.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {getMetrics(capabilities).map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center glass-card rounded-2xl p-6 glow-hover"
                data-testid={`metric-${metric.label.toLowerCase().replace(/[^a-z]/g, '-')}`}
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-amber mb-2">
                  <Counter target={metric.target} suffix={metric.suffix} />
                </div>
                <div className="text-muted font-medium">{metric.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Snapshot */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 tracking-tight">
              Manufacturing <span className="gradient-text">Capabilities</span>
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Complete machining, heat treatment, and QA capabilities under one roof.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0 }}
              className="glass-card rounded-2xl p-8 glow-hover group"
              data-testid="capability-machining"
            >
              <Factory className="h-12 w-12 text-amber mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-display font-semibold text-primary mb-4">
                CNC Machining
              </h3>
              <p className="text-muted leading-relaxed mb-4">{capabilities.machines.CNC}+ CNC machines including TRAUB multi-spindle automats for high-volume precision.</p>
              <div className="text-amber font-medium">{capabilities.machines.TRAUB_A30_A25 + capabilities.machines.TRAUB_A42_A60} TRAUB • {capabilities.machines.Centerless_Grinder}+ Grinders</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card rounded-2xl p-8 glow-hover group"
              data-testid="capability-heat-treatment"
            >
              <Zap className="h-12 w-12 text-red mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-display font-semibold text-primary mb-4">
                Heat Treatment
              </h3>
              <p className="text-muted leading-relaxed mb-4">In-house quenching and tempering with sealed furnaces and mesh belt systems.</p>
              <div className="text-red font-medium">Sealed Quench • Mesh Belt</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="glass-card rounded-2xl p-8 glow-hover group"
              data-testid="capability-qa"
            >
              <Award className="h-12 w-12 text-amber mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="text-xl font-display font-semibold text-primary mb-4">
                Inspection & QA
              </h3>
              <p className="text-muted leading-relaxed mb-4">Complete metrology lab with Rockwell testers, surface roughness, and profile projectors.</p>
              <div className="text-amber font-medium">{capabilities.certifications.join(' • ')}</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Timeline */}
      <section className="py-20 md:py-28 bg-elevated">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 tracking-tight">
              Our <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              From concept to delivery, our streamlined process ensures quality and speed.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Requirements", description: "Technical drawing analysis and feasibility study", icon: Users },
              { step: "02", title: "Prototyping", description: "Rapid prototyping and design validation", icon: Factory },
              { step: "03", title: "Production", description: "High-volume manufacturing with quality control", icon: Zap },
              { step: "04", title: "Delivery", description: "PPAP documentation and on-time shipment", icon: CheckCircle }
            ].map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center glass-card rounded-2xl p-6 glow-hover group"
                  data-testid={`process-step-${item.step}`}
                >
                  <div className="text-amber font-display text-lg font-bold mb-4">{item.step}</div>
                  <IconComponent className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="text-lg font-display font-semibold text-primary mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Case Teasers */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 tracking-tight">
              Success <span className="gradient-text">Stories</span>
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Real results from our partnerships with industry leaders.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="glass-card rounded-2xl p-8 glow-hover group"
              data-testid="case-automotive"
            >
              <div className="text-red font-medium mb-2">Automotive OEM</div>
              <h3 className="text-xl font-display font-semibold text-primary mb-4">
                50% Cost Reduction in Rocker Arms
              </h3>
              <p className="text-muted leading-relaxed mb-6">
                Optimized manufacturing process reduced per-unit cost by 50% while maintaining ±0.005mm tolerance requirements for critical valve train components.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-amber font-medium">2M+ units delivered</span>
                <ArrowRight className="h-5 w-5 text-amber group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="glass-card rounded-2xl p-8 glow-hover group"
              data-testid="case-agriculture"
            >
              <div className="text-red font-medium mb-2">Agriculture Equipment</div>
              <h3 className="text-xl font-display font-semibold text-primary mb-4">
                30-Day Development Cycle
              </h3>
              <p className="text-muted leading-relaxed mb-6">
                Rapid prototyping and PPAP approval achieved in record time for complex sprocket assemblies, enabling faster market entry.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-amber font-medium">15-day PPAP approval</span>
                <ArrowRight className="h-5 w-5 text-amber group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 tracking-tight">
              Featured <span className="gradient-text">Products</span>
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Precision-engineered components that power the world's leading machines.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card rounded-2xl p-6 glow-hover group"
                data-testid={`featured-product-${product.name.toLowerCase().replace(/[^a-z]/g, '-')}`}
              >
                <div className="aspect-square bg-gradient-to-br from-amber/10 to-red/10 rounded-lg mb-6 flex items-center justify-center group-hover:from-amber/20 group-hover:to-red/20 transition-colors duration-300">
                  <Factory className="h-12 w-12 text-amber" />
                </div>
                <div className="text-sm text-red font-medium mb-2">{product.category}</div>
                <h3 className="text-lg font-display font-semibold text-primary mb-3">
                  {product.name}
                </h3>
                <p className="text-muted mb-4 leading-relaxed">{product.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-amber font-medium">Tolerance: {product.tolerance}</span>
                  <CheckCircle className="h-5 w-5 text-amber" />
                </div>
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
              Ready to Start Your <span className="gradient-text">Next Project?</span>
            </h2>
            <p className="text-xl text-muted mb-12 leading-relaxed">
              Partner with Neo Automatics for precision components that exceed expectations. 
              Get your custom quote today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact">
                <Button 
                  className="btn-primary magnetic-btn group" 
                  data-testid="cta-request-quote"
                  aria-label="Get started with your precision machining project"
                >
                  <ArrowRight className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  Request a Quote
                </Button>
              </Link>
              
              <Link href="/capabilities">
                <Button 
                  className="btn-secondary magnetic-btn" 
                  data-testid="cta-view-capabilities"
                  aria-label="Learn more about our manufacturing capabilities"
                >
                  View Our Capabilities
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}