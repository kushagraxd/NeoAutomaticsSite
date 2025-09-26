'use client';

import { motion } from 'framer-motion';
import { Settings, Flame, Microscope, Building, Rocket, TrendingUp } from 'lucide-react';

const capabilities = [
  {
    icon: Settings,
    title: 'CNC Turning & VMC',
    description: '22+ CNC machines with TRAUB A30/A25/A42/A60 series for high-precision turning operations',
    badge: 'PPAP Ready',
    color: 'sky',
  },
  {
    icon: Flame,
    title: 'Heat Treatment',
    description: 'In-house sealed-quench & mesh-belt furnaces for consistent hardening and tempering',
    badge: 'ISO Certified Process',
    color: 'orange',
  },
  {
    icon: Microscope,
    title: 'Advanced Metrology',
    description: 'Complete inspection suite including profile projectors, hardness testing, and surface analysis',
    badge: 'Consistent Quality',
    color: 'green',
  },
  {
    icon: Building,
    title: 'Multi-Unit Footprint',
    description: 'Backup capacity across 3 units ensuring uninterrupted supply and scalability',
    badge: 'Redundant Capacity',
    color: 'purple',
  },
  {
    icon: Rocket,
    title: 'Fast NPD & Tooling',
    description: 'Quick development cycles with rapid prototyping and tooling turnaround capabilities',
    badge: 'Speed to Market',
    color: 'cyan',
  },
  {
    icon: TrendingUp,
    title: 'Cost Leadership',
    description: 'High volume, low cost supplier with optimized processes and economies of scale',
    badge: 'Competitive Pricing',
    color: 'rose',
  },
];

const colorClasses = {
  sky: {
    bg: 'bg-sky-100 group-hover:bg-sky-200',
    icon: 'text-sky-500',
    badge: 'text-sky-600',
  },
  orange: {
    bg: 'bg-orange-100 group-hover:bg-orange-200',
    icon: 'text-orange-500',
    badge: 'text-orange-600',
  },
  green: {
    bg: 'bg-green-100 group-hover:bg-green-200',
    icon: 'text-green-500',
    badge: 'text-green-600',
  },
  purple: {
    bg: 'bg-purple-100 group-hover:bg-purple-200',
    icon: 'text-purple-500',
    badge: 'text-purple-600',
  },
  cyan: {
    bg: 'bg-cyan-100 group-hover:bg-cyan-200',
    icon: 'text-cyan-500',
    badge: 'text-cyan-600',
  },
  rose: {
    bg: 'bg-rose-100 group-hover:bg-rose-200',
    icon: 'text-rose-500',
    badge: 'text-rose-600',
  },
};

export default function CapabilitiesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-display font-bold text-slate-900 mb-4">
            End-to-End <span className="gradient-text">Manufacturing Capabilities</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            From precision CNC turning to heat treatment and quality assurance,
            we deliver complete manufacturing solutions under one roof.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {capabilities.map((capability, index) => (
            <motion.div
              key={capability.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card p-8 rounded-2xl hover:scale-105 transition-all duration-300 group"
            >
              <div className={`w-16 h-16 ${colorClasses[capability.color].bg} rounded-2xl flex items-center justify-center mb-6 transition-colors`}>
                <capability.icon className={`${colorClasses[capability.color].icon} text-2xl`} />
              </div>
              
              <h3 className="text-xl font-display font-semibold text-slate-900 mb-3">
                {capability.title}
              </h3>
              
              <p className="text-slate-600 mb-4">
                {capability.description}
              </p>
              
              <div className={`text-sm ${colorClasses[capability.color].badge} font-medium`}>
                {capability.badge}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
