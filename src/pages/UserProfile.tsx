import { useState, useEffect } from "react";
import { Header } from "@/components/layout/header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Settings, 
  CreditCard, 
  Heart, 
  Calendar,
  MapPin,
  Star,
  Edit,
  Camera,
  Bell,
  Shield,
  Globe
} from "lucide-react";

export default function UserProfilePage() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "/placeholder.svg",
    phone: "+1 (555) 123-4567",
    location: "New York, USA",
    memberSince: "January 2023",
    totalBookings: 12,
    totalReviews: 8,
    loyaltyPoints: 1250
  });

  const [isLoading, setIsLoading] = useState(true);

  // Load user data from localStorage on component mount
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUser(prevUser => ({
        ...prevUser,
        name: parsedUser.name || "Unknown User",
        email: parsedUser.email || ""
      }));
    }
    setIsLoading(false);
  }, []);

  const [bookings] = useState([
    {
      id: "1",
      title: "Universal Studios Singapore Adventure",
      date: "2024-01-15",
      status: "Confirmed",
      price: 117.90,
      guests: 2,
      image: "https://images.unsplash.com/photo-1613767969829-3b5dda3fd227?w=400&h=300&fit=crop"
    },
    {
      id: "2",
      title: "Marina Bay Sands Hotel",
      date: "2024-02-20",
      status: "Upcoming",
      price: 900.00,
      guests: 2,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop"
    }
  ]);

  // Show loading state while user data is being loaded
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-24 pb-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading profile...</p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Show message if no user is logged in
  if (!user.name || user.name === "Unknown User") {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-24 pb-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center py-12">
                <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No user logged in</h3>
                <p className="text-muted-foreground mb-4">
                  Please log in to view your profile
                </p>
                <Button onClick={() => window.location.href = '/signin'}>
                  Go to Login
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
              <main className="pt-24 pb-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Profile Header */}
            <Card className="mb-8">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-start gap-6">
                  <div className="relative">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <Button size="sm" className="absolute -bottom-2 -right-2 h-8 w-8 p-0">
                      <Camera className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
                        <p className="text-muted-foreground mb-2">{user.email}</p>
                        <p className="text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {user.location}
                        </p>
                      </div>
                      <Button variant="outline" className="gap-2">
                        <Edit className="h-4 w-4" />
                        Edit Profile
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{user.totalBookings}</div>
                        <div className="text-sm text-muted-foreground">Bookings</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{user.totalReviews}</div>
                        <div className="text-sm text-muted-foreground">Reviews</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{user.loyaltyPoints}</div>
                        <div className="text-sm text-muted-foreground">Loyalty Points</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">Gold</div>
                        <div className="text-sm text-muted-foreground">Member Level</div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabs */}
            <Tabs defaultValue="bookings" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="bookings" className="gap-2">
                  <Calendar className="h-4 w-4" />
                  Bookings
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="gap-2">
                  <Heart className="h-4 w-4" />
                  Wishlist
                </TabsTrigger>
                <TabsTrigger value="reviews" className="gap-2">
                  <Star className="h-4 w-4" />
                  Reviews
                </TabsTrigger>
                <TabsTrigger value="settings" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="bookings" className="space-y-4">
                <div className="grid gap-4">
                  {bookings.map((booking) => (
                    <Card key={booking.id}>
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row gap-4">
                          <img
                            src={booking.image}
                            alt={booking.title}
                            className="w-full md:w-32 h-24 object-cover rounded-lg"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold">{booking.title}</h3>
                              <Badge 
                                variant={booking.status === "Confirmed" ? "default" : "secondary"}
                              >
                                {booking.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                {new Date(booking.date).toLocaleDateString()}
                              </span>
                              <span>{booking.guests} guests</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="font-semibold">${booking.price}</span>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="wishlist" className="space-y-4">
                <div className="text-center py-12">
                  <Heart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Your wishlist is empty</h3>
                  <p className="text-muted-foreground mb-4">
                    Start exploring experiences and add them to your wishlist
                  </p>
                  <Button>Explore Experiences</Button>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-4">
                <div className="text-center py-12">
                  <Star className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No reviews yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Share your experiences with other travelers
                  </p>
                  <Button>Write a Review</Button>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <div className="grid gap-6">
                  {/* Account Settings */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Account Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium mb-2 block">Full Name</label>
                          <Input value={user.name} />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Email</label>
                          <Input value={user.email} type="email" />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Phone</label>
                          <Input value={user.phone} />
                        </div>
                        <div>
                          <label className="text-sm font-medium mb-2 block">Location</label>
                          <Input value={user.location} />
                        </div>
                      </div>
                      <Button>Save Changes</Button>
                    </CardContent>
                  </Card>

                  {/* Preferences */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bell className="h-5 w-5" />
                        Preferences
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Language</label>
                        <select className="w-full p-2 border rounded-md">
                          <option>English</option>
                          <option>Spanish</option>
                          <option>French</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Currency</label>
                        <select className="w-full p-2 border rounded-md">
                          <option>USD ($)</option>
                          <option>EUR (€)</option>
                          <option>GBP (£)</option>
                        </select>
                      </div>
                      <Button>Save Preferences</Button>
                    </CardContent>
                  </Card>

                  {/* Security */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Security
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button variant="outline" className="w-full justify-start">
                        Change Password
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Two-Factor Authentication
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        Privacy Settings
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  );
}
