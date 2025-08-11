import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import NotFound from "@/pages/NotFound";
import AIPlannerPage from "@/pages/AIPlanner";
import ExperiencesPage from "@/pages/Experiences";
import FlightsPage from "@/pages/Flights";
import DealsPage from "@/pages/Deals";
import VRPreviewPage from "@/pages/VRPreview";
import HotelPage from "@/pages/Hotels";
import ExperienceDetailPage from "@/pages/ExperienceDetail";
import SearchResultsPage from "@/pages/SearchResults";
import UserProfilePage from "@/pages/UserProfile";
import BookingPage from "@/pages/Booking";
import WishlistPage from "@/pages/Wishlist";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/ai-planner" element={<AIPlannerPage />} />
          <Route path="/experiences" element={<ExperiencesPage />} />
          <Route path="/experiences/:id" element={<ExperienceDetailPage />} />
          <Route path="/flights" element={<FlightsPage />} />
          <Route path="/hotels" element={<HotelPage />} />
          <Route path="/deals" element={<DealsPage />} />
          <Route path="/vr-preview" element={<VRPreviewPage />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/profile" element={<UserProfilePage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
