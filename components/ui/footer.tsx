import { Link } from 'wouter';
import { Mail, Phone, MapPin, Zap, Factory } from 'lucide-react';
import companyData from '../../data/company.json';
import { formatPhoneForTel } from '../../shared/company';

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
    <footer className="bg-bg-base border-t border-border py-20 relative overflow-hidden" data-testid="footer-main">
      {/* Glassmorphic background overlay */}
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div data-testid="footer-company-info">
            <div className="flex items-center space-x-2 text-2xl font-display font-bold mb-6">
              <Zap className="h-8 w-8 text-accent-primary" />
              <span className="text-text-primary">
                Neo <span className="text-accent-primary">Automatics</span>
              </span>
            </div>
            <p className="text-text-muted mb-6 leading-relaxed" data-testid="text-tagline">
              {company.tagline}
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center group">
                <Mail className="h-4 w-4 mr-3 text-accent-primary group-hover:scale-110 transition-transform" />
                <span className="text-text-muted hover:text-text-primary transition-colors" data-testid="text-email">
                  {company.email}
                </span>
              </div>
              <div className="flex items-center group">
                <Phone className="h-4 w-4 mr-3 text-accent-secondary group-hover:scale-110 transition-transform" />
                <span className="text-text-muted hover:text-text-primary transition-colors" data-testid="text-phone">
                  {company.phone}
                </span>
              </div>
              <div className="flex items-start group">
                <MapPin className="h-4 w-4 mr-3 mt-1 flex-shrink-0 text-accent-primary group-hover:scale-110 transition-transform" />
                <span className="text-text-muted hover:text-text-primary transition-colors leading-relaxed" data-testid="text-address">
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
                    className="text-text-muted hover:text-accent-primary transition-all duration-200 hover:translate-x-1 inline-block"
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
              <Factory className="h-5 w-5 mr-2 text-accent-secondary" />
              Services
            </h4>
            <ul className="space-y-3 text-sm">
              {services.map((service) => (
                <li key={service} className="text-text-muted hover:text-text-primary transition-colors cursor-default">
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Units */}
          <div data-testid="footer-units">
            <h4 className="font-display font-semibold text-text-primary mb-6 text-lg flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-accent-secondary" />
              Our Units
            </h4>
            <div className="space-y-4 text-sm">
              {company.units.map((unit, index) => (
                <div key={unit.name} className="border-l-2 border-accent-primary/20 pl-3">
                  <div className="font-medium text-text-primary mb-1">{unit.name}</div>
                  <div className="text-text-muted text-xs mb-1">{unit.address}</div>
                  <div className="flex flex-col gap-1">
                    <a 
                      href={`tel:${formatPhoneForTel(unit.phones[0])}`}
                      className="text-accent-primary hover:underline text-xs"
                      data-testid={`footer-unit-phone-${index + 1}`}
                    >
                      +91 {unit.phones[0]}
                    </a>
                    <a 
                      href={`mailto:${unit.emails[0]}`}
                      className="text-accent-primary hover:underline text-xs"
                      data-testid={`footer-unit-email-${index + 1}`}
                    >
                      {unit.emails[0]}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-16 pt-8 pb-4 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-text-muted">
              © 2024 Neo Automatics. All rights reserved.
            </div>
            <div className="flex space-x-8 text-sm">
              <Link 
                href="/privacy" 
                className="text-text-muted hover:text-accent-primary transition-colors"
                data-testid="link-privacy"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-text-muted hover:text-accent-secondary transition-colors"
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