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
  status: "pending" | "review" | "approved" | "building"
  createdAt: string // ISO string for JSON serialization
}

export interface AgentRequestsStore {
  requests: AgentRequest[]
  lastUpdated: string
}
