import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight } from 'lucide-react';
import { Button } from '../../client/src/components/ui/button';
import companyData from '../../data/company.json';

const productDetails = [
  {
    name: 'Collars',
    description: 'RR Panel & RR Wheel Side collars for automotive applications',
    category: 'Automotive',
    image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
    color: 'sky',
  },
  {
    name: 'Ratchet Starter & Pinion',
    description: 'High-precision assemblies for automotive starter systems',
    category: 'Automotive',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
    color: 'sky',
  },
  {
    name: 'Rocker Arms',
    description: 'Critical engine components for valve train systems',
    category: 'Automotive',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
    color: 'sky',
  },
  {
    name: 'Engine Bushes',
    description: 'Including specialized 20x9 bushes for various engine applications',
    category: 'Automotive',
    image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
    color: 'sky',
  },
  {
    name: 'Sprockets',
    description: 'High-strength sprockets for industrial and agricultural machinery',
    category: 'Industrial',
    image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
    color: 'orange',
  },
  {
    name: 'Gear Blanks',
    description: 'Precision blanks ready for gear tooth cutting operations',
    category: 'Agriculture',
    image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
    color: 'green',
  },
];

const categoryColors = {
  sky: 'text-sky-600',
  orange: 'text-orange-600',
  green: 'text-green-600',
};

export default function ProductsSection() {
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
            Precision <span className="gradient-text">Products</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Specialized components for automotive, agriculture, and industrial applications
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {productDetails.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card rounded-2xl overflow-hidden group hover:scale-105 transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={`${product.name} - ${product.description}`}
                  className="object-cover group-hover:scale-110 transition-transform duration-300 w-full h-full absolute inset-0"
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold text-slate-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-slate-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-medium ${categoryColors[product.color]}`}>
                    {product.category}
                  </span>
                  <button className="text-sky-500 hover:text-sky-600 transition-colors">
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/products">
            <Button className="magnetic-btn bg-sky-500 hover:bg-sky-600 text-white px-8 py-4">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
