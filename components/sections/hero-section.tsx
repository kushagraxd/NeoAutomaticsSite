import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Download, Award, Factory, Clock } from 'lucide-react';
import { Button } from '../../client/src/components/ui/button';

const valuePills = [
  {
    icon: Award,
    text: 'ISO 9001:2015 Certified',
  },
  {
    icon: Factory,
    text: '30+ CNC Machines',
  },
  {
    icon: Clock,
    text: 'PPAP Ready',
  },
];

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-screen flex items-center bg-bg-base">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-text-primary"
          >
            <h1 className="text-6xl lg:text-8xl font-display font-black leading-tight mb-8">
              Precision Machined Components for{' '}
              <span className="text-accent-primary">OEMs & Tier-1s</span>
            </h1>
            
            <p className="text-2xl lg:text-3xl text-text-muted mb-10 leading-relaxed font-medium">
              End-to-end machining, heat treatment & QA—delivered at scale with
              <span className="text-accent-primary font-semibold"> 20+ years</span> of manufacturing excellence.
            </p>

            {/* Value Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              {valuePills.map((pill, index) => (
                <div key={index} className="bg-elevated px-4 py-2 rounded-full border border-border">
                  <span className="text-sm font-medium text-text-primary flex items-center">
                    <pill.icon className="h-4 w-4 text-accent-primary mr-2" />
                    {pill.text}
                  </span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-accent-primary hover:bg-accent-primary/80 text-bg-base magnetic-btn px-10 py-6 text-xl font-semibold rounded-lg transition-all duration-300"
                >
                  <ArrowRight className="mr-3 h-6 w-6" />
                  Request a Quote
                </Button>
              </Link>
              
              <Link href="/neo-capability-profile.pdf" download>
                <Button
                  size="lg"
                  variant="outline"
                  className="magnetic-btn bg-accent-primary/10 hover:bg-accent-primary/20 text-text-primary border-border px-8 py-4 text-lg"
                >
                  <Download className="mr-2 h-5 w-5" />
                  Download Capability Profile
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative animate-float"
          >
            <div className="bg-elevated p-8 rounded-2xl border border-border">
              <img
                src="https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Modern CNC machining center in operation"
                className="rounded-xl w-full h-auto"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
