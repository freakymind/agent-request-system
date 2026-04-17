"use client"

import { useState, useEffect } from "react"
import { AgentCoachChat } from "@/components/agent-coach-chat"
import { AgentRequestsList } from "@/components/agent-requests-list"
import { Bot, MessageSquare, List, Download, Shield } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { AgentRequest } from "@/lib/types"

export default function Home() {
  const [requests, setRequests] = useState<AgentRequest[]>([])
  const [activeTab, setActiveTab] = useState("chat")
  const [chatKey, setChatKey] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Load requests on mount
  useEffect(() => {
    async function loadRequests() {
      try {
        const res = await fetch("/api/requests")
        const data = await res.json()
        setRequests(data.requests || [])
      } catch (error) {
        console.error("Failed to load requests:", error)
      } finally {
        setIsLoading(false)
      }
    }
    loadRequests()
  }, [])

  const handleRequestComplete = async (data: Omit<AgentRequest, "id" | "status" | "createdAt">) => {
    try {
      const res = await fetch("/api/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const newRequest = await res.json()
      setRequests((prev) => [newRequest, ...prev])
      setActiveTab("requests")
    } catch (error) {
      console.error("Failed to save request:", error)
    }
  }

  const startNewChat = () => {
    setChatKey((prev) => prev + 1)
    setActiveTab("chat")
  }

  const handleExport = () => {
    window.open("/api/requests/export", "_blank")
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 relative">
          <Link
            href="/admin"
            className="absolute right-0 top-0 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Shield className="w-4 h-4" />
            Admin
          </Link>
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

            {activeTab === "requests" && (
              <div className="flex items-center gap-2">
                {requests.length > 0 && (
                  <Button onClick={handleExport} variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Export JSON
                  </Button>
                )}
                <Button onClick={startNewChat} variant="outline" size="sm">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  New Request
                </Button>
              </div>
            )}
          </div>

          <TabsContent value="chat" className="mt-0">
            <AgentCoachChat key={chatKey} onRequestComplete={handleRequestComplete} />
          </TabsContent>

          <TabsContent value="requests" className="mt-0">
            <AgentRequestsList requests={requests} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
