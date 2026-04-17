"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, ChevronRight, Clock, User, MapPin, Database, Shield, AlertTriangle, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import type { AgentRequest } from "@/lib/types"

interface AgentRequestsListProps {
  requests: AgentRequest[]
  isLoading?: boolean
}

import type { RequestStatus } from "@/lib/types"
import { MessageSquare } from "lucide-react"

const statusConfig: Record<RequestStatus, { label: string; color: string }> = {
  pending: { label: "Pending Review", color: "bg-amber-100 text-amber-800 border-amber-200" },
  review: { label: "In Review", color: "bg-blue-100 text-blue-800 border-blue-200" },
  approved: { label: "Approved", color: "bg-green-100 text-green-800 border-green-200" },
  building: { label: "Building", color: "bg-purple-100 text-purple-800 border-purple-200" },
  completed: { label: "Completed", color: "bg-emerald-100 text-emerald-800 border-emerald-200" },
  rejected: { label: "Rejected", color: "bg-red-100 text-red-800 border-red-200" },
}

const toleranceLabels: Record<string, string> = {
  zero: "Zero Tolerance",
  low: "Low Tolerance",
  medium: "Medium Tolerance",
  high: "High Tolerance",
}

export function AgentRequestsList({ requests, isLoading }: AgentRequestsListProps) {
  const [selectedRequest, setSelectedRequest] = useState<AgentRequest | null>(null)
  const [searchQuery, setSearchQuery] = useState("")

  const filteredRequests = requests.filter((request) => {
    const query = searchQuery.toLowerCase()
    return (
      request.agentDescription.toLowerCase().includes(query) ||
      request.name.toLowerCase().includes(query) ||
      request.journey.toLowerCase().includes(query) ||
      request.department.toLowerCase().includes(query) ||
      request.businessUnit.toLowerCase().includes(query)
    )
  })

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Spinner className="w-8 h-8 mx-auto mb-4 text-primary" />
          <p className="text-sm text-muted-foreground">Loading requests...</p>
        </CardContent>
      </Card>
    )
  }

  if (requests.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Bot className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No Requests Yet</h3>
          <p className="text-sm text-muted-foreground">
            Start a conversation with the Agent Coach to create your first request.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="border-b border-border space-y-4">
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          Agent Requests ({requests.length})
        </CardTitle>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by agent name, requester, journey, department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px]">
          <div className="divide-y divide-border">
            {filteredRequests.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Bot className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p>No requests found matching "{searchQuery}"</p>
              </div>
            ) : (
              filteredRequests.map((request) => (
              <Dialog key={request.id}>
                <DialogTrigger asChild>
                  <button
                    className="w-full text-left p-4 hover:bg-muted/50 transition-colors"
                    onClick={() => setSelectedRequest(request)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        {/* Agent Name and Status */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold text-foreground text-base truncate">
                            {request.agentDescription.slice(0, 50)}
                            {request.agentDescription.length > 50 ? "..." : ""}
                          </span>
                          <Badge
                            variant="outline"
                            className={statusConfig[request.status].color}
                          >
                            {statusConfig[request.status].label}
                          </Badge>
                        </div>

                        {/* Benefit Summary */}
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-1">
                          {request.benefit}
                        </p>

                        {/* Details Grid */}
                        <div className="grid grid-cols-2 gap-3 text-xs mb-3">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <User className="w-3.5 h-3.5" />
                            <span>{request.name}</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{request.journey}</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Database className="w-3.5 h-3.5" />
                            <span>{request.department}</span>
                          </div>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{new Date(request.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {/* Business Unit and Tolerance */}
                        <div className="flex items-center gap-2 text-xs">
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            {request.businessUnit}
                          </Badge>
                          <Badge variant="secondary" className="bg-accent/10 text-accent-foreground">
                            {toleranceLabels[request.tolerance] || request.tolerance}
                          </Badge>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1" />
                    </div>
                  </button>
                </DialogTrigger>

                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Bot className="w-5 h-5" />
                      Agent Request Details
                    </DialogTitle>
                    <DialogDescription>
                      View complete details and status history for this agent request.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6 py-4">
                    {/* Status and ID */}
                    <div className="flex items-center justify-between">
                      <Badge
                        variant="outline"
                        className={`${statusConfig[request.status].color} text-sm px-3 py-1`}
                      >
                        {statusConfig[request.status].label}
                      </Badge>
                      <span className="text-sm text-muted-foreground font-mono">
                        ID: {request.id}
                      </span>
                    </div>

                    {/* Requestor Info */}
                    <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                      <h4 className="font-medium text-foreground flex items-center gap-2">
                        <User className="w-4 h-4" />
                        Requestor Information
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Name:</span>
                          <p className="text-foreground font-medium">{request.name}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Email:</span>
                          <p className="text-foreground font-medium">{request.email}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Department:</span>
                          <p className="text-foreground font-medium">{request.department}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Business Unit:</span>
                          <p className="text-foreground font-medium">{request.businessUnit}</p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Role:</span>
                          <p className="text-foreground font-medium">{request.role}</p>
                        </div>
                      </div>
                    </div>

                    {/* Agent Details */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground flex items-center gap-2">
                        <Bot className="w-4 h-4" />
                        Agent Purpose
                      </h4>
                      <div className="space-y-3 text-sm">
                        <div>
                          <span className="text-muted-foreground">Description:</span>
                          <p className="text-foreground mt-1">{request.agentDescription}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Journey:</span>
                          <p className="text-foreground font-medium">{request.journey}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Process:</span>
                          <p className="text-foreground mt-1">{request.processDescription}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Expected Benefit:</span>
                          <p className="text-foreground mt-1">{request.benefit}</p>
                        </div>
                      </div>
                    </div>

                    {/* Process Details */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Process Details
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Regulated:</span>
                          <p className="text-foreground font-medium capitalize">{request.isRegulated}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Error Tolerance:</span>
                          <p className="text-foreground font-medium">
                            {toleranceLabels[request.tolerance] || request.tolerance}
                          </p>
                        </div>
                        <div className="col-span-2">
                          <span className="text-muted-foreground">Existing Process Change:</span>
                          <p className="text-foreground font-medium capitalize">{request.existingProcess}</p>
                          {request.existingProcess === "yes" && request.existingProcessDetails && (
                            <p className="text-foreground mt-1">{request.existingProcessDetails}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Data Sources */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground flex items-center gap-2">
                        <Database className="w-4 h-4" />
                        Data Sources
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {request.dataSources.map((source) => (
                          <Badge key={source} variant="secondary">
                            {source}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Process Owner */}
                    <div className="space-y-3">
                      <h4 className="font-medium text-foreground flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Process Owner
                      </h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Name:</span>
                          <p className="text-foreground font-medium">{request.processOwner}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Email:</span>
                          <p className="text-foreground font-medium">{request.processOwnerEmail}</p>
                        </div>
                      </div>
                    </div>

                    {/* Status History */}
                    {request.statusHistory && request.statusHistory.length > 0 && (
                      <div className="space-y-3">
                        <h4 className="font-medium text-foreground flex items-center gap-2">
                          <MessageSquare className="w-4 h-4" />
                          Status Updates
                        </h4>
                        <div className="space-y-3">
                          {request.statusHistory.map((update, index) => (
                            <div key={index} className="bg-muted/50 rounded-lg p-3 text-sm">
                              <div className="flex items-center justify-between mb-2">
                                <Badge variant="outline" className={statusConfig[update.status].color}>
                                  {statusConfig[update.status].label}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {new Date(update.updatedAt).toLocaleString()}
                                </span>
                              </div>
                              {update.comment && (
                                <p className="text-muted-foreground">{update.comment}</p>
                              )}
                              <p className="text-xs text-muted-foreground mt-2">
                                Updated by: {update.updatedBy}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
