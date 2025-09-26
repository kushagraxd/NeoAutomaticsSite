import { motion } from 'framer-motion';
import { Car, Tractor, Factory } from 'lucide-react';

const industries = [
  {
    icon: Car,
    title: "Automotive",
    description: "Precision components for OEMs and Tier-1 suppliers in the automotive sector"
  },
  {
    icon: Tractor,
    title: "Agriculture",
    description: "Durable components for agricultural machinery and equipment"
  },
  {
    icon: Factory,
    title: "Industrial",
    description: "Specialized parts for industrial equipment and manufacturing systems"
  }
];

export default function IndustriesPage() {
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
            Industries We <span className="gradient-text">Serve</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Delivering precision manufacturing solutions across diverse industrial sectors
            with specialized expertise and quality standards.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {industries.map((industry, index) => {
            const IconComponent = industry.icon;
            return (
              <motion.div
                key={industry.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl glow-hover"
                data-testid={`industry-${industry.title.toLowerCase()}`}
              >
                <IconComponent className="h-12 w-12 text-sky-400 mb-6" />
                <h3 className="text-2xl font-semibold text-slate-100 mb-4">
                  {industry.title}
                </h3>
                <p className="text-slate-400">{industry.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}