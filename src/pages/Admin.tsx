import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";

export default function AdminPanel() {
  const navigate = useNavigate();
  // Simulate admin authentication (replace with real auth logic)
  const [isAdmin] = useState(true);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-24 pb-10">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
            <p className="text-muted-foreground">You do not have admin privileges.</p>
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
          <h1 className="text-4xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Admin Panel</h1>
          {/* Dashboard Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <Card><CardHeader><CardTitle>Users</CardTitle></CardHeader><CardContent>1234</CardContent></Card>
            <Card><CardHeader><CardTitle>Bookings</CardTitle></CardHeader><CardContent>567</CardContent></Card>
            <Card><CardHeader><CardTitle>Revenue</CardTitle></CardHeader><CardContent>$12,345</CardContent></Card>
            <Card><CardHeader><CardTitle>Pending Reviews</CardTitle></CardHeader><CardContent>3</CardContent></Card>
          </div>
          {/* Quick Links to Admin Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader><CardTitle>Dashboard</CardTitle></CardHeader>
              <CardContent><Button onClick={() => navigate("/admin/dashboard")}>Go to Dashboard</Button></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Users</CardTitle></CardHeader>
              <CardContent><Button onClick={() => navigate("/admin/users")}>Manage Users</Button></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Hotels</CardTitle></CardHeader>
              <CardContent><Button onClick={() => navigate("/admin/hotels")}>Manage Hotels</Button></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Experiences</CardTitle></CardHeader>
              <CardContent><Button onClick={() => navigate("/admin/experiences")}>Manage Experiences</Button></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Packages</CardTitle></CardHeader>
              <CardContent><Button onClick={() => navigate("/admin/packages")}>Manage Packages</Button></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Flights</CardTitle></CardHeader>
              <CardContent><Button onClick={() => navigate("/admin/flights")}>Manage Flights</Button></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Bookings</CardTitle></CardHeader>
              <CardContent><Button onClick={() => navigate("/admin/bookings")}>Manage Bookings</Button></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Reviews</CardTitle></CardHeader>
              <CardContent><Button onClick={() => navigate("/admin/reviews")}>Manage Reviews</Button></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Analytics</CardTitle></CardHeader>
              <CardContent><Button onClick={() => navigate("/admin/analytics")}>View Analytics</Button></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Profile/Settings</CardTitle></CardHeader>
              <CardContent><Button onClick={() => navigate("/admin/profile")}>Admin Profile</Button></CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
