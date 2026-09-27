import { usePageMeta } from '../lib/usePageMeta';
import HomeHero from '../components/home/home-hero';
import RangeProof from '../components/home/range-proof';
import OperationGrid from '../components/home/operation-grid';
import EnquiryCategories from '../components/home/enquiry-categories';
import InsertExplorer from '../components/home/insert-explorer';
import SourcingSection from '../components/home/sourcing-section';
import ProcessTimeline from '../components/home/process-timeline';
import WhySection from '../components/home/why-section';
import { company } from '../../../shared/company';

export default function HomePage() {
  usePageMeta(
    'Carbide Inserts & Cutting Tools',
    `${company.displayName} supplies carbide inserts and cutting tools sourced from established producers in China and Taiwan to manufacturers across India. Search by ISO code and request a quotation.`,
  );

  return (
    <>
      <HomeHero />
      <RangeProof />
      <OperationGrid />
      <EnquiryCategories />
      <InsertExplorer />
      <SourcingSection />
      <ProcessTimeline />
      <WhySection />
    </>
  );
}
