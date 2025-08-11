import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminHotels() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Manage Hotels</h2>
      <Card>
        <CardHeader><CardTitle>Hotels List</CardTitle></CardHeader>
        <CardContent>
          {/* Table of hotels here */}
          <div className="mb-4">Hotel management features coming soon...</div>
          <Button>Add Hotel</Button>
        </CardContent>
      </Card>
    </div>
  );
}
