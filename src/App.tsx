
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
import PodgotovkaKShkole2x from "./pages/PodgotovkaKShkole2x";
import Feedback from "./pages/Feedback";
import Checklist from "./pages/Checklist";
import Checklist2 from "./pages/Checklist2";
import Checklist3 from "./pages/Checklist3";
import Checklist4 from "./pages/Checklist4";
import Checklist5 from "./pages/Checklist5";
import Checklist6 from "./pages/Checklist6";
import Checklist7 from "./pages/Checklist7";
import Checklist8 from "./pages/Checklist8";
import Checklist9 from "./pages/Checklist9";
import LegacyRedirect from "./components/LegacyRedirect";
import ReadinessMapAdminPage from "./pages/internal/ReadinessMapAdminPage";
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
          <Route path="/podgotovka-k-shkole-2-raza-v-nedelyu/" element={<LegacyRedirect to="/podgotovka-k-shkole-2/" />} />
          <Route path="/podgotovka-k-shkole-2/" element={<PodgotovkaKShkole2x />} />
          <Route path="/feedback/" element={<Feedback />} />
          <Route path="/checklist/" element={<Checklist />} />
          <Route path="/checklist-2/" element={<Checklist2 />} />
          <Route path="/checklist-3/" element={<Checklist3 />} />
          <Route path="/checklist-4/" element={<Checklist4 />} />
          <Route path="/checklist-5/" element={<Checklist5 />} />
          <Route path="/checklist-6/" element={<Checklist6 />} />
          <Route path="/checklist-7/" element={<Checklist7 />} />
          <Route path="/checklist-8/" element={<Checklist8 />} />
          <Route path="/checklist-9/" element={<Checklist9 />} />
          <Route path="/internal/readiness-map/" element={<ReadinessMapAdminPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;