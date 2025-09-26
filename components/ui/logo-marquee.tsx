"use client";

const trustedLogos = [
  "MAHINDRA",
  "BAJAJ", 
  "HERO",
  "TVS",
  "TAFE",
  "ESCORTS",
];

export function LogoMarquee() {
  return (
    <section className="bg-slate-50 py-12" data-testid="section-trust-bar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-slate-600 text-sm font-medium mb-8" data-testid="text-trusted-by">
          Trusted by leading OEMs & Tier-1 suppliers
        </p>
        <div className="flex justify-center items-center space-x-12 opacity-60 flex-wrap gap-6">
          {trustedLogos.map((logo, index) => (
            <div 
              key={index}
              className="text-slate-400 text-2xl font-bold"
              data-testid={`logo-${logo.toLowerCase()}`}
            >
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
