import { motion } from 'framer-motion';
import { Users, Target, Zap, Heart, GraduationCap, MapPin, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';
import { getCompanyInfo } from '../../../shared/company';

export default function CareersPage() {
  const companyInfo = getCompanyInfo();

  const values = [
    {
      icon: Target,
      title: "Precision Excellence",
      description: "We strive for perfection in every component we manufacture."
    },
    {
      icon: Users,
      title: "Team Collaboration", 
      description: "We foster an environment where every voice is heard and valued."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We embrace new technologies to improve our processes."
    },
    {
      icon: Heart,
      title: "Work-Life Balance",
      description: "We support both professional success and personal fulfillment."
    }
  ];

  const openPositions = [
    {
      title: "CNC Machine Operator",
      location: "Mumbai, Maharashtra",
      type: "Full-time",
      experience: "2-5 years",
      description: "Operate TRAUB CNC turning machines and VMCs to produce precision components."
    },
    {
      title: "Quality Assurance Engineer", 
      location: "Mumbai, Maharashtra",
      type: "Full-time",
      experience: "3-6 years",
      description: "Ensure product quality through inspection and testing with ISO 9001:2015 standards."
    }
  ];

  return (
    <div className="min-h-screen bg-base">
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 hero-bg opacity-30" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <Users className="h-16 w-16 text-amber mx-auto mb-6" />
            <h1 className="text-4xl md:text-6xl font-display font-bold text-primary mb-6 tracking-tight">
              Join Our <span className="gradient-text">Team</span>
            </h1>
            <p className="text-xl text-muted max-w-3xl mx-auto leading-relaxed">
              Build your career with India's leading precision manufacturing company.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 md:py-28 bg-elevated">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-xl text-muted max-w-3xl mx-auto">
              These core values guide everything we do.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card p-6 text-center glow-hover group"
                  data-testid={`value-${value.title.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <IconComponent className="h-12 w-12 text-amber mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="font-display font-semibold text-primary mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <GraduationCap className="h-12 w-12 text-red mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary mb-6">
              Open <span className="gradient-text">Positions</span>
            </h2>
            <p className="text-xl text-muted">
              Explore current opportunities to join our growing team.
            </p>
          </motion.div>

          <div className="space-y-8">
            {openPositions.map((position, index) => (
              <motion.div
                key={position.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass-card p-8 glow-hover"
                data-testid={`position-${position.title.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-display font-semibold text-primary mb-2">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-muted">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {position.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {position.type}
                      </div>
                      <div className="flex items-center">
                        <GraduationCap className="h-4 w-4 mr-1" />
                        {position.experience}
                      </div>
                    </div>
                  </div>
                  <Button
                    className="mt-4 lg:mt-0 lg:ml-4"
                    data-testid={`button-apply-${position.title.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    Apply Now
                  </Button>
                </div>
                <p className="text-muted leading-relaxed">
                  {position.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-28 bg-elevated">
        <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 glow-hover"
          >
            <h2 className="text-2xl font-display font-semibold text-primary mb-4">
              Don't See the Right Position?
            </h2>
            <p className="text-muted mb-6 leading-relaxed">
              We're always looking for talented individuals. Send us your resume.
            </p>
            <a 
              href={`mailto:${companyInfo.email}?subject=Career Inquiry`}
              className="text-amber hover:text-amber/80 font-semibold transition-colors"
              data-testid="link-careers-contact"
            >
              {companyInfo.email}
            </a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}