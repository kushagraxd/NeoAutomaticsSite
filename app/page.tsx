import { Metadata } from 'next';
import HeroSection from '@/components/sections/hero-section';
import TrustBar from '@/components/sections/trust-bar';
import CapabilitiesSection from '@/components/sections/capabilities-section';
import MetricsSection from '@/components/sections/metrics-section';
import ProductsSection from '@/components/sections/products-section';
import WhyNeoSection from '@/components/sections/why-neo-section';
import AboutSection from '@/components/sections/about-section';
import CTASection from '@/components/sections/cta-section';

export const metadata: Metadata = {
  title: 'Neo Automatics - Precision Machined Components for OEMs & Tier-1s',
  description: 'End-to-end machining, heat treatment & QA—delivered at scale. ISO 9001:2015 certified manufacturer with 20+ years experience.',
};

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
