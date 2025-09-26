import HeroSection from '../../../components/sections/hero-section';
import TrustBar from '../../../components/sections/trust-bar';
import CapabilitiesSection from '../../../components/sections/capabilities-section';
import MetricsSection from '../../../components/sections/metrics-section';
import ProductsSection from '../../../components/sections/products-section';
import WhyNeoSection from '../../../components/sections/why-neo-section';
import AboutSection from '../../../components/sections/about-section';
import CTASection from '../../../components/sections/cta-section';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustBar />
      <CapabilitiesSection />
      <MetricsSection />
      <ProductsSection />
      <WhyNeoSection />
      <AboutSection />
      <CTASection />
    </>
  );
}