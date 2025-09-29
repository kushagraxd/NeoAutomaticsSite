import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../../client/src/components/ui/button';
import companyData from '../../data/company.json';

export default function AboutSection() {
  const { company } = companyData;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold text-slate-900 mb-6">
              About <span className="gradient-text">Neo Automatics</span>
            </h2>
            
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Neo Automatics is a family-run, ISO 9001:2015 certified manufacturer based in Rohtak, India.
              For 20+ years we've supplied precision machined components to automotive and industrial leaders,
              combining modern automation with rigorous QA.
            </p>
            
            <div className="space-y-4 mb-8">
              {company.strengths.map((strength, index) => (
                <motion.div
                  key={strength}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <CheckCircle className="text-blue-500 mr-3 h-5 w-5 flex-shrink-0" />
                  <span className="text-slate-700">{strength}</span>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link href="/about">
                <Button className="magnetic-btn bg-blue-500 hover:bg-blue-600 text-white">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Modern manufacturing facility showcasing precision CNC equipment and quality control"
                className="rounded-2xl shadow-xl w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-2xl" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
