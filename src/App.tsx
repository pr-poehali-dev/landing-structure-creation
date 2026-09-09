
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Privacy from "./pages/Privacy";
import Consent from "./pages/Consent";
import PhotoPolicy from "./pages/PhotoPolicy";
import Yasli from "./pages/Yasli";
import PodgotovkaKShkole from "./pages/PodgotovkaKShkole";
import NotFound from "./pages/NotFound";
import ExitIntentPopup from "./components/landing/ExitIntentPopup";
import CookieBanner from "./components/landing/CookieBanner";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <ExitIntentPopup />
      <CookieBanner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/consent" element={<Consent />} />
          <Route path="/photo-policy" element={<PhotoPolicy />} />
          <Route path="/yasli/" element={<Yasli />} />
          <Route path="/podgotovka-k-shkole/" element={<PodgotovkaKShkole />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;