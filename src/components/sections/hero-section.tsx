import { HeroSearch } from "@/components/ui/hero-search";
import { Badge } from "@/components/ui/badge";
import heroImage from "@/assets/hero-travel.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Travel experiences around the world"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/60 via-primary/40 to-accent/60" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 animate-float">
        <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
          ✈️ 1M+ Experiences
        </Badge>
      </div>
      <div className="absolute top-1/3 right-10 animate-float" style={{ animationDelay: '1s' }}>
        <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
          🌍 200+ Countries
        </Badge>
      </div>
      <div className="absolute bottom-1/4 left-1/4 animate-float" style={{ animationDelay: '2s' }}>
        <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
          ⭐ Trusted by 10M+ Travelers
        </Badge>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Headline */}
          <div className="space-y-4 animate-fade-in">
            <Badge className="bg-accent/20 text-white border-accent/30 backdrop-blur-sm text-lg px-4 py-2">
              🚀 AI-Powered Travel Planning
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Discover Your
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent block">
                Perfect Adventure
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Uncover extraordinary experiences, hidden gems, and create unforgettable memories with our AI travel assistant
            </p>
          </div>

          {/* Search Component */}
          <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <HeroSearch />
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-white/80 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div className="flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              <span className="text-sm font-medium">Instant Booking</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🛡️</span>
              <span className="text-sm font-medium">Secure & Trusted</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">💫</span>
              <span className="text-sm font-medium">Best Price Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              <span className="text-sm font-medium">AI Recommendations</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}