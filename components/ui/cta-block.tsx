import { Link } from "wouter";
import { Send, Calendar } from "lucide-react";

export function CTABlock() {
  return (
    <section className="py-20 bg-slate-900 text-white" data-testid="section-cta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-display font-bold mb-6">
          Ready to Partner with <span className="gradient-text">Neo Automatics</span>?
        </h2>
        <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
          Get precision machined components delivered at scale.
          Contact us for a quote or schedule a plant tour.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="magnetic-btn bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center justify-center"
            data-testid="button-cta-quote"
          >
            <Send className="w-5 h-5 mr-2" />
            Request a Quote
          </Link>
          <Link
            href="/contact"
            className="magnetic-btn bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center justify-center"
            data-testid="button-cta-tour"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Book a Plant Tour
          </Link>
        </div>
      </div>
    </section>
  );
}
