import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminAnalytics() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics & Reports</h2>
      <Card>
        <CardHeader><CardTitle>Analytics Overview</CardTitle></CardHeader>
        <CardContent>
          {/* Analytics charts and reports here */}
          <div className="mb-4">Analytics features coming soon...</div>
        </CardContent>
      </Card>
    </div>
  );
}
