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
        isScrolled ? "glass-nav bg-white/95" : "glass-nav"
      )}
      data-testid="nav-main"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0">
              <Link 
                href="/" 
                className="text-2xl font-display font-bold text-slate-900"
                data-testid="link-logo"
              >
                Neo <span className="gradient-text">Automatics</span>
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-colors",
                      pathname === item.href
                        ? "text-sky-600"
                        : "text-slate-600 hover:text-slate-900"
                    )}
                    data-testid={`link-nav-${item.name.toLowerCase()}`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="magnetic-btn bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg text-sm font-medium"
              data-testid="button-nav-quote"
            >
              Request Quote
            </Link>
          </div>
          
          <div className="md:hidden">
            <button
              type="button"
              className="text-slate-600 hover:text-slate-900"
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

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-200" data-testid="nav-mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block px-3 py-2 text-base font-medium transition-colors",
                  pathname === item.href
                    ? "text-sky-600"
                    : "text-slate-600 hover:text-slate-900"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid={`link-mobile-${item.name.toLowerCase()}`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-2 border-t border-slate-200">
              <Link
                href="/contact"
                className="block w-full text-center bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid="button-mobile-quote"
              >
                Request Quote
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
