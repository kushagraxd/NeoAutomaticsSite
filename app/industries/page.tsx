import { Metadata } from "next/metadata";
import SectionWrapper from "@/components/ui/section-wrapper";
import { Car, Tractor, Factory, ChefHat } from "lucide-react";

export const metadata: Metadata = {
  title: "Industries - Automotive, Agriculture, Industrial Equipment",
  description: "Neo Automatics serves diverse industries with precision machined components for automotive, agriculture machinery, industrial equipment, and kitchen tools.",
};

const industries = [
  {
    icon: Car,
    name: "Automotive (2W/4W/Commercial)",
    description: "Precision components for two-wheelers, four-wheelers, and commercial vehicles including engine parts, transmission components, and chassis elements.",
    products: ["Collars", "Rocker Arms", "Engine Bushes", "Ratchet Starter & Pinion"],
    challenges: ["Tight tolerances", "High volume production", "Cost optimization", "PPAP compliance"],
    solutions: ["22+ CNC machines", "In-house heat treatment", "Statistical process control", "Dedicated automotive lines"],
    color: "sky"
  },
  {
    icon: Tractor,
    name: "Agriculture Machinery",
    description: "Robust components for agricultural equipment designed to withstand harsh field conditions and provide reliable performance season after season.",
    products: ["Sprockets", "Gear Blanks", "Drive Components", "Hydraulic Parts"],
    challenges: ["Durability requirements", "Seasonal demand", "Corrosion resistance", "Field serviceability"],
    solutions: ["Enhanced metallurgy", "Protective coatings", "Flexible production", "Quality partnerships"],
    color: "green"
  },
  {
    icon: Factory,
    name: "Industrial Equipment",
    description: "Critical components for industrial machinery requiring precision, durability, and consistent performance in demanding manufacturing environments.",
    products: ["Precision Shafts", "Bushings", "Custom Components", "Machine Elements"],
    challenges: ["Custom specifications", "Critical applications", "Zero downtime", "Long service life"],
    solutions: ["Engineering support", "Material expertise", "Quality certification", "Technical documentation"],
    color: "orange"
  },
  {
    icon: ChefHat,
    name: "Kitchen Tools",
    description: "Food-grade precision components for kitchen appliances and tools, manufactured to meet strict hygiene and safety standards.",
    products: ["Kitchen Hardware", "Appliance Components", "Food Processing Parts", "Utensil Elements"],
    challenges: ["Food safety standards", "Corrosion resistance", "Aesthetic requirements", "Consumer safety"],
    solutions: ["Food-grade materials", "Surface treatments", "Quality compliance", "Design collaboration"],
    color: "purple"
  }
];

const colorClasses = {
  sky: {
    bg: "bg-sky-100",
    icon: "text-sky-500",
    border: "border-sky-200"
  },
  green: {
    bg: "bg-green-100",
    icon: "text-green-500",
    border: "border-green-200"
  },
  orange: {
    bg: "bg-orange-100",
    icon: "text-orange-500",
    border: "border-orange-200"
  },
  purple: {
    bg: "bg-purple-100",
    icon: "text-purple-500",
    border: "border-purple-200"
  }
};

export default function IndustriesPage() {
  return (
    <div className="pt-16">
      {/* Header */}
      <SectionWrapper className="py-20 bg-slate-900 text-white">
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            Industries We <span className="gradient-text">Serve</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Delivering precision machined components across diverse sectors
            with specialized solutions for each industry's unique requirements.
          </p>
        </div>
      </SectionWrapper>

      {/* Industries Grid */}
      <SectionWrapper className="py-20 bg-white">
        <div className="space-y-16">
          {industries.map((industry, index) => (
            <div key={industry.name} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-row-dense' : ''}`}>
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="flex items-center mb-6">
                  <div className={`w-16 h-16 ${colorClasses[industry.color].bg} rounded-2xl flex items-center justify-center mr-4`}>
                    <industry.icon className={`w-8 h-8 ${colorClasses[industry.color].icon}`} />
                  </div>
                  <h2 className="text-2xl lg:text-3xl font-display font-bold text-slate-900">
                    {industry.name}
                  </h2>
                </div>
                
                <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                  {industry.description}
                </p>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-display font-semibold text-slate-900 mb-3">
                      Key Products
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {industry.products.map((product, productIndex) => (
                        <span key={productIndex} className={`px-3 py-1 ${colorClasses[industry.color].bg} ${colorClasses[industry.color].border} border text-slate-700 text-sm rounded-lg`}>
                          {product}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Industry Challenges</h4>
                      <ul className="space-y-1">
                        {industry.challenges.map((challenge, challengeIndex) => (
                          <li key={challengeIndex} className="text-slate-600 text-sm flex items-center">
                            <div className="w-1.5 h-1.5 bg-slate-400 rounded-full mr-2"></div>
                            {challenge}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-slate-900 mb-2">Our Solutions</h4>
                      <ul className="space-y-1">
                        {industry.solutions.map((solution, solutionIndex) => (
                          <li key={solutionIndex} className={`text-sm flex items-center ${colorClasses[industry.color].icon}`}>
                            <div className={`w-1.5 h-1.5 ${colorClasses[industry.color].icon} bg-current rounded-full mr-2`}></div>
                            {solution}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className={`glass-card p-8 rounded-2xl ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-xl flex items-center justify-center">
                  <industry.icon className={`w-20 h-20 ${colorClasses[industry.color].icon}`} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </div>
  );
}
