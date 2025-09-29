import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Menu, X, Zap } from 'lucide-react';
import { Button } from '../../client/src/components/ui/button';
import { cn } from '../../client/src/lib/utils';
import { getCompanyInfo, formatCompanyName } from '../../shared/company';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/capabilities', label: 'Capabilities' },
  { href: '/industries', label: 'Industries' },
  { href: '/quality', label: 'Quality' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [pathname] = useLocation();
  const companyInfo = getCompanyInfo();
  const { firstWord, restOfName } = formatCompanyName(companyInfo.name);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-bg-elevated/80 backdrop-blur-sm border-b border-border' 
          : 'bg-transparent'
      )}
      data-testid="nav-main"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex justify-between items-center h-20 gap-4">
          {/* Logo */}
          <div className="flex items-center space-x-8 flex-shrink-0">
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className="flex items-center space-x-2 text-2xl font-display font-bold text-primary hover:opacity-80 transition-opacity"
                data-testid="link-logo"
              >
                <Zap className="h-8 w-8 text-accent-primary" />
                <span>{firstWord} <span className="text-accent-primary">{restOfName}</span></span>
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:block">
              <div className="ml-6 flex items-baseline space-x-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg relative group',
                      pathname === item.href
                        ? 'text-accent-primary bg-accent-primary/10'
                        : 'text-text-muted hover:text-text-primary hover:bg-accent-primary/5'
                    )}
                    data-testid={`link-nav-${item.label.toLowerCase()}`}
                  >
                    {item.label}
                    <div className={cn(
                      'absolute bottom-0 left-0 right-0 h-0.5 bg-accent-primary rounded-full transition-opacity duration-200',
                      pathname === item.href ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    )} />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex lg:items-center lg:flex-shrink-0">
            <Link href="/contact">
              <Button className="btn-primary magnetic-btn group whitespace-nowrap" data-testid="button-quote">
                <Zap className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Request Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-text-muted hover:text-text-primary hover:bg-accent-primary/5 rounded-lg transition-colors"
              data-testid="button-mobile-menu"
              aria-label="Toggle mobile navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        className={cn(
          'lg:hidden transition-all duration-300 ease-in-out bg-bg-elevated border-b border-border',
          isMobileMenuOpen
            ? 'max-h-96 opacity-100 bg-bg-elevated'
            : 'max-h-0 opacity-0 overflow-hidden'
        )}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="px-6 py-6 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'block px-4 py-3 text-base font-medium transition-all duration-200 rounded-lg',
                pathname === item.href
                  ? 'text-accent-primary bg-accent-primary/10'
                  : 'text-text-muted hover:text-text-primary hover:bg-accent-primary/5'
              )}
              onClick={() => setIsMobileMenuOpen(false)}
              data-testid={`link-mobile-${item.label.toLowerCase()}`}
            >
              {item.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-border">
            <Link href="/contact">
              <Button 
                className="btn-primary w-full magnetic-btn group" 
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="button-mobile-quote"
              >
                <Zap className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                Request Quote
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}