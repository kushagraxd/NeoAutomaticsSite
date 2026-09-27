import { useEffect } from 'react';
import { Switch, Route, useLocation } from 'wouter';
import SiteHeader from './components/layout/site-header';
import SiteFooter from './components/layout/site-footer';
import PreFooter from './components/layout/pre-footer';
import EnquiryTray from './components/enquiry-tray';
import { InsertRenderDefs } from './components/insert-render';
import { EnquiryProvider } from './lib/enquiry-list';
import { ThemeProvider } from './lib/theme';
import HomePage from './pages/home';
import ProductsPage from './pages/products';
import CategoryPage from './pages/category';
import ProductPage from './pages/product';
import CustomSourcingPage from './pages/custom-sourcing';
import AboutPage from './pages/about';
import ContactPage from './pages/contact';
import PrivacyPage from './pages/privacy';
import NotFound from './pages/not-found';

/** Pages that already end with the enquiry form or their own sourcing CTA skip the shared pre-footer band. */
const NO_PRE_FOOTER = new Set(['/contact', '/quote', '/custom-sourcing']);

/** Returns to the top on route change, except for in-page anchors and filter-only URL updates. */
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location]);
  return null;
}

export default function App() {
  const [location] = useLocation();
  return (
    <ThemeProvider>
    <EnquiryProvider>
      <div className="flex min-h-screen flex-col bg-surface">
        <InsertRenderDefs />
        <ScrollToTop />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-ivory"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          <Switch>
            <Route path="/" component={HomePage} />
            <Route path="/products" component={ProductsPage} />
            <Route path="/products/:slug" component={CategoryPage} />
            <Route path="/products/:slug/:code" component={ProductPage} />
            <Route path="/custom-sourcing" component={CustomSourcingPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/quote" component={ContactPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/privacy" component={PrivacyPage} />
            <Route component={NotFound} />
          </Switch>
        </main>
        {!NO_PRE_FOOTER.has(location) && <PreFooter />}
        <SiteFooter />
        <EnquiryTray />
      </div>
    </EnquiryProvider>
    </ThemeProvider>
  );
}
