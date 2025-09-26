"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Capabilities", href: "/capabilities" },
  { name: "Industries", href: "/industries" },
  { name: "Quality", href: "/quality" },
  { name: "Products", href: "/products" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled 
          ? "glass-card bg-elevated/95 backdrop-blur-xl" 
          : "glass-card bg-base/80 backdrop-blur-md"
      )}
      data-testid="nav-main"
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Left aligned */}
          <div className="flex-shrink-0">
            <Link 
              href="/" 
              className="text-2xl font-display font-bold text-primary hover:text-amber transition-colors duration-300"
              data-testid="link-logo"
            >
              Neo <span className="gradient-text">Automatics</span>
            </Link>
          </div>

          {/* Desktop Navigation - Right aligned */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium transition-all duration-300 relative",
                  pathname === item.href
                    ? "nav-link-active"
                    : "text-muted hover:text-amber"
                )}
                data-testid={`link-nav-${item.name.toLowerCase()}`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="btn-primary ml-4"
              data-testid="button-nav-quote"
            >
              Request Quote
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-muted hover:text-amber transition-colors duration-300 p-2"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu - Slide in animation */}
      <div className={cn(
        "md:hidden absolute top-full left-0 right-0 bg-elevated/95 backdrop-blur-xl border-t border-white/10 transition-all duration-300 transform origin-top",
        isMobileMenuOpen 
          ? "scale-y-100 opacity-100" 
          : "scale-y-0 opacity-0 pointer-events-none"
      )} data-testid="nav-mobile-menu">
        <div className="px-6 py-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg",
                pathname === item.href
                  ? "bg-amber/10 text-amber border-l-4 border-amber"
                  : "text-muted hover:text-amber hover:bg-white/5"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
              data-testid={`link-mobile-${item.name.toLowerCase()}`}
            >
              {item.name}
            </Link>
          ))}
          <div className="pt-4 mt-4 border-t border-white/10">
            <Link
              href="/contact"
              className="btn-primary w-full text-center justify-center"
              onClick={() => setIsMobileMenuOpen(false)}
              data-testid="button-mobile-quote"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}