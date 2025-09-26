import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Package, Car, Tractor, Factory, Zap, CheckCircle, Download, Target, Award, X, Mail } from 'lucide-react';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

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

const quoteRequestSchema = z.object({
  quantity: z.string().min(1, 'Quantity is required'),
  material: z.string().min(1, 'Material preference is required'),
  timeline: z.string().min(1, 'Timeline is required'),
  company: z.string().min(1, 'Company name is required'),
  email: z.string().email('Valid email address is required'),
  requirements: z.string().optional()
});

type QuoteRequest = z.infer<typeof quoteRequestSchema>;

export default function ProductsPage() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { toast } = useToast();

  const form = useForm<QuoteRequest>({
    resolver: zodResolver(quoteRequestSchema),
    defaultValues: {
      quantity: '',
      material: '',
      timeline: '',
      company: '',
      email: '',
      requirements: ''
    }
  });

  const openModal = (product, category) => {
    setSelectedProduct(product);
    setSelectedCategory(category);
    form.reset(); // Reset form when opening modal
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setSelectedCategory(null);
    form.reset();
  };

  const onSubmitQuote = async (data: QuoteRequest) => {
    try {
      // Simulate API call - replace with actual API integration later
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Quote Request Submitted",
        description: `We've received your request for ${selectedProduct?.name}. Our team will respond within 24 hours.`
      });
      
      closeModal();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit quote request. Please try again.",
        variant: "destructive"
      });
    }
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

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" data-testid="product-modal-overlay">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto glass-card-dark"
            data-testid="product-modal"
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-white/10 bg-elevated/90 backdrop-blur-md">
              <div>
                <h3 className="text-2xl font-display font-bold text-primary">{selectedProduct.name}</h3>
                <p className="text-muted">{selectedCategory.title}</p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                data-testid="button-close-modal"
              >
                <X className="h-6 w-6 text-muted hover:text-primary" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Product Description */}
              <div>
                <h4 className="text-lg font-display font-semibold text-primary mb-3">Product Description</h4>
                <p className="text-muted leading-relaxed">{selectedProduct.description}</p>
              </div>

              {/* Technical Specifications */}
              <div>
                <h4 className="text-lg font-display font-semibold text-primary mb-4">Technical Specifications</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedProduct.specs.map((spec, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-elevated/50 rounded-lg">
                      <CheckCircle className={`h-4 w-4 ${selectedCategory.color === 'amber' ? 'text-amber' : 'text-red'} mt-0.5 flex-shrink-0`} />
                      <span className="text-muted text-sm">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Applications */}
              <div>
                <h4 className="text-lg font-display font-semibold text-primary mb-4">Applications</h4>
                <div className="flex flex-wrap gap-3">
                  {selectedProduct.applications.map((app, index) => (
                    <span
                      key={index}
                      className={`px-4 py-2 text-sm rounded-full border ${
                        selectedCategory.color === 'amber'
                          ? 'border-amber/30 bg-amber/10 text-amber'
                          : 'border-red/30 bg-red/10 text-red'
                      }`}
                    >
                      {app}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quote Request Form */}
              <div className="border-t border-white/10 pt-8">
                <h4 className="text-lg font-display font-semibold text-primary mb-4">Request Quote for {selectedProduct.name}</h4>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmitQuote)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="quantity"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary">Quantity Required</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g. 1000" 
                                  {...field} 
                                  data-testid="input-quote-quantity"
                                  className="bg-elevated border-white/10 text-primary placeholder-muted focus:border-amber/50"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="material"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary">Material Preference</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g. High-carbon steel" 
                                  {...field} 
                                  data-testid="input-quote-material"
                                  className="bg-elevated border-white/10 text-primary placeholder-muted focus:border-amber/50"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="timeline"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary">Timeline Required</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g. 4-6 weeks" 
                                  {...field} 
                                  data-testid="input-quote-timeline"
                                  className="bg-elevated border-white/10 text-primary placeholder-muted focus:border-amber/50"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="company"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary">Company Name</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="Your company name" 
                                  {...field} 
                                  data-testid="input-quote-company"
                                  className="bg-elevated border-white/10 text-primary placeholder-muted focus:border-amber/50"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary">Contact Email</FormLabel>
                              <FormControl>
                                <Input 
                                  type="email"
                                  placeholder="engineering@yourcompany.com" 
                                  {...field} 
                                  data-testid="input-quote-email"
                                  className="bg-elevated border-white/10 text-primary placeholder-muted focus:border-amber/50"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="requirements"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-primary">Additional Requirements</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Special tolerances, certifications, or other requirements..." 
                                  {...field} 
                                  data-testid="textarea-quote-requirements"
                                  className="bg-elevated border-white/10 text-primary placeholder-muted focus:border-amber/50 resize-none"
                                  rows={3}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 mt-6">
                      <button
                        type="submit"
                        disabled={form.formState.isSubmitting}
                        className="btn-primary magnetic-btn group inline-flex items-center justify-center disabled:opacity-50"
                        data-testid="button-submit-quote"
                      >
                        <Mail className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                        {form.formState.isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
                      </button>
                      <button
                        type="button"
                        onClick={closeModal}
                        className="btn-secondary magnetic-btn inline-flex items-center justify-center"
                        data-testid="button-cancel-quote"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </Form>
              </div>
            </div>
          </motion.div>
        </div>
        )}
      </AnimatePresence>
    </div>
  );
}