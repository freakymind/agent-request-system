"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { AgentCoachChat } from "@/components/agent-coach-chat"
import { AgentRequestsList } from "@/components/agent-requests-list"
import { Bot, MessageSquare, List, Download, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { AgentRequest } from "@/lib/types"

export default function RequestPage() {
  const searchParams = useSearchParams()
  const initialTab = searchParams.get("tab") || "chat"
  
  const [requests, setRequests] = useState<AgentRequest[]>([])
  const [activeTab, setActiveTab] = useState(initialTab)
  const [chatKey, setChatKey] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

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

  const handleRequestComplete = async (data: Omit<AgentRequest, "id" | "status" | "createdAt" | "statusHistory">) => {
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
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-foreground">NatWest</span>
            </div>
          </div>
          <Link href="/admin">
            <Button variant="ghost" size="sm" className="text-muted-foreground">
              <Shield className="w-4 h-4 mr-2" />
              Admin
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <div className="py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Agent Request System
            </h1>
            <p className="text-muted-foreground">
              Chat with our AI Coach to define and submit your agent request
            </p>
          </div>

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
    </div>
  )
}
