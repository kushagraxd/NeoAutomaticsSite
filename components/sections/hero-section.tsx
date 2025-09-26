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
    text: '22+ CNC Machines',
  },
  {
    icon: Clock,
    text: 'PPAP Ready',
  },
];

export default function HeroSection() {
  return (
    <section className="hero-gradient relative overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-cyan-400/20 animate-gradient" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <h1 className="text-5xl lg:text-6xl font-display font-bold leading-tight mb-6">
              Precision Machined Components for{' '}
              <span className="gradient-text">OEMs & Tier-1s</span>
            </h1>
            
            <p className="text-xl text-slate-300 mb-8 leading-relaxed">
              End-to-end machining, heat treatment & QA—delivered at scale with
              20+ years of manufacturing excellence.
            </p>

            {/* Value Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              {valuePills.map((pill, index) => (
                <div key={index} className="glass-card px-4 py-2 rounded-full">
                  <span className="text-sm font-medium text-white flex items-center">
                    <pill.icon className="h-4 w-4 text-cyan-400 mr-2" />
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
                  className="magnetic-btn bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 text-lg"
                >
                  <ArrowRight className="mr-2 h-5 w-5" />
                  Request a Quote
                </Button>
              </Link>
              
              <Link href="/neo-capability-profile.pdf" download>
                <Button
                  size="lg"
                  variant="outline"
                  className="magnetic-btn bg-white/10 hover:bg-white/20 text-white border-white/20 px-8 py-4 text-lg"
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
            <div className="glass-card p-8 rounded-2xl">
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
