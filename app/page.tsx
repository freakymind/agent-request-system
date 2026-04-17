"use client"

import { useState } from "react"
import { AgentCoachChat } from "@/components/agent-coach-chat"
import { AgentRequestsList } from "@/components/agent-requests-list"
import { Bot, MessageSquare, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

export default function Home() {
  const [requests, setRequests] = useState<AgentRequest[]>([])
  const [activeTab, setActiveTab] = useState("chat")
  const [chatKey, setChatKey] = useState(0)

  const handleRequestComplete = (data: Omit<AgentRequest, "id" | "status" | "createdAt">) => {
    const newRequest: AgentRequest = {
      ...data,
      id: `AGT-${Date.now().toString().slice(-8)}`,
      status: "pending",
      createdAt: new Date(),
    }
    setRequests((prev) => [newRequest, ...prev])
    setActiveTab("requests")
  }

  const startNewChat = () => {
    setChatKey((prev) => prev + 1)
    setActiveTab("chat")
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">NatWest</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2 text-balance">
            Agent Request System
          </h1>
          <p className="text-muted-foreground text-pretty">
            Chat with our AI Coach to define and submit your agent request
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-auto grid-cols-2">
              <TabsTrigger value="chat" className="flex items-center gap-2 px-4">
                <MessageSquare className="w-4 h-4" />
                <span>New Request</span>
              </TabsTrigger>
              <TabsTrigger value="requests" className="flex items-center gap-2 px-4">
                <List className="w-4 h-4" />
                <span>All Requests ({requests.length})</span>
              </TabsTrigger>
            </TabsList>

            {activeTab === "requests" && requests.length > 0 && (
              <Button onClick={startNewChat} variant="outline" size="sm">
                <MessageSquare className="w-4 h-4 mr-2" />
                New Request
              </Button>
            )}
          </div>

          <TabsContent value="chat" className="mt-0">
            <AgentCoachChat key={chatKey} onRequestComplete={handleRequestComplete} />
          </TabsContent>

          <TabsContent value="requests" className="mt-0">
            <AgentRequestsList requests={requests} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
