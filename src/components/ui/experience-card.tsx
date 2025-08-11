import { Star, Users, Clock, Heart, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ExperienceCardProps {
  id: string;
  title: string;
  location: string;
  image: string;
  rating: number;
  reviewCount: number;
  price: number;
  originalPrice?: number;
  category: string;
  features: string[];
  bookedCount: string;
  isPopular?: boolean;
  isExclusive?: boolean;
}

export function ExperienceCard({
  id,
  title,
  location,
  image,
  rating,
  reviewCount,
  price,
  originalPrice,
  category,
  features,
  bookedCount,
  isPopular,
  isExclusive,
}: ExperienceCardProps) {
  const navigate = useNavigate();
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

  const handleBookNow = () => {
    navigate(`/experiences/${id}`);
  };

  const handleWishlist = () => {
    // Handle wishlist functionality
    console.log("Added to wishlist:", id);
  };

  const handleShare = () => {
    // Handle share functionality
    if (navigator.share) {
      navigator.share({
        title: title,
        text: `Check out this amazing experience: ${title}`,
        url: window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-0 bg-white">
      <div className="relative">
        <div className="aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {isExclusive && (
            <Badge className="bg-gradient-to-r from-accent to-primary text-white font-semibold">
              WanderLux Exclusive
            </Badge>
          )}
          {isPopular && (
            <Badge variant="secondary" className="bg-red-500 text-white">
              🔥 Popular
            </Badge>
          )}
          {discount > 0 && (
            <Badge className="bg-green-500 text-white font-bold">
              {discount}% OFF
            </Badge>
          )}
        </div>

        {/* Action buttons */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white" onClick={handleWishlist}>
            <Heart className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="secondary" className="h-8 w-8 p-0 bg-white/90 hover:bg-white" onClick={handleShare}>
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <Badge variant="outline" className="text-primary border-primary/30">
            {category}
          </Badge>
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{rating}</span>
            <span className="text-muted-foreground">({reviewCount.toLocaleString()})</span>
          </div>
        </div>

        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-3 flex items-center gap-1">
          <MapPin className="h-4 w-4" />
          {location}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {features.slice(0, 2).map((feature, index) => (
            <Badge key={index} variant="secondary" className="text-xs bg-secondary/60">
              {feature}
            </Badge>
          ))}
        </div>

        <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
          <Users className="h-4 w-4" />
          <span>{bookedCount} booked</span>
          <Clock className="h-4 w-4 ml-2" />
          <span>Instant confirmation</span>
        </div>

        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">
                ${price}
              </span>
              {originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  ${originalPrice}
                </span>
              )}
            </div>
            <span className="text-sm text-muted-foreground">per person</span>
          </div>
          
          <Button 
            onClick={handleBookNow}
            className="bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300"
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

// Fix missing import
import { MapPin } from "lucide-react";