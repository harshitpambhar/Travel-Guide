import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminProfile() {
  return (
    <div className="space-y-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold">Admin Profile & Settings</h2>
      <Card>
        <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input placeholder="Name" />
            <Input placeholder="Email" />
            <Button>Update Profile</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
