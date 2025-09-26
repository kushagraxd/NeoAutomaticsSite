import { Metadata } from "next/metadata";
import Image from "next/image";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import companyData from "@/data/company.json";

export const metadata: Metadata = {
  title: "Products - Precision Machined Components",
  description: "Explore our range of precision machined components for automotive, agriculture, and industrial applications including collars, rocker arms, and more.",
};

const productDetails = [
  {
    name: "Collars (RR Panel, RR Wheel Side)",
    category: "Automotive",
    description: "High-precision collars for rear panel and rear wheel side applications in automotive systems. Manufactured to tight tolerances with consistent surface finish.",
    specifications: ["Material: Various grades of steel", "Tolerance: ±0.02mm", "Surface finish: Ra 0.8-1.6", "Heat treatment available"],
    applications: ["2-Wheeler systems", "4-Wheeler assemblies", "Commercial vehicle components"],
    image: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  },
  {
    name: "Ratchet Starter & Pinion Assemblies",
    category: "Automotive",
    description: "Critical components for automotive starter systems requiring precise engagement and durability under high torque conditions.",
    specifications: ["Material: High-strength alloy steel", "Heat treatment: Induction hardening", "Tolerance: ±0.01mm", "Surface hardness: 58-62 HRC"],
    applications: ["Starter motor systems", "Engine starting mechanisms", "Power transmission"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  },
  {
    name: "Rocker Arms",
    category: "Automotive",
    description: "Engine valve train components manufactured to OEM specifications with precise geometry for optimal valve operation and engine performance.",
    specifications: ["Material: Case hardened steel", "Tolerance: ±0.005mm", "Surface treatment: Nitriding", "Load capacity: 2000N"],
    applications: ["Engine valve systems", "Valve train assemblies", "Performance engines"],
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  },
  {
    name: "Engine Bushes (incl. 20x9)",
    category: "Automotive", 
    description: "Precision bushes for engine applications including specialized 20x9 size. Manufactured for long life and consistent performance.",
    specifications: ["Material: Phosphor bronze/Steel", "Size range: 8mm to 50mm", "Wall thickness: 1-5mm", "Standard: 20x9 specialist"],
    applications: ["Engine mounting systems", "Suspension components", "Steering assemblies"],
    image: "https://images.unsplash.com/photo-1567789884554-0b844b597180?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  },
  {
    name: "Sprockets",
    category: "Industrial",
    description: "High-strength sprockets for power transmission in industrial and agricultural machinery. Available in various pitch configurations.",
    specifications: ["Material: Heat treated steel", "Pitch: 8mm to 32mm", "Teeth: 8 to 120", "Heat treatment: Through hardening"],
    applications: ["Conveyor systems", "Agricultural machinery", "Industrial drive systems"],
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  },
  {
    name: "Gear Blanks",
    category: "Agriculture",
    description: "Precision machined gear blanks ready for tooth cutting operations. Manufactured to customer specifications with optimal material properties.",
    specifications: ["Material: EN series steels", "Diameter: 25mm to 200mm", "Tolerance: ±0.01mm", "Machining: CNC turned"],
    applications: ["Transmission systems", "Agricultural gearboxes", "Industrial reducers"],
    image: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
  }
];

export default function ProductsPage() {
  return (
    <div className="pt-16">
      {/* Header */}
      <SectionWrapper className="py-20 bg-slate-900 text-white">
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            Precision <span className="gradient-text">Products</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Specialized machined components for automotive, agriculture, and industrial
            applications. Each product manufactured to exacting standards.
          </p>
        </div>
      </SectionWrapper>

      {/* Products Grid */}
      <SectionWrapper className="py-20 bg-white">
        <div className="space-y-16">
          {productDetails.map((product, index) => (
            <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-row-dense' : ''}`}>
              <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-sky-100 text-sky-600 text-sm font-medium rounded-full mb-3">
                    {product.category}
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-display font-bold text-slate-900 mb-4">
                    {product.name}
                  </h2>
                  <p className="text-lg text-slate-600 mb-6">
                    {product.description}
                  </p>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-display font-semibold text-slate-900 mb-3">
                      Specifications
                    </h3>
                    <ul className="space-y-2">
                      {product.specifications.map((spec, specIndex) => (
                        <li key={specIndex} className="flex items-center text-slate-600">
                          <div className="w-2 h-2 bg-sky-500 rounded-full mr-3"></div>
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-display font-semibold text-slate-900 mb-3">
                      Applications
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {product.applications.map((app, appIndex) => (
                        <span key={appIndex} className="px-3 py-1 bg-slate-100 text-slate-600 text-sm rounded-lg">
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className={`glass-card p-4 rounded-2xl ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                <Image
                  src={product.image}
                  alt={`${product.name} - precision machined component`}
                  width={600}
                  height={400}
                  className="rounded-xl w-full h-auto"
                />
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Industries Served */}
      <SectionWrapper className="py-20 bg-slate-50">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-8">
            Industries We Serve
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {companyData.company.industries.map((industry, index) => (
              <div key={index} className="glass-card p-6 rounded-2xl">
                <h3 className="font-display font-semibold text-slate-900">
                  {industry}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
