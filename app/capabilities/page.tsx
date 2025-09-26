import { Metadata } from "next/metadata";
import SectionWrapper from "@/components/ui/section-wrapper";
import MachinesTable from "@/components/ui/machines-table";
import { Settings, Flame, Microscope, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Capabilities - CNC Machining, Heat Treatment & Quality Assurance",
  description: "Comprehensive manufacturing capabilities including 22+ CNC machines, in-house heat treatment, and advanced metrology for precision components.",
};

export default function CapabilitiesPage() {
  return (
    <div className="pt-16">
      {/* Header */}
      <SectionWrapper className="py-20 bg-slate-900 text-white">
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            Manufacturing <span className="gradient-text">Capabilities</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            End-to-end precision manufacturing with state-of-the-art equipment,
            in-house heat treatment, and comprehensive quality assurance.
          </p>
        </div>
      </SectionWrapper>

      {/* Core Capabilities */}
      <SectionWrapper className="py-20 bg-white">
        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Settings className="w-10 h-10 text-sky-500" />
            </div>
            <h3 className="text-xl font-display font-semibold text-slate-900 mb-4">
              CNC Machining
            </h3>
            <p className="text-slate-600">
              22+ CNC machines including TRAUB A30/A25/A42/A60 series for high-precision turning,
              milling, and drilling operations with PPAP readiness.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Flame className="w-10 h-10 text-orange-500" />
            </div>
            <h3 className="text-xl font-display font-semibold text-slate-900 mb-4">
              Heat Treatment
            </h3>
            <p className="text-slate-600">
              In-house sealed quench and mesh belt furnaces for consistent hardening,
              tempering, and stress relief operations across all product lines.
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Microscope className="w-10 h-10 text-green-500" />
            </div>
            <h3 className="text-xl font-display font-semibold text-slate-900 mb-4">
              Quality Assurance
            </h3>
            <p className="text-slate-600">
              Advanced metrology equipment including profile projectors, hardness testing,
              and surface analysis for consistent quality control.
            </p>
          </div>
        </div>

        {/* Machines Table */}
        <div className="mb-12">
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-8 text-center">
            Equipment Inventory
          </h2>
          <MachinesTable />
        </div>
      </SectionWrapper>

      {/* Certifications */}
      <SectionWrapper className="py-20 bg-slate-50">
        <div className="text-center">
          <Award className="w-16 h-16 text-sky-500 mx-auto mb-6" />
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">
            ISO 9001:2015 Certified
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Our quality management system ensures consistent processes,
            continuous improvement, and customer satisfaction across all operations.
          </p>
        </div>
      </SectionWrapper>
    </div>
  );
}
