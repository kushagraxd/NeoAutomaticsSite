import { Metadata } from "next/metadata";
import SectionWrapper from "@/components/ui/section-wrapper";
import { MapPin, Clock, User, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import careersData from "@/data/careers.json";
import companyData from "@/data/company.json";

export const metadata: Metadata = {
  title: "Careers - Join Our Manufacturing Team | Neo Automatics",
  description: "Explore career opportunities at Neo Automatics. Join our team of precision manufacturing professionals in Rohtak, Haryana.",
};

export default function CareersPage() {
  const { jobs } = careersData;
  const { company } = companyData;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleApply = (jobId: string, jobTitle: string) => {
    const subject = `Application for ${jobTitle} Position`;
    const body = `Dear Hiring Manager,%0D%0A%0D%0AI am interested in applying for the ${jobTitle} position (Job ID: ${jobId}) at Neo Automatics.%0D%0A%0D%0APlease find my resume attached.%0D%0A%0D%0ABest regards,%0D%0A[Your Name]`;
    
    window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="pt-16">
      {/* Header */}
      <SectionWrapper className="py-20 bg-slate-900 text-white">
        <div className="text-center">
          <h1 className="text-4xl lg:text-5xl font-display font-bold mb-6">
            Join Our <span className="gradient-text">Team</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Build your career in precision manufacturing with a company that values 
            quality, innovation, and professional growth.
          </p>
        </div>
      </SectionWrapper>

      {/* Company Culture */}
      <SectionWrapper className="py-20 bg-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">
            Why Work at Neo Automatics?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-12">
            We're committed to creating an environment where talented professionals 
            can thrive and contribute to manufacturing excellence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <User className="w-8 h-8 text-sky-500" />
            </div>
            <h3 className="text-lg font-display font-semibold text-slate-900 mb-2">
              Professional Growth
            </h3>
            <p className="text-slate-600 text-sm">
              Continuous learning opportunities and skill development programs
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-lg font-display font-semibold text-slate-900 mb-2">
              Work-Life Balance
            </h3>
            <p className="text-slate-600 text-sm">
              Flexible schedules and comprehensive benefits package
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-lg font-display font-semibold text-slate-900 mb-2">
              Great Location
            </h3>
            <p className="text-slate-600 text-sm">
              Modern facilities in Rohtak with easy accessibility
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Mail className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="text-lg font-display font-semibold text-slate-900 mb-2">
              Competitive Package
            </h3>
            <p className="text-slate-600 text-sm">
              Market-competitive salary and performance incentives
            </p>
          </div>
        </div>
      </SectionWrapper>

      {/* Current Openings */}
      <SectionWrapper className="py-20 bg-slate-50">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">
            Current Openings
          </h2>
          <p className="text-xl text-slate-600">
            Explore exciting opportunities to join our manufacturing team
          </p>
        </div>

        {jobs.length > 0 ? (
          <div className="space-y-8">
            {jobs.map((job) => (
              <div key={job.id} className="glass-card p-8 rounded-2xl">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-2xl font-display font-bold text-slate-900">
                        {job.title}
                      </h3>
                      <span className="px-3 py-1 bg-sky-100 text-sky-600 text-sm font-medium rounded-full">
                        {job.department}
                      </span>
                      <span className="px-3 py-1 bg-green-100 text-green-600 text-sm font-medium rounded-full">
                        {job.type}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 mb-6">
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        {job.location}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Experience: {job.experience}
                      </div>
                      <div className="text-slate-500">
                        Posted: {formatDate(job.posted)}
                      </div>
                    </div>

                    <p className="text-slate-700 mb-6 leading-relaxed">
                      {job.description}
                    </p>

                    <div>
                      <h4 className="font-display font-semibold text-slate-900 mb-3">
                        Requirements:
                      </h4>
                      <ul className="space-y-2">
                        {job.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-start text-slate-600">
                            <div className="w-2 h-2 bg-sky-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                            {requirement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="lg:col-span-1">
                    <div className="bg-slate-50 p-6 rounded-xl">
                      <h4 className="font-display font-semibold text-slate-900 mb-4">
                        Apply for this position
                      </h4>
                      <p className="text-slate-600 text-sm mb-6">
                        Send your resume and cover letter to our HR team. We'll get back to you within 5 business days.
                      </p>
                      <Button
                        onClick={() => handleApply(job.id, job.title)}
                        className="w-full magnetic-btn bg-sky-500 hover:bg-sky-600 text-white"
                        data-testid={`button-apply-${job.id}`}
                      >
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="glass-card p-12 rounded-2xl max-w-2xl mx-auto">
              <User className="w-16 h-16 text-slate-400 mx-auto mb-6" />
              <h3 className="text-2xl font-display font-bold text-slate-900 mb-4">
                No Current Openings
              </h3>
              <p className="text-slate-600 mb-6">
                We don't have any open positions at the moment, but we're always looking for talented individuals to join our team.
              </p>
              <p className="text-slate-600 mb-8">
                Send us your resume and we'll keep it on file for future opportunities.
              </p>
              <Button
                onClick={() => window.location.href = `mailto:${company.email}?subject=Career Inquiry - Resume Submission`}
                className="magnetic-btn bg-sky-500 hover:bg-sky-600 text-white"
              >
                Send Resume
              </Button>
            </div>
          </div>
        )}
      </SectionWrapper>

      {/* Contact HR */}
      <SectionWrapper className="py-20 bg-white">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">
            Have Questions?
          </h2>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Our HR team is here to help with any questions about career opportunities, 
            the application process, or working at Neo Automatics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => window.location.href = `mailto:${company.email}?subject=Career Inquiry`}
              className="magnetic-btn bg-sky-500 hover:bg-sky-600 text-white"
            >
              <Mail className="mr-2 h-4 w-4" />
              Contact HR
            </Button>
            <Button
              onClick={() => window.location.href = `tel:${company.phone}`}
              variant="outline"
              className="magnetic-btn border-sky-500 text-sky-500 hover:bg-sky-50"
            >
              <Clock className="mr-2 h-4 w-4" />
              Call Us
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
}
