import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MapPage from "./pages/MapPage";
import FavoritesPage from "./pages/FavoritesPage";
import AccountPage from "./pages/AccountPage";
import NotFound from "./pages/NotFound";
import SpotDetailPage from "./pages/SpotDetailPage";
import AboutSurfPage from "./pages/AboutSurfPage";
import CamsPage from "./pages/CamsPage";
import InstallPrompt from "./components/InstallPrompt";
import MobileNavigation from "./components/MobileNavigation";
import { FavoritesProvider } from './context/FavoritesContext';
import ScrollToTop from './components/ScrollToTop';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <FavoritesProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/mapa" element={<MapPage />} />
          <Route path="/favoritas" element={<FavoritesPage />} />
          <Route path="/cuenta" element={<AccountPage />} />
          <Route path="/about-surf" element={<AboutSurfPage />} />
          <Route path="/spot/:spotId" element={<SpotDetailPage />} />
          <Route path="/cams" element={<CamsPage />} />
          <Route path="/surf-espana" element={<Index />} />
          <Route path="/espana" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <MobileNavigation />
        <InstallPrompt />
      </TooltipProvider>
    </FavoritesProvider>
  </QueryClientProvider>
);

export default App;
