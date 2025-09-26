import { Link } from 'wouter';
import { Mail, Phone, MapPin } from 'lucide-react';
import companyData from '../../data/company.json';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/capabilities', label: 'Capabilities' },
  { href: '/industries', label: 'Industries' },
  { href: '/quality', label: 'Quality' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/careers', label: 'Careers' },
  { href: '/contact', label: 'Contact' },
];

const services = [
  'CNC Turning & VMC',
  'Heat Treatment',
  'Quality Assurance',
  'PPAP Support',
  'NPD & Prototyping',
  'Volume Manufacturing',
];

export default function Footer() {
  const { company } = companyData;

  return (
    <footer className="bg-slate-950 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="text-2xl font-display font-bold mb-4">
              Neo <span className="gradient-text">Automatics</span>
            </div>
            <p className="text-slate-400 mb-4">{company.tagline}</p>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <span>{company.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <span>{company.phone}</span>
              </div>
              <div className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <span>{company.hq}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {services.map((service) => (
                <li key={service}>{service}</li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div>
            <h4 className="font-display font-semibold mb-4">Industries</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {company.industries.map((industry) => (
                <li key={industry}>{industry}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-slate-400 mb-4 md:mb-0">
              © 2024 Neo Automatics. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-slate-400">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
