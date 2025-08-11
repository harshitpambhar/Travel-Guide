import { Header } from "@/components/layout/header";
import { LocationRequestManager } from "@/components/admin/LocationRequestManager";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  MapPin, 
  Users, 
  Calendar, 
  Star, 
  TrendingUp,
  Globe,
  Settings,
  Shield,
  AlertTriangle
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const [user, setUser] = useState({ name: "", email: "", type: "" });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated and is an admin
    const authStatus = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('user');
    
    if (authStatus === 'true' && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        if (parsedUser.type === 'admin') {
          setUser(parsedUser);
        } else {
          // User is not an admin, redirect to homepage
          navigate('/');
          return;
        }
      } catch (error) {
        console.error('Error parsing user data:', error);
        navigate('/');
        return;
      }
    } else {
      // User is not authenticated, redirect to signin
      navigate('/signin');
      return;
    }
    
    setIsLoading(false);
  }, [navigate]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-24 pb-10">
          <div className="container mx-auto px-4">
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading admin panel...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Access denied component for non-admin users
  if (user.type !== 'admin') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="pt-24 pb-10">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto text-center">
              <div className="bg-red-50 border border-red-200 rounded-lg p-8">
                <AlertTriangle className="h-16 w-16 text-red-500 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-red-700 mb-4">Access Denied</h1>
                <p className="text-red-600 mb-6">
                  You do not have administrator privileges to access this page.
                </p>
                <Button onClick={() => navigate('/')}>
                  Return to Homepage
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
          {/* Admin Header with User Info */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Admin Panel
              </h1>
              <p className="text-muted-foreground">
                Welcome back, <span className="font-semibold text-foreground">{user.name}</span> 
                <span className="ml-2 inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                  <Shield className="h-3 w-3" />
                  Administrator
                </span>
              </p>
            </div>
          </div>
          
          {/* Dashboard Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Location Requests</CardTitle>
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">+5 new this week</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
                <Calendar className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">567</div>
                <p className="text-xs text-muted-foreground">+12.3% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
                <Star className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.8</div>
                <p className="text-xs text-muted-foreground">+0.2 from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Main Admin Interface */}
          <Tabs defaultValue="location-requests" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="location-requests" className="gap-2">
                <MapPin className="h-4 w-4" />
                Location Requests
              </TabsTrigger>
              <TabsTrigger value="overview" className="gap-2">
                <TrendingUp className="h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="quick-actions" className="gap-2">
                <Globe className="h-4 w-4" />
                Quick Actions
              </TabsTrigger>
              <TabsTrigger value="settings" className="gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </TabsTrigger>
            </TabsList>

            {/* Location Requests Tab */}
            <TabsContent value="location-requests" className="space-y-6">
              <LocationRequestManager />
            </TabsContent>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Location request approved: Hidden Beach Cove</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">New user registration: John Doe</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                        <span className="text-sm">Booking completed: Universal Studios Singapore</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>System Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Database</span>
                        <span className="text-sm text-green-600">Online</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">API Services</span>
                        <span className="text-sm text-green-600">Online</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">File Storage</span>
                        <span className="text-sm text-green-600">Online</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Quick Actions Tab */}
            <TabsContent value="quick-actions" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full" variant="outline">View All Users</Button>
                    <Button className="w-full" variant="outline">Add New User</Button>
                    <Button className="w-full" variant="outline">User Analytics</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Content Management</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full" variant="outline">Manage Hotels</Button>
                    <Button className="w-full" variant="outline">Manage Experiences</Button>
                    <Button className="w-full" variant="outline">Manage Packages</Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>System Tools</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full" variant="outline">Backup Database</Button>
                    <Button className="w-full" variant="outline">System Logs</Button>
                    <Button className="w-full" variant="outline">Performance Monitor</Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Admin Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Admin Email Notifications</label>
                    <div className="mt-2 space-y-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">New location requests</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked />
                        <span className="text-sm">User registrations</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" />
                        <span className="text-sm">System alerts</span>
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Auto-approval Threshold</label>
                    <select className="w-full p-2 border rounded-md mt-2">
                      <option>Manual approval required</option>
                      <option>Auto-approve after 24 hours</option>
                      <option>Auto-approve after 48 hours</option>
                    </select>
                  </div>
                  <Button>Save Settings</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
