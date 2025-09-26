import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import companyData from "@/data/company.json";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "Capabilities", href: "/capabilities" },
  { name: "Industries", href: "/industries" },
  { name: "Quality", href: "/quality" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

const services = [
  "CNC Turning & VMC",
  "Heat Treatment",
  "Quality Assurance", 
  "PPAP Support",
  "NPD & Prototyping",
  "Volume Manufacturing",
];

export function Footer() {
  return (
    <footer className="bg-slate-950 text-white py-16" data-testid="footer-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div data-testid="footer-company-info">
            <div className="text-2xl font-display font-bold mb-4">
              Neo <span className="gradient-text">Automatics</span>
            </div>
            <p className="text-slate-400 mb-4" data-testid="text-tagline">
              {companyData.tagline}
            </p>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center">
                <Mail className="w-4 h-4 mr-2" />
                <span data-testid="text-email">{companyData.email}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-4 h-4 mr-2" />
                <span data-testid="text-phone">{companyData.phone}</span>
              </div>
              <div className="flex items-start">
                <MapPin className="w-4 h-4 mr-2 mt-1" />
                <span data-testid="text-address">{companyData.hq}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div data-testid="footer-quick-links">
            <h4 className="font-display font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="hover:text-white transition-colors"
                    data-testid={`link-footer-${link.name.toLowerCase()}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div data-testid="footer-services">
            <h4 className="font-display font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {services.map((service, index) => (
                <li key={index} data-testid={`text-service-${index}`}>
                  {service}
                </li>
              ))}
            </ul>
          </div>

          {/* Industries */}
          <div data-testid="footer-industries">
            <h4 className="font-display font-semibold mb-4">Industries</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              {companyData.industries.map((industry, index) => (
                <li key={index} data-testid={`text-industry-${index}`}>
                  {industry}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-slate-400 mb-4 md:mb-0" data-testid="text-copyright">
              © {new Date().getFullYear()} Neo Automatics. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm text-slate-400">
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
                data-testid="link-privacy"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
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
