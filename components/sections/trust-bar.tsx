'use client';

import { motion } from 'framer-motion';

const trustedCompanies = [
  'MAHINDRA',
  'BAJAJ',
  'HERO',
  'TVS',
  'TAFE',
  'ESCORTS',
];

export default function TrustBar() {
  return (
    <section className="bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-slate-600 text-sm font-medium mb-8"
        >
          Trusted by leading OEMs & Tier-1 suppliers
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex justify-center items-center space-x-12 opacity-60"
        >
          {trustedCompanies.map((company, index) => (
            <motion.div
              key={company}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-slate-400 text-2xl font-bold hover:text-slate-600 transition-colors"
            >
              {company}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
