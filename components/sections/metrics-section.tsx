'use client';

import { motion } from 'framer-motion';
import Counter from '../ui/counter';
import companyData from '../../data/company.json';

const metrics = [
  {
    target: 30,
    label: 'CNC Machines',
    suffix: '',
  },
  {
    target: 20,
    label: 'Years Experience',
    suffix: '+',
  },
  {
    target: 3,
    label: 'Manufacturing Units',
    suffix: '',
  },
  {
    target: 100,
    label: '% Quality Assurance',
    suffix: '',
  },
];

export default function MetricsSection() {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-display font-bold mb-4">
            Manufacturing <span className="gradient-text">Excellence</span>
          </h2>
          <p className="text-xl text-slate-300">
            Numbers that speak to our scale and capability
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl font-display font-bold mb-2 counter">
                <Counter target={metric.target} suffix={metric.suffix} />
              </div>
              <div className="text-slate-300 text-lg">{metric.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
