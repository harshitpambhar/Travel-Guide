
import { useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  CreditCard, 
  Calendar,
  Users,
  MapPin,
  Check,
  ArrowLeft,
  Lock
} from "lucide-react";
import { hotelService } from "@/services/hotelService";

export default function BookingPage() {
  const { id } = useParams();
  const [hotel, setHotel] = useState<any | null>(null);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const date = searchParams.get("date") || "2024-01-15";
  const guests = parseInt(searchParams.get("guests") || "2");

  const [bookingData, setBookingData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: ""
  });

  // If hotel is found, use its data, else fallback to experienceData
  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!id) return;
      try {
        const data = await hotelService.getHotelById(id);
        if (!mounted) return;
        if (data) setHotel(data);
      } catch {
        // ignore; fallback below will render
      }
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  // If hotel is found, map its fields; else fallback
  const experienceData = hotel ? {
    title: hotel.name,
    location: hotel.location || (hotel.city ? `${hotel.city.name}, ${hotel.city.country?.name ?? ''}` : ''),
    image: hotel.image_url || "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&h=400&fit=crop",
    price: Number(hotel.price ?? 0),
    originalPrice: undefined,
    duration: ((hotel.rating ?? 4) | 0) + " star hotel"
  } : {
    title: "Universal Studios Singapore Adventure",
    location: "Sentosa Island, Singapore",
    image: "https://images.unsplash.com/photo-1560818428-19ff55a57b7f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2luZ2Fwb3VyJTIwYWR2ZW50dXJlfGVufDB8fDB8fHww",
    price: 58.95,
    originalPrice: 64.59,
    duration: "8 hours"
  };
  const totalPrice = experienceData.price * guests;
  const discount = experienceData.originalPrice - experienceData.price;
  const totalDiscount = discount * guests;

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle booking submission
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
              <main className="pt-24 pb-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="mb-6 gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Experience
            </Button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Booking Form */}
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Guest Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">First Name</label>
                          <Input
                            value={bookingData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Last Name</label>
                          <Input
                            value={bookingData.lastName}
                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Email</label>
                          <Input
                            type="email"
                            value={bookingData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Phone</label>
                          <Input
                            value={bookingData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Billing Address</label>
                        <Input
                          value={bookingData.billingAddress}
                          onChange={(e) => handleInputChange("billingAddress", e.target.value)}
                          required
                        />
                      </div>
                    </form>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Card Number</label>
                        <Input
                          value={bookingData.cardNumber}
                          onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          required
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Expiry Date</label>
                          <Input
                            value={bookingData.expiryDate}
                            onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                            placeholder="MM/YY"
                            required
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">CVV</label>
                          <Input
                            value={bookingData.cvv}
                            onChange={(e) => handleInputChange("cvv", e.target.value)}
                            placeholder="123"
                            required
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Lock className="h-4 w-4" />
                        Your payment information is secure and encrypted
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Booking Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <Card>
                    <CardHeader>
                      <CardTitle>Booking Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Experience Details */}
                      <div className="flex gap-4">
                        <img
                          src={experienceData.image}
                          alt={experienceData.title}
                          className="w-20 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            if (target.src !== '/placeholder.svg') {
                              target.src = '/placeholder.svg';
                            }
                          }}
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-sm">{experienceData.title}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            {experienceData.location}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(date).toLocaleDateString()}
                          </p>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {guests} {guests === 1 ? 'guest' : 'guests'}
                          </p>
                        </div>
                      </div>

                      <hr />

                      {/* Price Breakdown */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Price per person</span>
                          <span>${experienceData.price}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Number of guests</span>
                          <span>{guests}</span>
                        </div>
                        {totalDiscount > 0 && (
                          <div className="flex justify-between text-sm text-green-600">
                            <span>Discount</span>
                            <span>-${totalDiscount.toFixed(2)}</span>
                          </div>
                        )}
                        <hr />
                        <div className="flex justify-between font-semibold">
                          <span>Total</span>
                          <span>${totalPrice.toFixed(2)}</span>
                        </div>
                      </div>

                      <Button 
                        onClick={handleSubmit}
                        className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-lg transition-all duration-300"
                        size="lg"
                      >
                        Confirm Booking
                      </Button>

                      <div className="text-xs text-muted-foreground text-center">
                        By confirming your booking, you agree to our terms and conditions
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
