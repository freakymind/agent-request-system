"use client"

import { useState } from "react"
import useSWR from "swr"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Spinner } from "@/components/ui/spinner"
import { 
  Shield, 
  Search, 
  Clock, 
  User, 
  MapPin, 
  Database,
  CheckCircle,
  XCircle,
  PlayCircle,
  Eye,
  MessageSquare,
  ArrowLeft,
  Building2
} from "lucide-react"
import type { AgentRequest, RequestStatus, AgentRequestsStore } from "@/lib/types"
import Link from "next/link"

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const statusConfig: Record<RequestStatus, { label: string; color: string; icon: React.ReactNode }> = {
  pending: { 
    label: "Pending Review", 
    color: "bg-amber-100 text-amber-800 border-amber-300",
    icon: <Clock className="w-4 h-4" />
  },
  review: { 
    label: "Under Review", 
    color: "bg-blue-100 text-blue-800 border-blue-300",
    icon: <Eye className="w-4 h-4" />
  },
  approved: { 
    label: "Approved", 
    color: "bg-green-100 text-green-800 border-green-300",
    icon: <CheckCircle className="w-4 h-4" />
  },
  building: { 
    label: "In Development", 
    color: "bg-purple-100 text-purple-800 border-purple-300",
    icon: <PlayCircle className="w-4 h-4" />
  },
  completed: { 
    label: "Completed", 
    color: "bg-emerald-100 text-emerald-800 border-emerald-300",
    icon: <CheckCircle className="w-4 h-4" />
  },
  rejected: { 
    label: "Rejected", 
    color: "bg-red-100 text-red-800 border-red-300",
    icon: <XCircle className="w-4 h-4" />
  },
}

export default function AdminPage() {
  const { data, isLoading, mutate } = useSWR<AgentRequestsStore>("/api/requests", fetcher, {
    refreshInterval: 5000,
  })

  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedRequest, setSelectedRequest] = useState<AgentRequest | null>(null)
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false)
  const [newStatus, setNewStatus] = useState<RequestStatus>("pending")
  const [comment, setComment] = useState("")
  const [adminName, setAdminName] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  const requests = data?.requests || []

  const filteredRequests = requests.filter((request) => {
    const matchesSearch =
      searchQuery === "" ||
      request.agentDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      request.journey.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || request.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const statusCounts = requests.reduce(
    (acc, req) => {
      acc[req.status] = (acc[req.status] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  const handleUpdateStatus = async () => {
    if (!selectedRequest || !adminName.trim()) return

    setIsUpdating(true)
    try {
      const response = await fetch(`/api/requests/${selectedRequest.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          comment,
          updatedBy: adminName,
        }),
      })

      if (response.ok) {
        mutate()
        setIsUpdateDialogOpen(false)
        setComment("")
        setSelectedRequest(null)
      }
    } catch (error) {
      console.error("Failed to update status:", error)
    } finally {
      setIsUpdating(false)
    }
  }

  const openUpdateDialog = (request: AgentRequest) => {
    setSelectedRequest(request)
    setNewStatus(request.status)
    setIsUpdateDialogOpen(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Spinner className="w-8 h-8 mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 px-6 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back
            </Link>
            <div className="h-6 w-px bg-primary-foreground/30" />
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6" />
              <h1 className="text-xl font-semibold">Admin Dashboard</h1>
            </div>
          </div>
          <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
            Core Agentic Team
          </Badge>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {(Object.keys(statusConfig) as RequestStatus[]).map((status) => (
            <Card
              key={status}
              className={`cursor-pointer transition-all ${statusFilter === status ? "ring-2 ring-primary" : "hover:shadow-md"}`}
              onClick={() => setStatusFilter(statusFilter === status ? "all" : status)}
            >
              <CardContent className="p-4 text-center">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-full mb-2 ${statusConfig[status].color}`}>
                  {statusConfig[status].icon}
                </div>
                <p className="text-2xl font-bold text-foreground">{statusCounts[status] || 0}</p>
                <p className="text-xs text-muted-foreground">{statusConfig[status].label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by ID, agent name, requester, journey..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  {(Object.keys(statusConfig) as RequestStatus[]).map((status) => (
                    <SelectItem key={status} value={status}>
                      {statusConfig[status].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Requests Table */}
        <Card>
          <CardHeader className="border-b border-border">
            <CardTitle>Agent Requests ({filteredRequests.length})</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px]">
              <div className="divide-y divide-border">
                {filteredRequests.length === 0 ? (
                  <div className="p-8 text-center text-muted-foreground">
                    No requests found
                  </div>
                ) : (
                  filteredRequests.map((request) => (
                    <div
                      key={request.id}
                      className="p-4 hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          {/* Header Row */}
                          <div className="flex items-center gap-3 mb-2">
                            <code className="text-xs bg-muted px-2 py-1 rounded font-mono">{request.id}</code>
                            <Badge variant="outline" className={statusConfig[request.status].color}>
                              {statusConfig[request.status].label}
                            </Badge>
                          </div>

                          {/* Agent Name */}
                          <h3 className="font-semibold text-foreground mb-1">
                            {request.agentDescription}
                          </h3>

                          {/* Benefit */}
                          <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                            {request.benefit}
                          </p>

                          {/* Details Grid */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <User className="w-3.5 h-3.5" />
                              <span>{request.name}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Building2 className="w-3.5 h-3.5" />
                              <span>{request.department}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              <span>{request.journey}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>

                          {/* Status History Preview */}
                          {request.statusHistory && request.statusHistory.length > 0 && (
                            <div className="mt-3 p-2 bg-muted/50 rounded text-xs">
                              <div className="flex items-center gap-1 text-muted-foreground">
                                <MessageSquare className="w-3 h-3" />
                                <span className="font-medium">Latest: </span>
                                <span>{request.statusHistory[request.statusHistory.length - 1].comment || "No comment"}</span>
                                <span className="ml-auto">{request.statusHistory[request.statusHistory.length - 1].updatedBy}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            onClick={() => openUpdateDialog(request)}
                          >
                            Update Status
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setSelectedRequest(request)}
                          >
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </main>

      {/* Update Status Dialog */}
      <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Request Status</DialogTitle>
            <DialogDescription>
              Change the status and add a comment for this agent request.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Request ID</p>
              <code className="text-sm bg-muted px-2 py-1 rounded">{selectedRequest?.id}</code>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Agent</p>
              <p className="font-medium">{selectedRequest?.agentDescription}</p>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Your Name</label>
              <Input
                placeholder="Enter your name"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">New Status</label>
              <Select value={newStatus} onValueChange={(v) => setNewStatus(v as RequestStatus)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(statusConfig) as RequestStatus[]).map((status) => (
                    <SelectItem key={status} value={status}>
                      {statusConfig[status].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Comment</label>
              <Textarea
                placeholder="Add a comment about this status update..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsUpdateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateStatus} disabled={isUpdating || !adminName.trim()}>
              {isUpdating ? <Spinner className="w-4 h-4 mr-2" /> : null}
              Update Status
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Details Dialog */}
      <Dialog open={!!selectedRequest && !isUpdateDialogOpen} onOpenChange={() => setSelectedRequest(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span>Request Details</span>
              <code className="text-sm bg-muted px-2 py-1 rounded font-normal">{selectedRequest?.id}</code>
            </DialogTitle>
            <DialogDescription>
              Complete information about this agent request including status history.
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6 py-4">
              {/* Status */}
              <div className="flex items-center justify-between">
                <Badge variant="outline" className={`${statusConfig[selectedRequest.status].color} text-sm`}>
                  {statusConfig[selectedRequest.status].label}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Created: {new Date(selectedRequest.createdAt).toLocaleString()}
                </span>
              </div>

              {/* Agent Info */}
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{selectedRequest.agentDescription}</h3>
                <p className="text-muted-foreground">{selectedRequest.benefit}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Requester</p>
                  <p className="font-medium">{selectedRequest.name}</p>
                  <p className="text-xs text-muted-foreground">{selectedRequest.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Department / BU</p>
                  <p className="font-medium">{selectedRequest.department}</p>
                  <p className="text-xs text-muted-foreground">{selectedRequest.businessUnit}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Journey</p>
                  <p className="font-medium">{selectedRequest.journey}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Regulated</p>
                  <p className="font-medium capitalize">{selectedRequest.isRegulated}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Error Tolerance</p>
                  <p className="font-medium capitalize">{selectedRequest.tolerance}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Process Owner</p>
                  <p className="font-medium">{selectedRequest.processOwner}</p>
                  <p className="text-xs text-muted-foreground">{selectedRequest.processOwnerEmail}</p>
                </div>
              </div>

              {/* Process Description */}
              <div>
                <p className="text-muted-foreground mb-1">Process Description</p>
                <p className="text-sm bg-muted p-3 rounded">{selectedRequest.processDescription}</p>
              </div>

              {/* Data Sources */}
              <div>
                <p className="text-muted-foreground mb-2">Data Sources</p>
                <div className="flex flex-wrap gap-2">
                  {selectedRequest.dataSources.map((source) => (
                    <Badge key={source} variant="secondary">
                      <Database className="w-3 h-3 mr-1" />
                      {source}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Status History */}
              {selectedRequest.statusHistory && selectedRequest.statusHistory.length > 0 && (
                <div>
                  <p className="text-muted-foreground mb-2">Status History</p>
                  <div className="space-y-2">
                    {selectedRequest.statusHistory.map((update, index) => (
                      <div key={index} className="bg-muted p-3 rounded text-sm">
                        <div className="flex items-center justify-between mb-1">
                          <Badge variant="outline" className={statusConfig[update.status].color}>
                            {statusConfig[update.status].label}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(update.updatedAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="text-muted-foreground">{update.comment || "No comment"}</p>
                        <p className="text-xs text-muted-foreground mt-1">By: {update.updatedBy}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
