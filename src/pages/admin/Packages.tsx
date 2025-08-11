import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminPackages() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Manage Packages</h2>
      <Card>
        <CardHeader><CardTitle>Packages List</CardTitle></CardHeader>
        <CardContent>
          {/* Table of packages here */}
          <div className="mb-4">Package management features coming soon...</div>
          <Button>Add Package</Button>
        </CardContent>
      </Card>
    </div>
  );
}
