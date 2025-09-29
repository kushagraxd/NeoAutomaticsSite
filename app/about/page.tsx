import { Metadata } from "next/metadata";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { MapPin, Calendar, User } from "lucide-react";
import companyData from "@/data/company.json";

export const metadata: Metadata = {
  title: "About Us - 20+ Years of Manufacturing Excellence",
  description: "Learn about Neo Automatics, a family-run ISO 9001:2015 certified manufacturer with 20+ years of experience in precision machined components.",
};

export default function AboutPage() {
  return (
    <div className="pt-16">
      {/* Header */}
      <SectionWrapper className="py-20 bg-slate-900 text-white">
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            About <span className="gradient-text">Neo Automatics</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A family-run precision manufacturing company with over two decades
            of excellence in automotive and industrial components.
          </p>
        </div>
      </SectionWrapper>

      {/* Company Story */}
      <SectionWrapper className="py-20 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-8 text-center">
            Our Story
          </h2>
          <div className="prose prose-lg max-w-none text-slate-600">
            <p>
              Neo Automatics was founded with a vision to deliver precision-machined components
              that exceed industry standards. What started as a small machining operation has
              evolved into a comprehensive manufacturing enterprise serving leading OEMs and
              Tier-1 suppliers across India.
            </p>
            <p>
              Under the leadership of <strong>{companyData.company.owner}</strong>, we have
              built a reputation for reliability, quality, and innovation. Our family-run
              approach combines traditional craftsmanship with modern automation, ensuring
              every component meets the highest standards of precision and durability.
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Timeline */}
      <SectionWrapper className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-12 text-center">
            Our Journey
          </h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                2004
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold text-slate-900 mb-2">
                  Foundation
                </h3>
                <p className="text-slate-600">
                  Neo Automatics established with a focus on precision CNC turning
                  for automotive components.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                2010
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold text-slate-900 mb-2">
                  Expansion
                </h3>
                <p className="text-slate-600">
                  Added in-house heat treatment capabilities and expanded to
                  serve agricultural machinery sector.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                2015
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold text-slate-900 mb-2">
                  ISO Certification
                </h3>
                <p className="text-slate-600">
                  Achieved ISO 9001:2015 certification, establishing robust
                  quality management systems.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                2020
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold text-slate-900 mb-2">
                  Multi-Unit Operations
                </h3>
                <p className="text-slate-600">
                  Expanded to three manufacturing units with specialized
                  capabilities and backup capacity.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
                2024
              </div>
              <div>
                <h3 className="text-xl font-display font-semibold text-slate-900 mb-2">
                  Industry Leadership
                </h3>
                <p className="text-slate-600">
                  Recognized as a preferred supplier to leading OEMs with
                  30+ CNC machines and advanced quality systems.
                </p>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Manufacturing Units */}
      <SectionWrapper className="py-20 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">
            Manufacturing Units
          </h2>
          <p className="text-xl text-slate-600">
            Strategic locations providing backup capacity and specialized capabilities
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {companyData.company.units.map((unit, index) => (
            <div key={index} className="glass-card p-6 rounded-2xl">
              <MapPin className="w-8 h-8 text-sky-500 mb-4" />
              <h3 className="text-lg font-display font-semibold text-slate-900 mb-2">
                {unit.name}
              </h3>
              <p className="text-slate-600">{unit.address}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Leadership Message */}
      <SectionWrapper className="py-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <User className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
          <h2 className="text-3xl font-display font-bold mb-6">
            Leadership Message
          </h2>
          <blockquote className="text-xl text-slate-300 italic mb-6">
            "At Neo Automatics, we believe that precision is not just about
            measurements—it's about commitment, consistency, and continuous improvement.
            Every component we manufacture carries our promise of quality and reliability."
          </blockquote>
          <p className="text-lg text-cyan-400 font-medium">
            — {companyData.company.owner}, Owner & Managing Director
          </p>
        </div>
      </SectionWrapper>
    </div>
  );
}
