import { motion } from 'framer-motion';
import { Package, Layers, Box } from 'lucide-react';

const productCategories = [
  {
    icon: Package,
    title: "Engine Components",
    description: "Precision-machined engine bushes, collars, and rocker arms"
  },
  {
    icon: Layers,
    title: "Agricultural Parts",
    description: "Durable components for tractors and agricultural equipment"
  },
  {
    icon: Box,
    title: "Industrial Components",
    description: "Specialized parts for industrial machinery and systems"
  }
];

export default function ProductsPage() {
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
            Precision <span className="gradient-text">Products</span>
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Specialized precision-machined components designed for demanding applications
            across automotive, agricultural, and industrial sectors.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8 rounded-2xl glow-hover"
                data-testid={`product-${category.title.toLowerCase().replace(' ', '-')}`}
              >
                <IconComponent className="h-12 w-12 text-blue-400 mb-6" />
                <h3 className="text-2xl font-semibold text-slate-100 mb-4">
                  {category.title}
                </h3>
                <p className="text-slate-400">{category.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}