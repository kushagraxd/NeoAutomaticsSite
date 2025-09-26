import { motion } from 'framer-motion';
import { Shield, Award, CheckCircle } from 'lucide-react';

const qualityFeatures = [
  {
    icon: Shield,
    title: "ISO 9001:2015 Certified",
    description: "Internationally recognized quality management system certification"
  },
  {
    icon: Award,
    title: "Advanced Inspection",
    description: "State-of-the-art measurement and inspection equipment"
  },
  {
    icon: CheckCircle,
    title: "Quality Assurance",
    description: "Rigorous testing and validation processes for every component"
  }
];

export default function QualityPage() {
  return (
    <div className="min-h-screen bg-slate-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-slate-100 mb-6">
            Quality <span className="gradient-text">Excellence</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Committed to delivering the highest quality precision components through
            rigorous quality management systems and advanced inspection processes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {qualityFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl glow-hover"
                data-testid={`quality-${feature.title.toLowerCase().replace(/[^a-z]/g, '-')}`}
              >
                <IconComponent className="h-12 w-12 text-emerald-400 mb-6" />
                <h3 className="text-2xl font-semibold text-slate-100 mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}