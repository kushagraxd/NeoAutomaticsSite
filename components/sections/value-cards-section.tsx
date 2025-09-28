import { motion } from 'framer-motion';
import { DollarSign, Shield, Zap } from 'lucide-react';

const valueCards = [
  {
    icon: DollarSign,
    title: "Cost Leadership",
    description: "Competitive pricing without compromising quality through efficient processes and economies of scale",
    color: "text-accent-primary"
  },
  {
    icon: Shield,
    title: "Reliability", 
    description: "Consistent quality and on-time delivery backed by ISO 9001:2015 certification and rigorous testing",
    color: "text-accent-secondary"
  },
  {
    icon: Zap,
    title: "Speed & Agility",
    description: "Rapid prototyping and fast turnaround times to meet your most demanding project schedules",
    color: "text-accent-primary"
  }
];

export default function ValueCardsSection() {
  return (
    <section className="py-20 bg-bg-base relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold text-text-primary mb-4">
            Why Choose <span className="text-accent-primary">Neo Automatics</span>
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Three core advantages that set us apart in precision manufacturing
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {valueCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-elevated p-8 rounded-2xl text-center group border border-border"
                data-testid={`value-card-${card.title.toLowerCase().replace(/[^a-z]/g, '-')}`}
              >
                <div className="mb-6 flex justify-center">
                  <div className="p-4 rounded-full bg-bg-elevated group-hover:bg-accent-primary/10 transition-colors">
                    <IconComponent className={`h-8 w-8 ${card.color}`} />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-4">
                  {card.title}
                </h3>
                <p className="text-text-muted leading-relaxed">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}