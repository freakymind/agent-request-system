export type RequestStatus = "pending" | "review" | "approved" | "building" | "completed" | "rejected"

export interface StatusUpdate {
  status: RequestStatus
  comment: string
  updatedBy: string
  updatedAt: string
}

export interface AgentRequest {
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
  status: RequestStatus
  statusHistory: StatusUpdate[]
  createdAt: string // ISO string for JSON serialization
}

export interface AgentRequestsStore {
  requests: AgentRequest[]
  lastUpdated: string
}
