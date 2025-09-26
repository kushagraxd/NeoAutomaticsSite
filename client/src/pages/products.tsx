import { motion } from 'framer-motion';
import { Package, Layers, Box, Zap, Cog, Wrench, Settings, Factory, Car, Truck, Tractor } from 'lucide-react';

const productCategories = [
  {
    id: 'automotive',
    icon: Car,
    title: 'Automotive Components',
    description: 'Precision-engineered parts for automotive OEMs and Tier-1 suppliers',
    color: 'from-blue-500 to-cyan-400',
    products: [
      {
        name: 'Collars (RR Panel & RR Wheel Side)',
        description: 'High-precision collars for rear panel and wheel side applications',
        specs: ['Material: Various steel grades', 'Tolerance: ±0.02mm', 'Surface finish: Ra 0.8-1.6'],
        image: 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400'
      },
      {
        name: 'Ratchet Starter & Pinion Assemblies',
        description: 'Critical starter system components with precise engagement',
        specs: ['Material: High-strength alloy steel', 'Heat treatment: Induction hardening', 'Tolerance: ±0.01mm'],
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400'
      },
      {
        name: 'Rocker Arms',
        description: 'Engine valve train components for optimal performance',
        specs: ['Material: Case hardened steel', 'Tolerance: ±0.005mm', 'Surface treatment: Nitriding'],
        image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400'
      },
      {
        name: 'Engine Bushes (incl. 20x9)',
        description: 'Precision bushes including specialized 20x9 configurations',
        specs: ['Material: Phosphor bronze/Steel', 'Size range: 8mm to 50mm', 'Standard: 20x9 specialist'],
        image: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400'
      }
    ]
  },
  {
    id: 'agricultural',
    icon: Tractor,
    title: 'Agricultural Components',
    description: 'Durable precision parts for agricultural and farming equipment',
    color: 'from-green-500 to-emerald-400',
    products: [
      {
        name: 'Gear Blanks',
        description: 'Precision blanks ready for gear tooth cutting operations',
        specs: ['Material: Heat treated steel', 'Tolerance: ±0.02mm', 'Hardness: 25-35 HRC'],
        image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400'
      },
      {
        name: 'Tractor Components',
        description: 'Heavy-duty components for agricultural machinery',
        specs: ['Material: High-carbon steel', 'Weather resistant coating', 'Load capacity: 5000N+'],
        image: 'https://images.unsplash.com/photo-1574901532181-b41d16bb7e0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400'
      },
      {
        name: 'Hydraulic Components',
        description: 'Precision hydraulic system parts for farm equipment',
        specs: ['Working pressure: up to 350 bar', 'Temperature range: -40°C to +120°C', 'Seal compatibility: Viton/NBR'],
        image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400'
      }
    ]
  },
  {
    id: 'industrial',
    icon: Factory,
    title: 'Industrial Components',
    description: 'High-strength components for industrial machinery and systems',
    color: 'from-purple-500 to-pink-400',
    products: [
      {
        name: 'Sprockets',
        description: 'High-strength sprockets for power transmission systems',
        specs: ['Material: Heat treated steel', 'Pitch: 8mm to 32mm', 'Teeth: 8 to 120'],
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400'
      },
      {
        name: 'Custom Machined Parts',
        description: 'Bespoke components manufactured to customer specifications',
        specs: ['Material: Various alloys available', 'Tolerance: ±0.005mm', 'Complex geometries supported'],
        image: 'https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400'
      },
      {
        name: 'Precision Fixtures',
        description: 'Custom fixtures and jigs for manufacturing processes',
        specs: ['Material: Tool steel', 'Hardness: 58-62 HRC', 'Repeatability: ±0.002mm'],
        image: 'https://images.unsplash.com/photo-1530305408560-82d13781b33a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400'
      }
    ]
  }
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-6xl lg:text-7xl font-black text-white mb-8">
            Precision <span className="gradient-text animate-pulse-glow">Products</span>
          </h1>
          <p className="text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Specialized precision-machined components designed for demanding applications
            across <span className="text-cyan-400 font-semibold">automotive</span>, 
            <span className="text-emerald-400 font-semibold"> agricultural</span>, and 
            <span className="text-purple-400 font-semibold"> industrial</span> sectors.
          </p>
        </motion.div>

        {productCategories.map((category, categoryIndex) => {
          const IconComponent = category.icon;
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
              className="mb-20"
            >
              <div className="text-center mb-12">
                <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${category.color} p-4 mb-6 shadow-2xl animate-float`}>
                  <IconComponent className="h-10 w-10 text-white" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">{category.title}</h2>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">{category.description}</p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {category.products.map((product, productIndex) => (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: (categoryIndex * 0.2) + (productIndex * 0.1) }}
                    className="glass-card p-6 rounded-2xl glow-hover group overflow-hidden"
                    data-testid={`product-${product.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                  >
                    <div className="aspect-video rounded-xl overflow-hidden mb-6 bg-slate-800">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{product.name}</h3>
                    <p className="text-slate-400 mb-4 leading-relaxed">{product.description}</p>
                    <div className="space-y-2">
                      {product.specs.map((spec, specIndex) => (
                        <div key={specIndex} className="flex items-center text-sm">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.color} mr-3`}></div>
                          <span className="text-slate-300">{spec}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          );
        })}
        
        {/* Call to Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20 p-12 glass-card rounded-3xl"
        >
          <h3 className="text-3xl font-bold text-white mb-6">Need Custom Components?</h3>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Our team specializes in manufacturing precision components to your exact specifications.
            Contact us for a custom quote today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="gradient-button magnetic-btn text-white px-8 py-4 text-lg" data-testid="button-request-quote">
              Request Custom Quote
            </button>
            <button className="glass-card hover:bg-white/10 text-white px-8 py-4 text-lg rounded-xl transition-all duration-300" data-testid="button-download-catalog">
              Download Full Catalog
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}