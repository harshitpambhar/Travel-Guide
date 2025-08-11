import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminExperiences() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Manage Experiences</h2>
      <Card>
        <CardHeader><CardTitle>Experiences List</CardTitle></CardHeader>
        <CardContent>
          {/* Table of experiences here */}
          <div className="mb-4">Experience management features coming soon...</div>
          <Button>Add Experience</Button>
        </CardContent>
      </Card>
    </div>
  );
}
