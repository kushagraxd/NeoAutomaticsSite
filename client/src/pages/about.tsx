import { motion } from 'framer-motion';
import { Users, Target, Lightbulb } from 'lucide-react';

const values = [
  {
    icon: Users,
    title: "Expert Team",
    description: "20+ years of combined experience in precision manufacturing"
  },
  {
    icon: Target,
    title: "Precision Focus",
    description: "Committed to delivering components that meet exact specifications"
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Continuous improvement and adoption of latest manufacturing technologies"
  }
];

export default function AboutPage() {
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
            About <span className="gradient-text">Neo Automatics</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto mb-8">
            Leading precision manufacturing company specializing in high-quality components
            for automotive, agriculture, and industrial applications.
          </p>
          <p className="text-lg text-slate-300 max-w-4xl mx-auto">
            With over 20 years of manufacturing excellence, Neo Automatics has established
            itself as a trusted partner for OEMs and Tier-1 suppliers. Our state-of-the-art
            facility houses 30+ CNC machines and maintains ISO 9001:2015 certification.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => {
            const IconComponent = value.icon;
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl glow-hover"
                data-testid={`value-${value.title.toLowerCase().replace(' ', '-')}`}
              >
                <IconComponent className="h-12 w-12 text-purple-400 mb-6" />
                <h3 className="text-2xl font-semibold text-slate-100 mb-4">
                  {value.title}
                </h3>
                <p className="text-slate-400">{value.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}