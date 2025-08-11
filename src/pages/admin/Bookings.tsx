import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminBookings() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Manage Bookings</h2>
      <Card>
        <CardHeader><CardTitle>Bookings List</CardTitle></CardHeader>
        <CardContent>
          {/* Table of bookings here */}
          <div className="mb-4">Booking management features coming soon...</div>
        </CardContent>
      </Card>
    </div>
  );
}
