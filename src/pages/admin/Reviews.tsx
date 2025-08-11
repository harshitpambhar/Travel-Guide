import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const initialPlaces = [
  { id: 1, name: "Gardens by the Bay", user: "alice", date: "2025-08-01", status: "pending", details: "A beautiful nature park in Singapore." },
  { id: 2, name: "Marina Bay Sands", user: "bob", date: "2025-08-02", status: "approved", details: "Iconic hotel and entertainment complex." },
  { id: 3, name: "Sentosa Beach", user: "carol", date: "2025-08-03", status: "rejected", details: "Popular island resort." },
];

export default function AdminReviews() {
  const [places, setPlaces] = useState(initialPlaces);
  const [selected, setSelected] = useState(null as null | typeof initialPlaces[0]);

  const handleApprove = (id: number) => {
    setPlaces(places.map(p => p.id === id ? { ...p, status: "approved" } : p));
  };
  const handleReject = (id: number) => {
    setPlaces(places.map(p => p.id === id ? { ...p, status: "rejected" } : p));
  };

  const pending = places.filter(p => p.status === "pending");
  const approved = places.filter(p => p.status === "approved");
  const rejected = places.filter(p => p.status === "rejected");

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Admin Review Panel</h2>
      <p className="text-muted-foreground mb-6">Review and manage user-contributed places</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card>
          <CardHeader><CardTitle className="text-orange-600">Pending Review ({pending.length})</CardTitle></CardHeader>
          <CardContent>
            {pending.length === 0 ? <div className="text-muted-foreground">No pending places.</div> : (
              <ul className="space-y-3">
                {pending.map(place => (
                  <li key={place.id} className="flex flex-col gap-1 border-b pb-2">
                    <div className="font-semibold cursor-pointer" onClick={() => setSelected(place)}>{place.name}</div>
                    <div className="text-xs text-muted-foreground">By {place.user} on {place.date}</div>
                    <div className="flex gap-2 mt-1">
                      <Button size="sm" onClick={() => handleApprove(place.id)} className="bg-green-500 hover:bg-green-600 text-white">Approve</Button>
                      <Button size="sm" onClick={() => handleReject(place.id)} className="bg-red-500 hover:bg-red-600 text-white">Reject</Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-green-600">Approved ({approved.length})</CardTitle></CardHeader>
          <CardContent>
            {approved.length === 0 ? <div className="text-muted-foreground">No approved places.</div> : (
              <ul className="space-y-3">
                {approved.map(place => (
                  <li key={place.id} className="flex flex-col gap-1 border-b pb-2">
                    <div className="font-semibold cursor-pointer" onClick={() => setSelected(place)}>{place.name}</div>
                    <div className="text-xs text-muted-foreground">By {place.user} on {place.date}</div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-red-600">Rejected ({rejected.length})</CardTitle></CardHeader>
          <CardContent>
            {rejected.length === 0 ? <div className="text-muted-foreground">No rejected places.</div> : (
              <ul className="space-y-3">
                {rejected.map(place => (
                  <li key={place.id} className="flex flex-col gap-1 border-b pb-2">
                    <div className="font-semibold cursor-pointer" onClick={() => setSelected(place)}>{place.name}</div>
                    <div className="text-xs text-muted-foreground">By {place.user} on {place.date}</div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
      {/* Details Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
            <button className="absolute top-2 right-2 text-xl" onClick={() => setSelected(null)}>&times;</button>
            <h3 className="text-xl font-bold mb-2">{selected.name}</h3>
            <div className="mb-2 text-muted-foreground">By {selected.user} on {selected.date}</div>
            <div className="mb-4">{selected.details}</div>
            {selected.status === "pending" && (
              <div className="flex gap-2">
                <Button size="sm" onClick={() => { handleApprove(selected.id); setSelected(null); }} className="bg-green-500 hover:bg-green-600 text-white">Approve</Button>
                <Button size="sm" onClick={() => { handleReject(selected.id); setSelected(null); }} className="bg-red-500 hover:bg-red-600 text-white">Reject</Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
