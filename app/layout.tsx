import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import Navigation from '@/components/ui/navigation';
import Footer from '@/components/ui/footer';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Neo Automatics - Precision Machined Components for OEMs & Tier-1s',
    template: '%s | Neo Automatics'
  },
  description: 'End-to-end machining, heat treatment & QA—delivered at scale. ISO 9001:2015 certified manufacturer with 20+ years experience.',
  keywords: ['precision machining', 'CNC turning', 'automotive components', 'heat treatment', 'ISO 9001', 'OEM supplier', 'Tier-1 supplier'],
  authors: [{ name: 'Neo Automatics' }],
  creator: 'Neo Automatics',
  publisher: 'Neo Automatics',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://neo-automatics.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: '/',
    siteName: 'Neo Automatics',
    title: 'Neo Automatics - Precision Machined Components for OEMs & Tier-1s',
    description: 'End-to-end machining, heat treatment & QA—delivered at scale. ISO 9001:2015 certified manufacturer with 20+ years experience.',
    images: [
      {
        url: '/og.jpg',
        width: 1200,
        height: 630,
        alt: 'Neo Automatics - Precision Manufacturing',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Neo Automatics - Precision Machined Components for OEMs & Tier-1s',
    description: 'End-to-end machining, heat treatment & QA—delivered at scale.',
    images: ['/og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://neo-automatics.com/#organization',
                  name: 'Neo Automatics',
                  url: 'https://neo-automatics.com',
                  logo: {
                    '@type': 'ImageObject',
                    url: 'https://neo-automatics.com/logo.png',
                  },
                  sameAs: [],
                  contactPoint: {
                    '@type': 'ContactPoint',
                    telephone: '+91-88130-79855',
                    contactType: 'customer service',
                    email: 'neo.automatics@gmail.com',
                  },
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Plot 101 & 102, Sainik Colony, Hissar Road',
                    addressLocality: 'Rohtak',
                    addressRegion: 'Haryana',
                    postalCode: '124001',
                    addressCountry: 'IN',
                  },
                },
                {
                  '@type': 'LocalBusiness',
                  '@id': 'https://neo-automatics.com/#localbusiness',
                  name: 'Neo Automatics',
                  description: 'Precision machined components manufacturer',
                  telephone: '+91-88130-79855',
                  email: 'neo.automatics@gmail.com',
                  address: {
                    '@type': 'PostalAddress',
                    streetAddress: 'Plot 101 & 102, Sainik Colony, Hissar Road',
                    addressLocality: 'Rohtak',
                    addressRegion: 'Haryana',
                    postalCode: '124001',
                    addressCountry: 'IN',
                  },
                  geo: {
                    '@type': 'GeoCoordinates',
                    latitude: 28.8955,
                    longitude: 76.6066,
                  },
                  openingHours: 'Mo-Sa 09:00-18:00',
                },
              ],
            }),
          }}
        />
        {process.env.NODE_ENV === 'production' && process.env.GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.GA_ID}');
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <Navigation />
        <main>{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
