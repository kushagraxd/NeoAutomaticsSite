import { useEffect } from 'react';
import { Switch, Route, useLocation } from 'wouter';
import SiteHeader from './components/layout/site-header';
import SiteFooter from './components/layout/site-footer';
import HomePage from './pages/home';
import ProductsPage from './pages/products';
import CategoryPage from './pages/category';
import ProductPage from './pages/product';
import CustomSourcingPage from './pages/custom-sourcing';
import AboutPage from './pages/about';
import QuotePage from './pages/quote';
import ContactPage from './pages/contact';
import PrivacyPage from './pages/privacy';
import NotFound from './pages/not-found';

/** Returns to the top of the document on route change, except for in-page anchors. */
function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    if (window.location.hash) return;
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [location]);
  return null;
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      <ScrollToTop />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-ink focus:px-4 focus:py-2 focus:text-white"
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
          <Route path="/quote" component={QuotePage} />
          <Route path="/contact" component={ContactPage} />
          <Route path="/privacy" component={PrivacyPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <SiteFooter />
    </div>
  );
}
