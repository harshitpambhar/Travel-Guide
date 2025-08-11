import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminFlights() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Manage Flights</h2>
      <Card>
        <CardHeader><CardTitle>Flights List</CardTitle></CardHeader>
        <CardContent>
          {/* Table of flights here */}
          <div className="mb-4">Flight management features coming soon...</div>
          <Button>Add Flight</Button>
        </CardContent>
      </Card>
    </div>
  );
}
