import { Metadata } from "next/metadata";
import SectionWrapper from "@/components/ui/section-wrapper";
import { Award, CheckCircle, Target, Users } from "lucide-react";
import companyData from "@/data/company.json";

export const metadata: Metadata = {
  title: "Quality - ISO 9001:2015 Certified Manufacturing",
  description: "Neo Automatics maintains the highest quality standards with ISO 9001:2015 certification, advanced inspection equipment, and rigorous QA processes.",
};

export default function QualityPage() {
  const { company } = companyData;

  return (
    <div className="pt-16">
      {/* Header */}
      <SectionWrapper className="py-20 bg-bg-base text-white">
        <div className="text-center">
          <Award className="w-16 h-16 text-blue-400 mx-auto mb-6" />
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            Quality <span className="gradient-text">Excellence</span>
          </h1>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            ISO 9001:2015 certified manufacturing with rigorous quality processes
            ensuring consistent precision and reliability in every component.
          </p>
        </div>
      </SectionWrapper>

      {/* ISO Certification */}
      <SectionWrapper className="py-20 bg-white">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-display font-bold text-text-primary mb-6">
              ISO 9001:2015 Certification
            </h2>
            <p className="text-lg text-text-muted mb-6 leading-relaxed">
              Our commitment to quality is demonstrated through our ISO 9001:2015 certification,
              which ensures that our quality management system meets international standards
              for consistency, efficiency, and customer satisfaction.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center">
                <CheckCircle className="text-blue-500 mr-3 h-5 w-5" />
                <span className="text-text-muted">Documented quality management system</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-blue-500 mr-3 h-5 w-5" />
                <span className="text-text-muted">Regular internal and external audits</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-blue-500 mr-3 h-5 w-5" />
                <span className="text-text-muted">Continuous improvement processes</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="text-blue-500 mr-3 h-5 w-5" />
                <span className="text-text-muted">Customer satisfaction monitoring</span>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-8 rounded-2xl text-center">
            <Award className="w-20 h-20 text-blue-500 mx-auto mb-4" />
            <h3 className="text-xl font-display font-semibold text-text-primary mb-2">
              ISO 9001:2015
            </h3>
            <p className="text-text-muted mb-4">Quality Management Systems</p>
            <div className="text-sm text-slate-500">
              Certified since 2015<br />
              Regular surveillance audits<br />
              Next renewal: 2025
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Quality Process */}
      <SectionWrapper className="py-20 bg-bg-elevated">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold text-text-primary mb-4">
            Quality Assurance Process
          </h2>
          <p className="text-xl text-text-muted max-w-3xl mx-auto">
            Our systematic approach ensures quality at every stage of manufacturing
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-sky-500 font-display font-bold text-xl">1</span>
            </div>
            <h3 className="font-display font-semibold text-slate-900 mb-2">
              Incoming Inspection
            </h3>
            <p className="text-slate-600 text-sm">
              Raw material verification and dimensional checking before production
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-blue-500 font-display font-bold text-xl">2</span>
            </div>
            <h3 className="font-display font-semibold text-slate-900 mb-2">
              In-Process Control
            </h3>
            <p className="text-slate-600 text-sm">
              Continuous monitoring during machining and heat treatment operations
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-orange-500 font-display font-bold text-xl">3</span>
            </div>
            <h3 className="font-display font-semibold text-slate-900 mb-2">
              Final Inspection
            </h3>
            <p className="text-slate-600 text-sm">
              Complete dimensional and functional testing before packaging
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-purple-500 font-display font-bold text-xl">4</span>
            </div>
            <h3 className="font-display font-semibold text-slate-900 mb-2">
              Documentation
            </h3>
            <p className="text-slate-600 text-sm">
              Complete traceability and quality records for every batch
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Inspection Equipment */}
      <SectionWrapper className="py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">
            Advanced Inspection Equipment
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            State-of-the-art metrology equipment ensures precise measurement and verification
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {company.inspection.map((equipment, index) => (
            <div key={index} className="glass-card p-6 rounded-2xl">
              <Target className="w-8 h-8 text-sky-500 mb-3" />
              <h3 className="font-display font-semibold text-slate-900 mb-2">
                {equipment}
              </h3>
              <p className="text-slate-600 text-sm">
                Precision measurement and quality verification equipment
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Quality Metrics */}
      <SectionWrapper className="py-20 bg-slate-50">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-12">
            Quality Metrics
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-sky-500 mb-2">99.8%</div>
              <div className="text-slate-600">Quality Acceptance Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-blue-500 mb-2">&lt;0.1%</div>
              <div className="text-slate-600">Customer Rejection Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-orange-500 mb-2">100%</div>
              <div className="text-slate-600">On-Time Delivery</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-display font-bold text-purple-500 mb-2">24hrs</div>
              <div className="text-slate-600">Quality Response Time</div>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
