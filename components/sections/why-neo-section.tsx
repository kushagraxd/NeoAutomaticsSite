'use client';

import React from 'react';
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
    bg: 'bg-accent-primary/10 group-hover:bg-accent-primary/20',
    icon: 'text-accent-primary',
  },
  green: {
    bg: 'bg-accent-soft/10 group-hover:bg-accent-soft/20',
    icon: 'text-accent-soft',
  },
  orange: {
    bg: 'bg-accent-primary/10 group-hover:bg-accent-primary/20',
    icon: 'text-accent-primary',
  },
  purple: {
    bg: 'bg-accent-soft/10 group-hover:bg-accent-soft/20',
    icon: 'text-accent-soft',
  },
  cyan: {
    bg: 'bg-accent-primary/10 group-hover:bg-accent-primary/20',
    icon: 'text-accent-primary',
  },
};

export default function WhyNeoSection() {
  return (
    <section className="py-20 bg-bg-base">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-display font-bold text-text-primary mb-4">
            Why Choose <span className="gradient-text">Neo Automatics</span>
          </h2>
          <p className="text-xl text-text-muted">
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
              <h3 className="text-lg font-display font-semibold text-text-primary mb-2">
                {pillar.title}
              </h3>
              <p className="text-text-muted text-sm">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
