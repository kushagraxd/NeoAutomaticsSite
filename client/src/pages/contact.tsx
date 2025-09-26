import RFQForm from '../../../components/forms/rfq-form';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Request a Quote
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Get a personalized quote for your precision machining needs. 
            Our expert team will review your requirements and provide a competitive proposal.
          </p>
        </div>
        
        <RFQForm />
      </div>
    </div>
  );
}