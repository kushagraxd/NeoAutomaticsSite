import { Link } from 'wouter';
import { Mail, Phone, MapPin, Zap, Factory } from 'lucide-react';
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
    <footer className="bg-base/50 backdrop-blur-xl border-t border-white/10 py-20 relative overflow-hidden" data-testid="footer-main">
      {/* Glassmorphic background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-lime/5 via-transparent to-violet/5" />
      <div className="absolute inset-0 aurora-bg opacity-5" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div data-testid="footer-company-info">
            <div className="flex items-center space-x-2 text-2xl font-display font-bold mb-6">
              <Zap className="h-8 w-8 text-lime" />
              <span className="text-primary">
                Neo <span className="gradient-text">Automatics</span>
              </span>
            </div>
            <p className="text-muted mb-6 leading-relaxed" data-testid="text-tagline">
              {company.tagline}
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center group">
                <Mail className="h-4 w-4 mr-3 text-lime group-hover:scale-110 transition-transform" />
                <span className="text-muted hover:text-primary transition-colors" data-testid="text-email">
                  {company.email}
                </span>
              </div>
              <div className="flex items-center group">
                <Phone className="h-4 w-4 mr-3 text-violet group-hover:scale-110 transition-transform" />
                <span className="text-muted hover:text-primary transition-colors" data-testid="text-phone">
                  {company.phone}
                </span>
              </div>
              <div className="flex items-start group">
                <MapPin className="h-4 w-4 mr-3 mt-1 flex-shrink-0 text-lime group-hover:scale-110 transition-transform" />
                <span className="text-muted hover:text-primary transition-colors leading-relaxed" data-testid="text-address">
                  {company.hq}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div data-testid="footer-quick-links">
            <h4 className="font-display font-semibold text-primary mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-lime transition-all duration-200 hover:translate-x-1 inline-block"
                    data-testid={`link-footer-${link.label.toLowerCase()}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div data-testid="footer-services">
            <h4 className="font-display font-semibold text-primary mb-6 text-lg flex items-center">
              <Factory className="h-5 w-5 mr-2 text-violet" />
              Services
            </h4>
            <ul className="space-y-3 text-sm">
              {services.map((service) => (
                <li key={service} className="text-muted hover:text-primary transition-colors cursor-default">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div data-testid="footer-industries">
            <h4 className="font-display font-semibold text-primary mb-6 text-lg">Industries</h4>
            <ul className="space-y-3 text-sm">
              {company.industries.map((industry) => (
                <li key={industry} className="text-muted hover:text-primary transition-colors cursor-default">
                  {industry}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="glass-card glow-hover mt-16 pt-8 pb-4 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-muted">
              © 2024 Neo Automatics. All rights reserved.
            </div>
            <div className="flex space-x-8 text-sm">
              <Link 
                href="/privacy" 
                className="text-muted hover:text-lime transition-colors"
                data-testid="link-privacy"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-muted hover:text-violet transition-colors"
                data-testid="link-terms"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}