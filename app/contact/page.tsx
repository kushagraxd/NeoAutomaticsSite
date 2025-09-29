import { Metadata } from 'next';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import RFQForm from '@/components/forms/rfq-form';
import SectionWrapper from '@/components/ui/section-wrapper';
import companyData from '@/data/company.json';

export const metadata: Metadata = {
  title: 'Contact Us - Get a Quote | Neo Automatics',
  description: 'Contact Neo Automatics for precision machining quotes. Submit RFQ with technical drawings. ISO 9001:2015 certified manufacturer in Rohtak, India.',
};

export default function ContactPage() {
  const { company } = companyData;

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <SectionWrapper className="bg-bg-base text-white">
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            Get in <span className="gradient-text">Touch</span>
          </h1>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Ready to discuss your precision machining requirements? 
            Submit an RFQ or contact us directly for immediate assistance.
          </p>
        </div>
      </SectionWrapper>

      {/* Contact Info & RFQ Form */}
      <SectionWrapper className="bg-white">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-display font-bold text-text-primary mb-8">
              Contact Information
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Phone className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">Phone</h3>
                  <p className="text-text-muted">{company.phone}</p>
                  <p className="text-sm text-text-muted">Mon-Sat 9:00 AM - 6:00 PM IST</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Mail className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">Email</h3>
                  <p className="text-text-muted">{company.email}</p>
                  <p className="text-sm text-text-muted">We respond within 24 hours</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <MapPin className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">Head Office</h3>
                  <p className="text-text-muted">{company.hq}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                  <Clock className="h-6 w-6 text-orange-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary mb-1">Business Hours</h3>
                  <p className="text-text-muted">Monday - Saturday</p>
                  <p className="text-text-muted">9:00 AM - 6:00 PM IST</p>
                  <p className="text-sm text-text-muted">Closed on Sundays & National Holidays</p>
                </div>
              </div>
            </div>

            {/* Manufacturing Units */}
            <div className="mt-12">
              <h3 className="text-xl font-display font-semibold text-text-primary mb-6">
                Our Manufacturing Units
              </h3>
              <div className="space-y-4">
                {company.units.map((unit, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-4">
                    <h4 className="font-semibold text-text-primary">{unit.name}</h4>
                    <p className="text-text-muted text-sm">{unit.address}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RFQ Form */}
          <div>
            <RFQForm />
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
