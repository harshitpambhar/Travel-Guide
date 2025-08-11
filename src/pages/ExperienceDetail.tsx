import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, 
  Star, 
  Clock, 
  Users, 
  Heart, 
  Share2,
  Calendar,
  Phone,
  Mail,
  Globe,
  ArrowLeft,
  Check,
  X,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// Mock experience data
const experienceData = {
  id: "1",
  title: "Universal Studios Singapore Adventure",
  location: "Sentosa Island, Singapore",
  description: "Experience the magic of Universal Studios Singapore with this comprehensive adventure package. From thrilling rides to magical shows, immerse yourself in the world of movies and entertainment.",
  longDescription: `Universal Studios Singapore is Southeast Asia's first and only Universal Studios theme park, featuring 24 rides, shows, and attractions in seven themed zones. This adventure package includes:

• Full-day access to all attractions
• Priority access to popular rides
• Professional guide for the first 2 hours
• Meal voucher for lunch
• Souvenir package
• Photo opportunities with characters

The park features seven themed zones:
- Hollywood: Walk down the Hollywood Walk of Fame
- New York: Experience the city that never sleeps
- Sci-Fi City: Futuristic rides and attractions
- Ancient Egypt: Explore the mysteries of the pyramids
- The Lost World: Journey to prehistoric times
- Far Far Away: Enter the world of Shrek
- Madagascar: Join the wildest party in the jungle

Perfect for families, thrill-seekers, and movie enthusiasts alike!`,
  images: [
    "https://images.unsplash.com/photo-1613767969829-3b5dda3fd227?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1554797589-7241bb691973?w=800&h=600&fit=crop"
  ],
  rating: 4.8,
  reviewCount: 104219,
  price: 58.95,
  originalPrice: 64.59,
  category: "Theme Parks",
  duration: "8 hours",
  groupSize: "1-10 people",
  languages: ["English", "Mandarin", "Malay", "Tamil"],
  features: ["Instant Confirmation", "Free Cancellation", "Skip the Line", "Professional Guide", "Meal Included", "Souvenir Package"],
  included: [
    "Full-day park admission",
    "Priority access to rides",
    "Professional guide (2 hours)",
    "Lunch voucher",
    "Souvenir package",
    "Character meet & greet",
    "Photo opportunities"
  ],
  notIncluded: [
    "Transportation to/from park",
    "Personal expenses",
    "Optional activities",
    "Gratuities"
  ],
  requirements: [
    "Valid ID required",
    "Comfortable walking shoes",
    "Weather-appropriate clothing",
    "Camera (optional)"
  ],
  cancellation: "Free cancellation up to 24 hours before the experience",
  bookedCount: "3M+",
  isPopular: true,
  isExclusive: false,
  availability: {
    "2024-01-15": { available: true, price: 58.95 },
    "2024-01-16": { available: true, price: 62.00 },
    "2024-01-17": { available: false, price: 58.95 },
    "2024-01-18": { available: true, price: 58.95 },
    "2024-01-19": { available: true, price: 65.00 },
    "2024-01-20": { available: true, price: 65.00 },
    "2024-01-21": { available: true, price: 58.95 }
  },
  reviews: [
    {
      id: "1",
      user: "Sarah M.",
      avatar: "/placeholder.svg",
      rating: 5,
      date: "2024-01-10",
      title: "Amazing experience!",
      comment: "Absolutely loved every minute of it. The rides were thrilling and the shows were spectacular. Our guide was knowledgeable and made the experience even better.",
      helpful: 24
    },
    {
      id: "2",
      user: "Michael K.",
      avatar: "/placeholder.svg",
      rating: 4,
      date: "2024-01-08",
      title: "Great family day out",
      comment: "Perfect for families with kids. The priority access saved us a lot of time waiting in lines. Food was good and the souvenir package was a nice touch.",
      helpful: 18
    },
    {
      id: "3",
      user: "Lisa T.",
      avatar: "/placeholder.svg",
      rating: 5,
      date: "2024-01-05",
      title: "Worth every penny!",
      comment: "The package was excellent value for money. We got to experience everything without the stress of planning. Highly recommend!",
      helpful: 31
    }
  ],
  host: {
    name: "Universal Studios Singapore",
    avatar: "/placeholder.svg",
    rating: 4.9,
    reviewCount: 15420,
    responseTime: "Usually responds within 1 hour",
    languages: ["English", "Mandarin", "Malay", "Tamil"],
    verified: true
  }
};

export default function ExperienceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedDate, setSelectedDate] = useState("2024-01-15");
  const [guests, setGuests] = useState(2);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const discount = Math.round(((experienceData.originalPrice - experienceData.price) / experienceData.originalPrice) * 100);
  const totalPrice = experienceData.price * guests;

  const handleBookNow = () => {
    navigate(`/booking/${id}?date=${selectedDate}&guests=${guests}`);
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
              <main className="pt-24 pb-10">
        <div className="container mx-auto px-4">
          {/* Back Button */}
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Experiences
          </Button>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Images */}
              <div className="space-y-4">
                <div className="aspect-[16/9] overflow-hidden rounded-lg">
                  <img
                    src={experienceData.images[selectedImage]}
                    alt={experienceData.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {experienceData.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square overflow-hidden rounded-lg ${
                        selectedImage === index ? 'ring-2 ring-primary' : ''
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${experienceData.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Title and Basic Info */}
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{experienceData.title}</h1>
                    <p className="text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {experienceData.location}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={toggleWishlist}>
                      <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{experienceData.rating}</span>
                    <span className="text-muted-foreground">({experienceData.reviewCount.toLocaleString()} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{experienceData.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{experienceData.groupSize}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-primary border-primary/30">
                    {experienceData.category}
                  </Badge>
                  {experienceData.isPopular && (
                    <Badge variant="secondary" className="bg-red-500 text-white">
                      🔥 Popular
                    </Badge>
                  )}
                  {experienceData.isExclusive && (
                    <Badge className="bg-gradient-to-r from-accent to-primary text-white">
                      WanderLux Exclusive
                    </Badge>
                  )}
                  {discount > 0 && (
                    <Badge className="bg-green-500 text-white font-bold">
                      {discount}% OFF
                    </Badge>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">About this experience</h2>
                <div className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed">
                    {showFullDescription ? experienceData.longDescription : experienceData.description}
                  </p>
                  <Button
                    variant="ghost"
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    className="p-0 h-auto text-primary hover:text-primary/80"
                  >
                    {showFullDescription ? (
                      <>
                        Show less <ChevronUp className="h-4 w-4 ml-1" />
                      </>
                    ) : (
                      <>
                        Read more <ChevronDown className="h-4 w-4 ml-1" />
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">What's included</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium mb-2 text-green-600">Included</h3>
                    <ul className="space-y-2">
                      {experienceData.included.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2 text-red-600">Not included</h3>
                    <ul className="space-y-2">
                      {experienceData.notIncluded.map((item, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <X className="h-4 w-4 text-red-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Requirements</h2>
                <ul className="space-y-2">
                  {experienceData.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      {requirement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Host Information */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={experienceData.host.avatar} alt={experienceData.host.name} />
                      <AvatarFallback>{experienceData.host.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold">{experienceData.host.name}</h3>
                        {experienceData.host.verified && (
                          <Badge variant="secondary" className="text-xs">Verified</Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{experienceData.host.rating}</span>
                          <span>({experienceData.host.reviewCount.toLocaleString()} reviews)</span>
                        </div>
                        <span>{experienceData.host.responseTime}</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Globe className="h-4 w-4" />
                          <span>{experienceData.host.languages.join(", ")}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">Reviews</h2>
                  <Button variant="outline" size="sm">
                    View all reviews
                  </Button>
                </div>
                <div className="space-y-4">
                  {experienceData.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <Avatar>
                            <AvatarImage src={review.avatar} alt={review.user} />
                            <AvatarFallback>{review.user.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium">{review.user}</span>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">{review.date}</p>
                            <h4 className="font-medium mb-2">{review.title}</h4>
                            <p className="text-sm text-muted-foreground mb-2">{review.comment}</p>
                            <Button variant="ghost" size="sm" className="text-xs">
                              Helpful ({review.helpful})
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Booking */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl font-bold text-primary">
                          ${experienceData.price}
                        </span>
                        {experienceData.originalPrice && (
                          <span className="text-lg text-muted-foreground line-through">
                            ${experienceData.originalPrice}
                          </span>
                        )}
                        <span className="text-sm text-muted-foreground">per person</span>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Select Date</label>
                          <select
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className="w-full p-2 border rounded-md"
                          >
                            {Object.entries(experienceData.availability).map(([date, info]) => (
                              <option key={date} value={date} disabled={!info.available}>
                                {new Date(date).toLocaleDateString()} - ${info.price}
                                {!info.available && ' (Unavailable)'}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Number of Guests</label>
                          <select
                            value={guests}
                            onChange={(e) => setGuests(parseInt(e.target.value))}
                            className="w-full p-2 border rounded-md"
                          >
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                              <option key={num} value={num}>
                                {num} {num === 1 ? 'Guest' : 'Guests'}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Price per person</span>
                          <span>${experienceData.price}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Number of guests</span>
                          <span>{guests}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>${totalPrice.toFixed(2)}</span>
                        </div>
                      </div>

                      <Button 
                        onClick={handleBookNow}
                        className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300"
                        size="lg"
                      >
                        Book Now
                      </Button>

                      <p className="text-xs text-muted-foreground text-center">
                        {experienceData.cancellation}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
