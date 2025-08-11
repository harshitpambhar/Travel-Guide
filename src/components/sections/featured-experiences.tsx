import { ExperienceCard } from "@/components/ui/experience-card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// Mock data for featured experiences
const featuredExperiences = [
  {
    id: "1",
    title: "Universal Studios Singapore Adventure",
    location: "Sentosa Island, Singapore",
    image: "https://images.unsplash.com/photo-1613767969829-3b5dda3fd227?w=600&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 104219,
    price: 58.95,
    originalPrice: 64.59,
    category: "Theme Parks",
    features: ["Instant Confirmation", "Free Cancellation", "Skip the Line"],
    bookedCount: "3M+",
    isPopular: true,
    isExclusive: false
  },
  {
    id: "2",
    title: "WanderLux AI City Pass - Singapore",
    location: "Singapore",
    image: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600&h=400&fit=crop",
    rating: 4.7,
    reviewCount: 12369,
    price: 70.65,
    originalPrice: 79.39,
    category: "Attraction Passes",
    features: ["AI Recommendations", "Flexible Dates", "Mobile Ticket"],
    bookedCount: "500K+",
    isPopular: false,
    isExclusive: true
  },
  {
    id: "3",
    title: "VR Preview: Bali Temple Experience",
    location: "Ubud, Bali",
    image: "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=600&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 8543,
    price: 15.00,
    category: "VR Experiences",
    features: ["Virtual Reality", "Cultural Insights", "Pre-Trip Planning"],
    bookedCount: "25K+",
    isPopular: false,
    isExclusive: true
  },
  {
    id: "4",
    title: "Tokyo Food Adventure with Local Guide",
    location: "Shibuya, Tokyo",
    image: "https://images.unsplash.com/photo-1554797589-7241bb691973?w=600&h=400&fit=crop",
    rating: 4.9,
    reviewCount: 6789,
    price: 85.00,
    originalPrice: 95.00,
    category: "Food Tours",
    features: ["Local Guide", "Hidden Gems", "Small Groups"],
    bookedCount: "150K+",
    isPopular: true,
    isExclusive: false
  },
  {
    id: "5",
    title: "Eco-Friendly Costa Rica Canopy Tour",
    location: "Monteverde, Costa Rica",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop",
    rating: 4.6,
    reviewCount: 3421,
    price: 45.00,
    category: "Eco Adventures",
    features: ["Carbon Neutral", "Wildlife Spotting", "Conservation Education"],
    bookedCount: "80K+",
    isPopular: false,
    isExclusive: false
  },
  {
    id: "6",
    title: "Santorini Sunset Sailing with Dinner",
    location: "Santorini, Greece",
    image: "https://images.unsplash.com/photo-1469796466635-681d485cbeb0?w=600&h=400&fit=crop",
    rating: 4.8,
    reviewCount: 15234,
    price: 120.00,
    originalPrice: 140.00,
    category: "Cruises",
    features: ["Sunset Views", "Traditional Dinner", "Unlimited Drinks"],
    bookedCount: "200K+",
    isPopular: true,
    isExclusive: false
  }
];

export function FeaturedExperiences() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Featured Experiences
            </h2>
            <p className="text-xl text-muted-foreground">
              Handpicked adventures loved by millions of travelers
            </p>
          </div>
          <Button variant="outline" className="gap-2 hover:bg-primary hover:text-white transition-all duration-300">
            View All <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredExperiences.map((experience, index) => (
            <div 
              key={experience.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ExperienceCard {...experience} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-primary to-accent hover:shadow-xl transition-all duration-300 px-8"
          >
            <Link to="/experiences">Discover More Experiences</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}