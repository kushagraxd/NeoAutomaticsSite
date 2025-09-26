import HeroSection from '../../../components/sections/hero-section';
import ValueCardsSection from '../../../components/sections/value-cards-section';
import TrustBar from '../../../components/sections/trust-bar';
import CapabilitiesSection from '../../../components/sections/capabilities-section';
import MetricsSection from '../../../components/sections/metrics-section';
import ProductsSection from '../../../components/sections/products-section';
import WhyNeoSection from '../../../components/sections/why-neo-section';
import AboutSection from '../../../components/sections/about-section';
import CTASection from '../../../components/sections/cta-section';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Geometric background shapes */}
      <div className="geometric-shape geometric-shape-1"></div>
      <div className="geometric-shape geometric-shape-2"></div>
      <div className="geometric-shape geometric-shape-3"></div>
      
      <HeroSection />
      <ValueCardsSection />
      <TrustBar />
      <CapabilitiesSection />
      <MetricsSection />
      <ProductsSection />
      <WhyNeoSection />
      <AboutSection />
      <CTASection />
    </div>
  );
}