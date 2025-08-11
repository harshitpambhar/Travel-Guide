import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend
} from "recharts";

const recentActivity = [
  { id: 1, type: "Booking", user: "alice", detail: "Booked Marina Bay Sands", date: "2025-08-10" },
  { id: 2, type: "Review", user: "bob", detail: "Submitted review for Gardens by the Bay", date: "2025-08-10" },
  { id: 3, type: "User", user: "carol", detail: "Registered new account", date: "2025-08-09" },
  { id: 4, type: "Hotel", user: "admin", detail: "Added new hotel: Sentosa Resort", date: "2025-08-09" },
];

const bookingsData = [
  { month: "Mar", bookings: 120 },
  { month: "Apr", bookings: 180 },
  { month: "May", bookings: 150 },
  { month: "Jun", bookings: 200 },
  { month: "Jul", bookings: 250 },
  { month: "Aug", bookings: 300 },
];

const revenueData = [
  { month: "Mar", revenue: 5000 },
  { month: "Apr", revenue: 7000 },
  { month: "May", revenue: 6500 },
  { month: "Jun", revenue: 9000 },
  { month: "Jul", revenue: 11000 },
  { month: "Aug", revenue: 12000 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Dashboard Overview</h2>
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Card><CardHeader><CardTitle>Total Users</CardTitle></CardHeader><CardContent>1234</CardContent></Card>
        <Card><CardHeader><CardTitle>Total Bookings</CardTitle></CardHeader><CardContent>567</CardContent></Card>
        <Card><CardHeader><CardTitle>Revenue</CardTitle></CardHeader><CardContent>$12,345</CardContent></Card>
        <Card><CardHeader><CardTitle>Pending Reviews</CardTitle></CardHeader><CardContent>3</CardContent></Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Bookings Trend</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={bookingsData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="bookings" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Revenue Trend</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="revenue" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader><CardTitle>Recent Activity</CardTitle></CardHeader>
        <CardContent>
          <ul className="divide-y">
            {recentActivity.map(act => (
              <li key={act.id} className="py-2 flex flex-col md:flex-row md:items-center md:justify-between">
                <span><span className="font-semibold">{act.user}</span> - {act.detail}</span>
                <span className="text-xs text-muted-foreground">{act.date}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Button className="w-full" variant="outline">Add Hotel</Button>
        <Button className="w-full" variant="outline">Add Experience</Button>
        <Button className="w-full" variant="outline">Add Package</Button>
        <Button className="w-full" variant="outline">Add Flight</Button>
      </div>
    </div>
  );
}
