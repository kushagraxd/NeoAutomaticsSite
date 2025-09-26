import { motion } from 'framer-motion';
import { Cog, Wrench, Settings, CheckCircle } from 'lucide-react';

const capabilities = [
  {
    icon: Cog,
    title: "CNC Machining",
    description: "Precision 3, 4, and 5-axis CNC machining for complex geometries"
  },
  {
    icon: Wrench,
    title: "Heat Treatment",
    description: "Comprehensive heat treatment services for enhanced material properties"
  },
  {
    icon: Settings,
    title: "Quality Control",
    description: "Advanced inspection and quality assurance processes"
  }
];

export default function CapabilitiesPage() {
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
            Manufacturing <span className="gradient-text">Capabilities</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Advanced precision manufacturing capabilities serving OEMs and Tier-1 suppliers
            across automotive, agriculture, and industrial sectors.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => {
            const IconComponent = capability.icon;
            return (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl glow-hover"
                data-testid={`capability-${capability.title.toLowerCase().replace(' ', '-')}`}
              >
                <IconComponent className="h-12 w-12 text-cyan-400 mb-6" />
                <h3 className="text-2xl font-semibold text-slate-100 mb-4">
                  {capability.title}
                </h3>
                <p className="text-slate-400">{capability.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}