import React from 'react';
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
    image: 'https://images.unsplash.com/photo-1713371398485-7bde1bde9def?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
    color: 'sky',
  },
  {
    name: 'Ratchet Starter & Pinion',
    description: 'High-precision assemblies for automotive starter systems',
    category: 'Automotive',
    image: 'https://images.unsplash.com/photo-1593019079637-ac824a5e6330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
    color: 'sky',
  },
  {
    name: 'Rocker Arms',
    description: 'Critical engine components for valve train systems',
    category: 'Automotive',
    image: 'https://images.unsplash.com/photo-1666634157070-6fd830fb5672?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
    color: 'sky',
  },
  {
    name: 'Engine Bushes',
    description: 'Including specialized 20x9 bushes for various engine applications',
    category: 'Automotive',
    image: 'https://images.unsplash.com/photo-1625464736592-fab7c7bc4e2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
    color: 'sky',
  },
  {
    name: 'Sprockets',
    description: 'High-strength sprockets for industrial and agricultural machinery',
    category: 'Industrial',
    image: 'https://images.unsplash.com/photo-1593062037896-764e9f52029e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
    color: 'orange',
  },
  {
    name: 'Gear Blanks',
    description: 'Precision blanks ready for gear tooth cutting operations',
    category: 'Agriculture',
    image: 'https://images.unsplash.com/photo-1666618090858-fbcee636bd3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250',
    color: 'green',
  },
];

const categoryColors = {
  sky: 'text-accent-primary',
  orange: 'text-accent-soft',
  green: 'text-accent-primary',
};

export default function ProductsSection() {
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
            Precision <span className="text-accent-primary">Products</span>
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
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
              className="bg-bg-elevated rounded-2xl overflow-hidden group hover:scale-105 transition-all duration-300 border border-border"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={`High-precision machined ${product.name.toLowerCase()} for ${product.category.toLowerCase()} applications`}
                  className="object-cover group-hover:scale-110 transition-transform duration-300 w-full h-full absolute inset-0"
                  loading="lazy"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjI1MCIgdmlld0JveD0iMCAwIDQwMCAyNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0yMDAgMTI1TDE2NSAxMDBIMjM1TDIwMCAxMjVaIiBmaWxsPSIjOUI5OUIzIi8+CjxwYXRoIGQ9Ik0yMDAgMTI1TDE2NSAxNTBIMjM1TDIwMCAxMjVaIiBmaWxsPSIjOUI5OUIzIi8+Cjx0ZXh0IHg9IjIwMCIgeT0iMTgwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjNkI3Mjg0IiBmb250LWZhbWlseT0iQXJpYWwiIGZvbnQtc2l6ZT0iMTQiPg0KSW1hZ2UgTm90IEF2YWlsYWJsZQ0KPC90ZXh0Pgo8L3N2Zz4K';
                  }}
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-display font-semibold text-text-primary mb-2">
                  {product.name}
                </h3>
                <p className="text-text-muted mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className={`text-sm font-medium ${categoryColors[product.color]}`}>
                    {product.category}
                  </span>
                  <button className="text-accent-primary hover:text-accent-soft transition-colors">
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
            <Button className="magnetic-btn bg-accent-primary hover:bg-accent-primary/80 text-bg-base px-8 py-4">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
