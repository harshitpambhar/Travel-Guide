import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  User, 
  Calendar, 
  Globe, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye,
  Star,
  MessageSquare
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Location Request Interface
interface LocationRequest {
  id: string;
  user: {
    name: string;
    email: string;
    id: string;
  };
  location: {
    name: string;
    city: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
    category: string;
    description: string;
    photos: string[];
    visitDate: string;
    rating: number;
    review: string;
  };
  status: 'pending' | 'approved' | 'declined';
  submittedAt: string;
  adminNotes?: string;
  adminId?: string;
  processedAt?: string;
}

export function LocationRequestManager() {
  const [requests, setRequests] = useState<LocationRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<LocationRequest | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const { toast } = useToast();

  // Sample data - in real app, this would come from API
  useEffect(() => {
    const sampleRequests: LocationRequest[] = [
      {
        id: "1",
        user: {
          name: "Sarah Johnson",
          email: "sarah.j@example.com",
          id: "user1"
        },
        location: {
          name: "Hidden Beach Cove",
          city: "Bali",
          country: "Indonesia",
          coordinates: { lat: -8.3405, lng: 115.0920 },
          category: "Beach",
          description: "A secluded beach accessible only by boat or hiking trail. Crystal clear water and pristine white sand.",
          photos: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"],
          visitDate: "2024-01-15",
          rating: 5,
          review: "Absolutely breathtaking! This hidden gem is worth the effort to reach. Perfect for a peaceful day away from crowds."
        },
        status: "pending",
        submittedAt: "2024-01-20T10:30:00Z"
      },
      {
        id: "2",
        user: {
          name: "Michael Chen",
          email: "mchen@example.com",
          id: "user2"
        },
        location: {
          name: "Mountain View Lodge",
          city: "Swiss Alps",
          country: "Switzerland",
          coordinates: { lat: 46.8182, lng: 8.2275 },
          category: "Mountain",
          description: "Cozy lodge with panoramic mountain views, perfect for hiking and skiing enthusiasts.",
          photos: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"],
          visitDate: "2024-01-10",
          rating: 4,
          review: "Stunning views and excellent service. The hiking trails around the lodge are amazing."
        },
        status: "approved",
        submittedAt: "2024-01-18T14:20:00Z",
        adminNotes: "High-quality submission with detailed information and photos. Approved for addition to database.",
        adminId: "admin1",
        processedAt: "2024-01-19T09:15:00Z"
      },
      {
        id: "3",
        user: {
          name: "Emma Rodriguez",
          email: "emma.r@example.com",
          id: "user3"
        },
        location: {
          name: "Urban Art District",
          city: "Berlin",
          country: "Germany",
          coordinates: { lat: 52.5200, lng: 13.4050 },
          category: "Cultural",
          description: "Vibrant street art district with galleries, cafes, and creative spaces.",
          photos: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"],
          visitDate: "2024-01-05",
          rating: 4,
          review: "Amazing street art and creative atmosphere. Great place to spend an afternoon exploring."
        },
        status: "declined",
        submittedAt: "2024-01-12T16:45:00Z",
        adminNotes: "Location already exists in our database with similar information. Declined to avoid duplication.",
        adminId: "admin1",
        processedAt: "2024-01-13T11:30:00Z"
      }
    ];
    setRequests(sampleRequests);
  }, []);

  const handleStatusChange = (requestId: string, newStatus: 'approved' | 'declined', adminNotes?: string) => {
    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: newStatus,
          adminNotes: adminNotes || req.adminNotes,
          adminId: "admin1", // In real app, this would be the current admin's ID
          processedAt: new Date().toISOString()
        };
      }
      return req;
    }));

    toast({
      title: `Request ${newStatus}`,
      description: `Location request has been ${newStatus}.`,
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" />Pending</Badge>;
      case 'approved':
        return <Badge variant="default" className="gap-1"><CheckCircle className="h-3 w-3" />Approved</Badge>;
      case 'declined':
        return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" />Declined</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusCount = (status: string) => {
    return requests.filter(req => req.status === status).length;
  };

  const filteredRequests = (status: string) => {
    return requests.filter(req => req.status === status);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Location Request Management</h2>
          <p className="text-muted-foreground">Manage user-submitted location requests</p>
        </div>
        <div className="flex gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{getStatusCount('pending')}</div>
            <div className="text-sm text-muted-foreground">Pending</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{getStatusCount('approved')}</div>
            <div className="text-sm text-muted-foreground">Approved</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{getStatusCount('declined')}</div>
            <div className="text-sm text-muted-foreground">Declined</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending" className="gap-2">
            <Clock className="h-4 w-4" />
            Pending ({getStatusCount('pending')})
          </TabsTrigger>
          <TabsTrigger value="approved" className="gap-2">
            <CheckCircle className="h-4 w-4" />
            Approved ({getStatusCount('approved')})
          </TabsTrigger>
          <TabsTrigger value="declined" className="gap-2">
            <XCircle className="h-4 w-4" />
            Declined ({getStatusCount('declined')})
          </TabsTrigger>
        </TabsList>

        {/* Pending Requests */}
        <TabsContent value="pending" className="space-y-4">
          {filteredRequests('pending').length === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No pending requests</h3>
                <p className="text-muted-foreground">All location requests have been processed.</p>
              </CardContent>
            </Card>
          ) : (
            filteredRequests('pending').map((request) => (
              <LocationRequestCard 
                key={request.id} 
                request={request} 
                onStatusChange={handleStatusChange}
                onViewDetails={() => {
                  setSelectedRequest(request);
                  setIsDetailModalOpen(true);
                }}
              />
            ))
          )}
        </TabsContent>

        {/* Approved Requests */}
        <TabsContent value="approved" className="space-y-4">
          {filteredRequests('approved').map((request) => (
            <LocationRequestCard 
              key={request.id} 
              request={request} 
              onStatusChange={handleStatusChange}
              onViewDetails={() => {
                setSelectedRequest(request);
                setIsDetailModalOpen(true);
              }}
              readOnly
            />
          ))}
        </TabsContent>

        {/* Declined Requests */}
        <TabsContent value="declined" className="space-y-4">
          {filteredRequests('declined').map((request) => (
            <LocationRequestCard 
              key={request.id} 
              request={request} 
              onStatusChange={handleStatusChange}
              onViewDetails={() => {
                setSelectedRequest(request);
                setIsDetailModalOpen(true);
              }}
              readOnly
            />
          ))}
        </TabsContent>
      </Tabs>

      {/* Detail Modal */}
      {isDetailModalOpen && selectedRequest && (
        <LocationRequestDetailModal
          request={selectedRequest}
          onClose={() => {
            setIsDetailModalOpen(false);
            setSelectedRequest(null);
          }}
          onStatusChange={handleStatusChange}
        />
      )}
    </div>
  );
}

// Location Request Card Component
function LocationRequestCard({ 
  request, 
  onStatusChange, 
  onViewDetails, 
  readOnly = false 
}: { 
  request: LocationRequest; 
  onStatusChange: (id: string, status: 'approved' | 'declined', notes?: string) => void;
  onViewDetails: () => void;
  readOnly?: boolean;
}) {
  const [showActions, setShowActions] = useState(false);
  const [adminNotes, setAdminNotes] = useState("");

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Location Image */}
          <div className="w-full md:w-48 h-32">
            <img
              src={request.location.photos[0]}
              alt={request.location.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Location Details */}
          <div className="flex-1 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">{request.location.name}</h3>
                <p className="text-muted-foreground mb-2">
                  <MapPin className="h-4 w-4 inline mr-1" />
                  {request.location.city}, {request.location.country}
                </p>
                <p className="text-sm text-muted-foreground mb-2">
                  <User className="h-4 w-4 inline mr-1" />
                  Submitted by {request.user.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 inline mr-1" />
                  Visited on {new Date(request.location.visitDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(request.status)}
                <Button variant="outline" size="sm" onClick={onViewDetails}>
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              </div>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2">
              {request.location.description}
            </p>

            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 text-yellow-500" />
                {request.location.rating}/5
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                {request.location.review.length > 100 
                  ? `${request.location.review.substring(0, 100)}...` 
                  : request.location.review
                }
              </span>
            </div>

            {/* Action Buttons */}
            {!readOnly && request.status === 'pending' && (
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  onClick={() => setShowActions(!showActions)}
                  variant="outline"
                >
                  Take Action
                </Button>
              </div>
            )}

            {/* Action Panel */}
            {showActions && !readOnly && request.status === 'pending' && (
              <div className="border rounded-lg p-4 bg-muted/50 space-y-3">
                <div>
                  <label className="text-sm font-medium">Admin Notes (Optional)</label>
                  <textarea
                    value={adminNotes}
                    onChange={(e) => setAdminNotes(e.target.value)}
                    placeholder="Add notes about your decision..."
                    className="w-full p-2 border rounded-md text-sm mt-1"
                    rows={2}
                  />
                </div>
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => {
                      onStatusChange(request.id, 'approved', adminNotes);
                      setShowActions(false);
                      setAdminNotes("");
                    }}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => {
                      onStatusChange(request.id, 'declined', adminNotes);
                      setShowActions(false);
                      setAdminNotes("");
                    }}
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Decline
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => {
                      setShowActions(false);
                      setAdminNotes("");
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Location Request Detail Modal Component
function LocationRequestDetailModal({ 
  request, 
  onClose, 
  onStatusChange 
}: { 
  request: LocationRequest; 
  onClose: () => void;
  onStatusChange: (id: string, status: 'approved' | 'declined', notes?: string) => void;
}) {
  const [adminNotes, setAdminNotes] = useState(request.adminNotes || "");

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Location Request Details</h2>
            <Button variant="outline" onClick={onClose}>Close</Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Location Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Location Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="font-medium">{request.location.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">City & Country</label>
                  <p className="font-medium">{request.location.city}, {request.location.country}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Category</label>
                  <p className="font-medium">{request.location.category}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Description</label>
                  <p className="text-sm">{request.location.description}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Visit Date</label>
                  <p className="font-medium">{new Date(request.location.visitDate).toLocaleDateString()}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Rating</label>
                  <div className="flex items-center gap-1">
                    <span className="font-medium">{request.location.rating}/5</span>
                    <Star className="h-4 w-4 text-yellow-500" />
                  </div>
                </div>
              </div>
            </div>

            {/* User Information & Photos */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">User Information</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Submitted By</label>
                  <p className="font-medium">{request.user.name}</p>
                  <p className="text-sm text-muted-foreground">{request.user.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Review</label>
                  <p className="text-sm">{request.location.review}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Photos</label>
                  <div className="grid grid-cols-2 gap-2">
                    {request.location.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Notes */}
          <div className="mt-6">
            <label className="text-sm font-medium">Admin Notes</label>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              placeholder="Add or update admin notes..."
              className="w-full p-3 border rounded-md mt-2"
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          {request.status === 'pending' && (
            <div className="flex gap-3 mt-6 pt-6 border-t">
              <Button 
                onClick={() => {
                  onStatusChange(request.id, 'approved', adminNotes);
                  onClose();
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve Request
              </Button>
              <Button 
                variant="destructive"
                onClick={() => {
                  onStatusChange(request.id, 'declined', adminNotes);
                  onClose();
                }}
              >
                <XCircle className="h-4 w-4 mr-2" />
                Decline Request
              </Button>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </div>
          )}

          {/* Status Information */}
          <div className="mt-6 pt-6 border-t">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <label className="text-muted-foreground">Status</label>
                <p className="font-medium">{getStatusBadge(request.status)}</p>
              </div>
              <div>
                <label className="text-muted-foreground">Submitted</label>
                <p className="font-medium">{new Date(request.submittedAt).toLocaleString()}</p>
              </div>
              {request.processedAt && (
                <div>
                  <label className="text-muted-foreground">Processed</label>
                  <p className="font-medium">{new Date(request.processedAt).toLocaleString()}</p>
                </div>
              )}
              {request.adminId && (
                <div>
                  <label className="text-muted-foreground">Processed By</label>
                  <p className="font-medium">Admin #{request.adminId}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper function for status badges
function getStatusBadge(status: string) {
  switch (status) {
    case 'pending':
      return <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" />Pending</Badge>;
    case 'approved':
      return <Badge variant="default" className="gap-1"><CheckCircle className="h-3 w-3" />Approved</Badge>;
    case 'declined':
      return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" />Declined</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}
