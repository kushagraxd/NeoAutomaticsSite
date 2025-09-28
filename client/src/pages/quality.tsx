import { motion } from 'framer-motion';
import { usePageTitle } from '../lib/usePageTitle';
import { Shield, Award, CheckCircle, Target, Users, Zap, Eye, FileText, Settings, BarChart3 } from 'lucide-react';

const qualityCertifications = [
  {
    icon: Shield,
    title: "ISO 9001:2015",
    description: "Internationally recognized quality management system ensuring consistent product quality",
    year: "2015",
    scope: "Design & Manufacturing",
    color: "amber"
  },
  {
    icon: Award,
    title: "PPAP Level 3",
    description: "Production Part Approval Process certification for automotive suppliers",
    year: "Ready",
    scope: "Automotive Components",
    color: "red"
  },
  {
    icon: Target,
    title: "Lean Manufacturing",
    description: "Continuous improvement methodologies for waste reduction and efficiency",
    year: "Ongoing",
    scope: "All Operations",
    color: "amber"
  }
];

const qualityProcesses = [
  {
    icon: Eye,
    title: "Incoming Inspection",
    description: "100% material verification and certification review before production",
    steps: ["Material certificates review", "Dimensional verification", "Chemical composition check", "Surface quality assessment"]
  },
  {
    icon: Settings,
    title: "In-Process Control",
    description: "Statistical process control and real-time monitoring during manufacturing",
    steps: ["SPC implementation", "First article inspection", "Process capability studies", "Control chart monitoring"]
  },
  {
    icon: BarChart3,
    title: "Final Inspection",
    description: "Comprehensive final inspection using advanced measurement systems",
    steps: ["CMM dimensional analysis", "Surface finish measurement", "Functional testing", "Documentation package"]
  },
  {
    icon: FileText,
    title: "Documentation",
    description: "Complete traceability and quality documentation for every component",
    steps: ["Certificate of compliance", "Inspection reports", "Material traceability", "PPAP documentation"]
  }
];

const qualityEquipment = [
  { name: "CMM (Coordinate Measuring Machine)", capability: "±0.002mm accuracy", applications: "Dimensional inspection" },
  { name: "Surface Roughness Tester", capability: "Ra 0.025μm resolution", applications: "Surface finish verification" },
  { name: "Hardness Testing", capability: "HRC, HV, HB scales", applications: "Material property validation" },
  { name: "Optical Comparator", capability: "0.001mm resolution", applications: "Profile measurement" },
  { name: "Gauge Blocks & Standards", capability: "Grade 0 precision", applications: "Calibration standards" },
  { name: "Thread Gauges", capability: "Class 6H/6g tolerance", applications: "Thread verification" }
];

const qualityMetrics = [
  { metric: "99.8%", label: "On-Time Delivery", icon: Target },
  { metric: "99.5%", label: "First Pass Yield", icon: CheckCircle },
  { metric: "0.02%", label: "PPM Defect Rate", icon: Shield },
  { metric: "100%", label: "PPAP Success", icon: Award }
];

export default function QualityPage() {
  usePageTitle('Quality - ISO 9001:2015 Certified Manufacturing', 'Neo Automatics maintains the highest quality standards with ISO 9001:2015 certification, advanced inspection equipment, and rigorous QA processes.');
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
              Quality <span className="gradient-text">Excellence</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted max-w-4xl mx-auto leading-relaxed">
              Committed to delivering the highest quality precision components through
              <span className="text-amber font-semibold"> ISO 9001:2015 certified</span> processes and advanced inspection systems.
            </p>
          </motion.div>

          {/* Quality Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {qualityMetrics.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center glass-card p-6 glow-hover group"
                >
                  <IconComponent className="h-8 w-8 text-amber mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-3xl font-display font-bold text-amber mb-2">{item.metric}</div>
                  <div className="text-muted font-medium">{item.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 md:py-28 bg-elevated">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 tracking-tight">
              Certifications & <span className="gradient-text">Standards</span>
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Our quality management systems meet international standards and industry-specific requirements.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {qualityCertifications.map((cert, index) => {
              const IconComponent = cert.icon;
              const iconColor = cert.color === 'amber' ? 'text-amber' : 'text-red';
              
              return (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card p-8 glow-hover group text-center"
                  data-testid={`certification-${cert.title.toLowerCase().replace(/[^a-z]/g, '-')}`}
                >
                  <IconComponent className={`h-16 w-16 ${iconColor} mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`} />
                  <h3 className="text-xl font-display font-semibold text-primary mb-4">
                    {cert.title}
                  </h3>
                  <p className="text-muted mb-6 leading-relaxed">{cert.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Year:</span>
                      <span className={iconColor}>{cert.year}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Scope:</span>
                      <span className="text-primary">{cert.scope}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality Processes */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 tracking-tight">
              Quality <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Comprehensive quality control at every stage from raw material to finished component.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {qualityProcesses.map((process, index) => {
              const IconComponent = process.icon;
              
              return (
                <motion.div
                  key={process.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card p-8 glow-hover group"
                >
                  <IconComponent className="h-12 w-12 text-amber mb-6 group-hover:scale-110 transition-transform duration-300" />
                  <div className="sr-only" data-testid={`process-${process.title.toLowerCase().replace(/[^a-z]/g, '-')}`}></div>
                  <h3 className="text-xl font-display font-semibold text-primary mb-4">
                    {process.title}
                  </h3>
                  <p className="text-muted mb-6 leading-relaxed">{process.description}</p>
                  
                  <ul className="space-y-2">
                    {process.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-center text-sm text-muted">
                        <CheckCircle className="h-4 w-4 text-red mr-3 flex-shrink-0" />
                        {step}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality Equipment */}
      <section className="py-20 md:py-28 bg-elevated">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 tracking-tight">
              Inspection <span className="gradient-text">Equipment</span>
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              State-of-the-art measurement and inspection equipment ensuring precise quality verification.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qualityEquipment.map((equipment, index) => (
              <motion.div
                key={equipment.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-6 glow-hover"
                data-testid={`equipment-${equipment.name.toLowerCase().replace(/[^a-z\s]/g, '').replace(/\s+/g, '-')}`}
              >
                <h3 className="font-display font-semibold text-primary mb-3">{equipment.name}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted">Capability:</span>
                    <span className="text-amber font-medium">{equipment.capability}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Application:</span>
                    <span className="text-red">{equipment.applications}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Capability Histogram */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 tracking-tight">
              Process <span className="gradient-text">Capability</span>
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Statistical process control data demonstrating our manufacturing precision and consistency.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Cpk Chart */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
              data-testid="capability-cpk-chart"
            >
              <h3 className="text-xl font-display font-semibold text-primary mb-6">Process Capability (Cpk)</h3>
              <div className="space-y-4">
                {[
                  { process: "CNC Turning", cpk: 1.67, color: "amber" },
                  { process: "CNC Milling", cpk: 1.45, color: "amber" },
                  { process: "Grinding", cpk: 1.83, color: "amber" },
                  { process: "Heat Treatment", cpk: 1.52, color: "red" },
                  { process: "Surface Finishing", cpk: 1.38, color: "red" }
                ].map((item, index) => (
                  <div key={item.process} className="flex items-center justify-between">
                    <span className="text-muted text-sm">{item.process}</span>
                    <div className="flex items-center gap-3">
                      <div className="w-32 bg-elevated rounded-full h-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${Math.min((item.cpk / 2) * 100, 100)}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: index * 0.1 }}
                          className={`h-2 rounded-full ${
                            item.color === 'amber' ? 'bg-amber' : 'bg-red'
                          }`}
                        />
                      </div>
                      <span className={`font-semibold text-sm ${
                        item.color === 'amber' ? 'text-amber' : 'text-red'
                      }`}>
                        {item.cpk}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-amber/10 border border-amber/20 rounded-lg">
                <p className="text-xs text-muted">
                  <strong className="text-amber">Cpk {'>'}  1.33</strong> indicates capable process. 
                  All processes exceed automotive industry standards.
                </p>
              </div>
            </motion.div>

            {/* Quality Histogram */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8"
              data-testid="capability-histogram"
            >
              <h3 className="text-xl font-display font-semibold text-primary mb-6">Dimensional Distribution</h3>
              <div className="relative">
                {/* Histogram bars */}
                <div className="flex items-end justify-center gap-1 h-32 mb-4">
                  {[
                    { height: 20, freq: 1 },
                    { height: 35, freq: 3 },
                    { height: 55, freq: 8 },
                    { height: 85, freq: 18 },
                    { height: 100, freq: 25 },
                    { height: 85, freq: 20 },
                    { height: 55, freq: 12 },
                    { height: 35, freq: 8 },
                    { height: 20, freq: 3 }
                  ].map((bar, index) => (
                    <motion.div
                      key={index}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${bar.height}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.1 }}
                      className="w-8 bg-gradient-to-t from-amber/60 to-amber/20 rounded-t-sm"
                      style={{ height: `${bar.height}%` }}
                    />
                  ))}
                </div>
                
                {/* Normal curve overlay */}
                <div className="absolute top-4 left-0 right-0 h-24 opacity-50">
                  <svg className="w-full h-full" viewBox="0 0 200 100">
                    <motion.path
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 2 }}
                      d="M 20 80 Q 100 20 180 80"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="text-red"
                    />
                  </svg>
                </div>
                
                {/* Specification limits */}
                <div className="flex justify-between text-xs text-muted mt-2">
                  <span>LSL</span>
                  <span className="text-primary">Target: ±0.005mm</span>
                  <span>USL</span>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-red/10 border border-red/20 rounded-lg">
                  <div className="text-lg font-semibold text-red">6σ</div>
                  <div className="text-xs text-muted">Process Sigma</div>
                </div>
                <div className="p-3 bg-amber/10 border border-amber/20 rounded-lg">
                  <div className="text-lg font-semibold text-amber">99.97%</div>
                  <div className="text-xs text-muted">Within Spec</div>
                </div>
              </div>
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
              Quality You Can <span className="gradient-text">Trust</span>
            </h2>
            <p className="text-xl text-muted mb-12 leading-relaxed">
              Experience the confidence that comes with ISO 9001:2015 certified quality and comprehensive documentation.
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
                data-testid="cta-quality-consultation"
              >
                <Shield className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Quality Consultation
              </a>
              <a 
                href="/neo-quality-manual.pdf" 
                className="btn-secondary magnetic-btn inline-flex items-center justify-center"
                data-testid="cta-download-quality-manual"
                download
              >
                Download Quality Manual
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}