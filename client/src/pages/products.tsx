import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { Package, Car, Tractor, Factory, Zap, CheckCircle, Download, Target, Award } from 'lucide-react';
import ProductQuoteModal from '../../../components/ProductQuoteModal';
import { usePageTitle } from '../lib/usePageTitle';

// Type definitions
interface Product {
  name: string;
  description: string;
  specs: string[];
  applications: string[];
}

interface ProductCategory {
  id: string;
  icon: any;
  title: string;
  description: string;
  color: string;
  stats: {
    parts: string;
    volume: string;
    tolerance: string;
  };
  products: Product[];
}

interface SelectedProductType {
  name: string;
  category: string;
  image?: string;
  description?: string;
  specs?: string[];
  applications?: string[];
}

const productCategories = [
  {
    id: 'automotive',
    icon: Car,
    title: 'Automotive Components',
    description: 'Precision-engineered parts for automotive OEMs and Tier-1 suppliers',
    color: 'amber',
    stats: { parts: '15+', volume: '500K+', tolerance: '±0.005mm' },
    products: [
      {
        name: 'Collars (RR Panel & RR Wheel Side)',
        description: 'High-precision collars for rear panel and wheel side applications with superior surface finish',
        specs: ['Material: Various steel grades', 'Tolerance: ±0.02mm', 'Surface finish: Ra 0.8-1.6', 'Heat treatment: As required'],
        applications: ['Passenger vehicles', 'Commercial vehicles', 'Electric vehicles']
      },
      {
        name: 'Ratchet Starter & Pinion Assemblies',
        description: 'Critical starter system components with precise engagement characteristics',
        specs: ['Material: High-strength alloy steel', 'Heat treatment: Induction hardening', 'Tolerance: ±0.01mm', 'Hardness: 58-62 HRC'],
        applications: ['Engine starting systems', 'Automotive starters', 'Heavy-duty applications']
      },
      {
        name: 'Rocker Arms',
        description: 'Engine valve train components engineered for optimal performance and durability',
        specs: ['Material: Case hardened steel', 'Tolerance: ±0.005mm', 'Surface treatment: Nitriding', 'Wear resistance: Enhanced'],
        applications: ['Internal combustion engines', 'Valve train systems', 'Performance engines']
      },
      {
        name: 'Engine Bushes (incl. 20x9)',
        description: 'Precision bushes including specialized 20x9 configurations for critical engine applications',
        specs: ['Material: Phosphor bronze/Steel', 'Size range: 8mm to 50mm', 'Standard: 20x9 specialist', 'Load capacity: High'],
        applications: ['Engine assemblies', 'Suspension systems', 'Steering mechanisms']
      }
    ]
  },
  {
    id: 'agricultural',
    icon: Tractor,
    title: 'Agricultural Components',
    description: 'Durable precision parts for agricultural and farming equipment',
    color: 'red',
    stats: { parts: '12+', volume: '300K+', tolerance: '±0.01mm' },
    products: [
      {
        name: 'Gear Blanks',
        description: 'Precision blanks ready for gear tooth cutting operations with superior material properties',
        specs: ['Material: Heat treated steel', 'Tolerance: ±0.02mm', 'Hardness: 25-35 HRC', 'Machinability: Excellent'],
        applications: ['Transmission gears', 'Differential systems', 'Power take-off units']
      },
      {
        name: 'Tractor Components',
        description: 'Heavy-duty components designed for the demanding agricultural environment',
        specs: ['Material: High-carbon steel', 'Weather resistant coating', 'Load capacity: 5000N+', 'Corrosion protection: Enhanced'],
        applications: ['Farm tractors', 'Harvesting equipment', 'Planting machinery']
      },
      {
        name: 'Hydraulic Components',
        description: 'Precision hydraulic system parts engineered for reliable agricultural operations',
        specs: ['Working pressure: up to 350 bar', 'Temperature range: -40°C to +120°C', 'Seal compatibility: Viton/NBR', 'Fatigue resistance: High'],
        applications: ['Hydraulic cylinders', 'Control valves', 'Loader systems']
      },
      {
        name: 'Sprockets & Chains',
        description: 'Power transmission components for agricultural machinery drive systems',
        specs: ['Material: Case hardened steel', 'Pitch: 15.875mm to 50.8mm', 'Teeth: 8 to 60', 'Chain compatibility: ANSI standard'],
        applications: ['Conveyor systems', 'Drive mechanisms', 'Harvester chains']
      }
    ]
  },
  {
    id: 'industrial',
    icon: Factory,
    title: 'Industrial Components',
    description: 'High-strength components for industrial machinery and manufacturing systems',
    color: 'amber',
    stats: { parts: '20+', volume: '200K+', tolerance: '±0.02mm' },
    products: [
      {
        name: 'Sprockets',
        description: 'High-strength sprockets for industrial power transmission systems',
        specs: ['Material: Heat treated steel', 'Pitch: 8mm to 32mm', 'Teeth: 8 to 120', 'Hub options: Various'],
        applications: ['Conveyor systems', 'Manufacturing lines', 'Material handling']
      },
      {
        name: 'Machine Tool Components',
        description: 'Precision components for CNC machines and manufacturing equipment',
        specs: ['Material: Tool steel/Stainless', 'Tolerance: ±0.005mm', 'Surface finish: Mirror polish', 'Hardness: 45-60 HRC'],
        applications: ['CNC machining centers', 'Spindle assemblies', 'Tool holders']
      },
      {
        name: 'Pump Components',
        description: 'Critical components for industrial pumping systems and fluid handling',
        specs: ['Material: Stainless steel/Bronze', 'Pressure rating: 250 PSI+', 'Corrosion resistance: Excellent', 'Precision: ±0.01mm'],
        applications: ['Centrifugal pumps', 'Gear pumps', 'Hydraulic systems']
      },
      {
        name: 'Custom Fixtures & Tooling',
        description: 'Specialized manufacturing fixtures and tooling solutions',
        specs: ['Material: Tool steel/Aluminum', 'Tolerance: ±0.005mm', 'Repeatability: ±0.002mm', 'Durability: Extended life'],
        applications: ['Assembly fixtures', 'Inspection gauges', 'Production tooling']
      }
    ]
  }
];

const productBenefits = [
  {
    icon: Target,
    title: 'Precision Excellence',
    description: 'Tight tolerances down to ±0.005mm using advanced CNC technology',
    metric: '±0.005mm'
  },
  {
    icon: Award,
    title: 'Quality Certified',
    description: 'ISO 9001:2015 certified processes with comprehensive documentation',
    metric: '99.8%'
  },
  {
    icon: CheckCircle,
    title: 'PPAP Ready',
    description: 'Production Part Approval Process documentation for automotive suppliers',
    metric: '100%'
  },
  {
    icon: Zap,
    title: 'Rapid Turnaround',
    description: 'Quick prototyping and production with 30+ CNC machines',
    metric: '30+'
  }
];

export default function ProductsPage() {
  usePageTitle('Products - Precision Machined Components', 'Explore our range of precision machined components for automotive, agriculture, and industrial applications including collars, rocker arms, and more.');
  const [selectedProduct, setSelectedProduct] = useState<SelectedProductType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [location] = useLocation();

  // Parse query parameters and auto-open product modal
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const productParam = params.get('product');
    
    if (productParam) {
      // Find the product by name (case-insensitive, handle URL encoding)
      const productName = decodeURIComponent(productParam).toLowerCase();
      
      for (const category of productCategories) {
        const foundProduct = category.products.find(p => 
          p.name.toLowerCase().includes(productName) || 
          productName.includes(p.name.toLowerCase())
        );
        
        if (foundProduct) {
          const productWithImage: SelectedProductType = {
            ...foundProduct,
            category: category.title,
            image: undefined // Add actual product images if available
          };
          setSelectedProduct(productWithImage);
          setIsModalOpen(true);
          break;
        }
      }
    }
  }, [location]);

  const openModal = (product: Product, category: ProductCategory) => {
    const productWithImage: SelectedProductType = {
      ...product,
      category: category.title,
      image: undefined // Add actual product images if available
    };
    setSelectedProduct(productWithImage);
    setIsModalOpen(true);
    
    // Update URL with product parameter for deep linking
    const productParam = encodeURIComponent(product.name);
    window.history.pushState(null, '', `?product=${productParam}`);
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
    
    // Clear query parameter when closing modal
    window.history.pushState(null, '', window.location.pathname);
  };

  return (
    <div className="min-h-screen bg-base">
      {/* Hero Section */}
      <section className="relative py-28 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 aurora-bg opacity-10" />
        <div className="geometric-shape geometric-shape-1" />
        <div className="geometric-shape geometric-shape-2" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-primary mb-6 tracking-tight leading-tight">
              Product <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted max-w-4xl mx-auto leading-relaxed">
              Comprehensive range of precision-manufactured components serving
              <span className="text-amber font-semibold"> automotive, agricultural, and industrial</span> sectors worldwide.
            </p>
          </motion.div>

          {/* Product Benefits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {productBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center glass-card p-6 glow-hover group"
                  data-testid={`product-benefit-${benefit.title.toLowerCase().replace(/[^a-z]/g, '-')}`}
                >
                  <IconComponent className="h-8 w-8 text-amber mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <div className="text-2xl font-display font-bold text-amber mb-2">{benefit.metric}</div>
                  <h3 className="text-sm font-display font-semibold text-primary mb-2">{benefit.title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="space-y-32">
            {productCategories.map((category, categoryIndex) => {
              const IconComponent = category.icon;
              const iconColor = category.color === 'amber' ? 'text-amber' : 'text-red';
              const isReverse = categoryIndex % 2 === 1;
              
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="space-y-12"
                  data-testid={`product-category-${category.id}`}
                >
                  {/* Category Header */}
                  <div className="text-center">
                    <IconComponent className={`h-16 w-16 ${iconColor} mx-auto mb-6`} />
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 tracking-tight">
                      {category.title}
                    </h2>
                    <p className="text-xl text-muted max-w-3xl mx-auto mb-8 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Category Stats */}
                    <div className="flex justify-center gap-8 mb-12">
                      <div className="text-center">
                        <div className={`text-2xl font-display font-bold ${iconColor} mb-1`}>{category.stats.parts}</div>
                        <div className="text-muted text-sm">Product Types</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-display font-bold ${iconColor} mb-1`}>{category.stats.volume}</div>
                        <div className="text-muted text-sm">Parts/Year</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-2xl font-display font-bold ${iconColor} mb-1`}>{category.stats.tolerance}</div>
                        <div className="text-muted text-sm">Best Tolerance</div>
                      </div>
                    </div>
                  </div>

                  {/* Products Grid */}
                  <div className="grid md:grid-cols-2 gap-8">
                    {category.products.map((product, productIndex) => (
                      <motion.div
                        key={product.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: productIndex * 0.1 }}
                        className="glass-card p-8 glow-hover group"
                        data-testid={`product-${product.name.toLowerCase().replace(/[^a-z]/g, '-')}`}
                      >
                        <h3 className="text-xl font-display font-semibold text-primary mb-4 group-hover:text-amber transition-colors duration-300">
                          {product.name}
                        </h3>
                        <p className="text-muted mb-6 leading-relaxed">{product.description}</p>
                        
                        {/* Specifications */}
                        <div className="mb-6">
                          <h4 className="text-sm font-display font-semibold text-primary mb-3">Specifications</h4>
                          <ul className="space-y-2">
                            {product.specs.map((spec, specIndex) => (
                              <li key={specIndex} className="flex items-center text-sm text-muted">
                                <CheckCircle className={`h-3 w-3 ${iconColor} mr-3 flex-shrink-0`} />
                                {spec}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Applications */}
                        <div>
                          <h4 className="text-sm font-display font-semibold text-primary mb-3">Applications</h4>
                          <div className="flex flex-wrap gap-2">
                            {product.applications.map((app, appIndex) => (
                              <span
                                key={appIndex}
                                className={`px-3 py-1 text-xs rounded-full border ${
                                  category.color === 'amber' 
                                    ? 'border-amber/30 bg-amber/10 text-amber' 
                                    : 'border-red/30 bg-red/10 text-red'
                                }`}
                              >
                                {app}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {/* View Details Button */}
                        <button
                          onClick={() => openModal(product, category)}
                          className="w-full mt-6 btn-primary magnetic-btn group inline-flex items-center justify-center"
                          data-testid={`button-view-details-${product.name.toLowerCase().replace(/[^a-z]/g, '-')}`}
                        >
                          <Package className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                          View Details & Quote
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-elevated">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold text-primary mb-6 tracking-tight">
              Custom Solutions for Your <span className="gradient-text">Requirements</span>
            </h2>
            <p className="text-xl text-muted mb-12 leading-relaxed">
              Don't see exactly what you need? Our engineering team specializes in custom component development.
            </p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <a 
                href="/contact" 
                className="btn-primary magnetic-btn group inline-flex items-center justify-center"
                data-testid="cta-request-custom-quote"
              >
                <Zap className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Request Custom Quote
              </a>
              <a 
                href="/neo-product-catalog.pdf" 
                className="btn-secondary magnetic-btn inline-flex items-center justify-center"
                data-testid="cta-download-catalog"
                download
              >
                <Download className="mr-2 h-5 w-5" />
                Download Product Catalog
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Product Quote Modal */}
      <ProductQuoteModal
        isOpen={isModalOpen}
        onClose={closeModal}
        product={selectedProduct || undefined}
      />
    </div>
  );
}