"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, ChevronRight, Clock, User, MapPin, Database, Shield, AlertTriangle } from "lucide-react"

interface AgentRequest {
  id: string
  name: string
  email: string
  department: string
  businessUnit: string
  role: string
  agentDescription: string
  journey: string
  processDescription: string
  isRegulated: string
  tolerance: string
  existingProcess: string
  existingProcessDetails: string
  dataSources: string[]
  processOwner: string
  processOwnerEmail: string
  benefit: string
  status: "pending" | "review" | "approved" | "building"
  createdAt: Date
}

interface AgentRequestsListProps {
  requests: AgentRequest[]
}

const statusConfig = {
  pending: { label: "Pending Review", color: "bg-amber-100 text-amber-800 border-amber-200" },
  review: { label: "In Review", color: "bg-blue-100 text-blue-800 border-blue-200" },
  approved: { label: "Approved", color: "bg-green-100 text-green-800 border-green-200" },
  building: { label: "Building", color: "bg-purple-100 text-purple-800 border-purple-200" },
}

const toleranceLabels: Record<string, string> = {
  zero: "Zero Tolerance",
  low: "Low Tolerance",
  medium: "Medium Tolerance",
  high: "High Tolerance",
}

export function AgentRequestsList({ requests }: AgentRequestsListProps) {
  const [selectedRequest, setSelectedRequest] = useState<AgentRequest | null>(null)

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
      <CardHeader className="border-b border-border">
        <CardTitle className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          Agent Requests ({requests.length})
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[500px]">
          <div className="divide-y divide-border">
            {requests.map((request) => (
              <Dialog key={request.id}>
                <DialogTrigger asChild>
                  <button
                    className="w-full text-left p-4 hover:bg-muted/50 transition-colors"
                    onClick={() => setSelectedRequest(request)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground truncate">
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
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {request.name}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3 h-3" />
                            {request.journey}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {request.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {request.benefit}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  </button>
                </DialogTrigger>

                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <Bot className="w-5 h-5" />
                      Agent Request Details
                    </DialogTitle>
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
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}
