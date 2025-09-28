import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "./pages/home";
import ContactPage from "./pages/contact";
import CapabilitiesPage from "./pages/capabilities";
import IndustriesPage from "./pages/industries";
import QualityPage from "./pages/quality";
import ProductsPage from "./pages/products";
import AboutPage from "./pages/about";
import PrivacyPage from "./pages/privacy";
import TermsPage from "./pages/terms";
import CareersPage from "./pages/careers";
import NotFound from "./pages/not-found";
import Navigation from "../../components/ui/navigation";
import Footer from "../../components/ui/footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/capabilities" component={CapabilitiesPage} />
      <Route path="/industries" component={IndustriesPage} />
      <Route path="/quality" component={QualityPage} />
      <Route path="/products" component={ProductsPage} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/privacy" component={PrivacyPage} />
      <Route path="/terms" component={TermsPage} />
      <Route path="/careers" component={CareersPage} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="font-sans antialiased bg-background text-foreground">
          <Navigation />
          <main>
            <Router />
          </main>
          <Footer />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
