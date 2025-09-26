'use client';

import { motion } from 'framer-motion';
import { DollarSign, Shield, Gauge, Award, Maximize } from 'lucide-react';

const pillars = [
  {
    icon: DollarSign,
    title: 'Cost Leadership',
    description: 'High volume, low cost manufacturing with optimized processes',
    color: 'sky',
  },
  {
    icon: Shield,
    title: 'Reliability',
    description: 'Consistent quality with backup capacity across multiple units',
    color: 'green',
  },
  {
    icon: Gauge,
    title: 'Speed',
    description: 'Fast NPD cycles and quick tooling turnaround times',
    color: 'orange',
  },
  {
    icon: Award,
    title: 'Quality',
    description: 'ISO 9001:2015 certified with advanced metrology capabilities',
    color: 'purple',
  },
  {
    icon: Maximize,
    title: 'Scale',
    description: 'Multi-unit footprint enabling large volume production',
    color: 'cyan',
  },
];

const colorClasses = {
  sky: {
    bg: 'bg-sky-100 group-hover:bg-sky-200',
    icon: 'text-sky-500',
  },
  green: {
    bg: 'bg-green-100 group-hover:bg-green-200',
    icon: 'text-green-500',
  },
  orange: {
    bg: 'bg-orange-100 group-hover:bg-orange-200',
    icon: 'text-orange-500',
  },
  purple: {
    bg: 'bg-purple-100 group-hover:bg-purple-200',
    icon: 'text-purple-500',
  },
  cyan: {
    bg: 'bg-cyan-100 group-hover:bg-cyan-200',
    icon: 'text-cyan-500',
  },
};

export default function WhyNeoSection() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">
            Why Choose <span className="gradient-text">Neo Automatics</span>
          </h2>
          <p className="text-xl text-slate-600">
            Five pillars that set us apart in precision manufacturing
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className={`w-20 h-20 ${colorClasses[pillar.color].bg} rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors`}>
                <pillar.icon className={`${colorClasses[pillar.color].icon} text-2xl`} />
              </div>
              <h3 className="text-lg font-display font-semibold text-slate-900 mb-2">
                {pillar.title}
              </h3>
              <p className="text-slate-600 text-sm">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
