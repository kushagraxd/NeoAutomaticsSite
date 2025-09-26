import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '../../client/src/components/ui/button';

export default function CTASection() {
  return (
    <section className="py-20 bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-display font-bold mb-6">
            Ready to Partner with <span className="gradient-text">Neo Automatics</span>?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Get precision machined components delivered at scale.
            Contact us for a quote or schedule a plant tour.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
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
            
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="magnetic-btn bg-white/10 hover:bg-white/20 text-white border-white/20 px-8 py-4 text-lg"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book a Plant Tour
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
