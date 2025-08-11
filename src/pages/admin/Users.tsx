import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function AdminUsers() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Manage Users</h2>
      <Card>
        <CardHeader><CardTitle>Users List</CardTitle></CardHeader>
        <CardContent>
          {/* Table of users here */}
          <div className="mb-4">User management features coming soon...</div>
          <Button>Add User</Button>
        </CardContent>
      </Card>
    </div>
  );
}
