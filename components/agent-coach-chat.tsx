"use client"

import { useState, useRef, useEffect } from "react"
import { useChat } from "@ai-sdk/react"
import { DefaultChatTransport } from "ai"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Bot, Send, User, Loader2, Check } from "lucide-react"

interface AgentRequestData {
  complete: boolean
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
}

interface AgentCoachChatProps {
  onRequestComplete: (data: AgentRequestData) => void
}

export function AgentCoachChat({ onRequestComplete }: AgentCoachChatProps) {
  const [inputValue, setInputValue] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [hasExtractedData, setHasExtractedData] = useState(false)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  })

  const isLoading = status === "streaming" || status === "submitted"

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Extract request data from AI responses
  useEffect(() => {
    if (hasExtractedData) return

    for (const message of messages) {
      if (message.role === "assistant") {
        const text = message.parts
          ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
          .map((p) => p.text)
          .join("") || ""

        const match = text.match(/\[AGENT_REQUEST_DATA\]([\s\S]*?)\[\/AGENT_REQUEST_DATA\]/)
        if (match) {
          try {
            const data = JSON.parse(match[1].trim()) as AgentRequestData
            if (data.complete) {
              setHasExtractedData(true)
              onRequestComplete(data)
            }
          } catch {
            // Invalid JSON, continue
          }
        }
      }
    }
  }, [messages, onRequestComplete, hasExtractedData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim() || isLoading) return
    sendMessage({ text: inputValue })
    setInputValue("")
  }

  const getMessageText = (message: typeof messages[0]) => {
    const text = message.parts
      ?.filter((p): p is { type: "text"; text: string } => p.type === "text")
      .map((p) => p.text)
      .join("") || ""
    
    // Remove the JSON block from display
    return text.replace(/\[AGENT_REQUEST_DATA\][\s\S]*?\[\/AGENT_REQUEST_DATA\]/g, "").trim()
  }

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="border-b border-border pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <CardTitle className="text-lg">Agent Coach</CardTitle>
            <p className="text-sm text-muted-foreground">
              {hasExtractedData ? "Request captured successfully!" : "I'll help you define your agent request"}
            </p>
          </div>
          {hasExtractedData && (
            <div className="ml-auto flex items-center gap-2 text-sm text-primary">
              <Check className="w-4 h-4" />
              <span>Complete</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="flex gap-3">
            <Avatar className="w-8 h-8 bg-primary">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                <Bot className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 bg-muted rounded-lg rounded-tl-none p-3">
              <p className="text-sm text-foreground">
                Hello! I&apos;m your Agent Coach at NatWest. I&apos;ll help you define a new AI agent request through a friendly conversation. 
                Let&apos;s start with the basics - what&apos;s your name and what role do you have at NatWest?
              </p>
            </div>
          </div>
        )}

        {messages.map((message) => {
          const displayText = getMessageText(message)
          if (!displayText) return null

          return (
            <div
              key={message.id}
              className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
            >
              <Avatar className={`w-8 h-8 ${message.role === "user" ? "bg-secondary" : "bg-primary"}`}>
                <AvatarFallback
                  className={
                    message.role === "user"
                      ? "bg-secondary text-secondary-foreground text-xs"
                      : "bg-primary text-primary-foreground text-xs"
                  }
                >
                  {message.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </AvatarFallback>
              </Avatar>
              <div
                className={`flex-1 max-w-[80%] rounded-lg p-3 ${
                  message.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-none"
                    : "bg-muted text-foreground rounded-tl-none"
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{displayText}</p>
              </div>
            </div>
          )
        })}

        {isLoading && (
          <div className="flex gap-3">
            <Avatar className="w-8 h-8 bg-primary">
              <AvatarFallback className="bg-primary text-primary-foreground text-xs">
                <Bot className="w-4 h-4" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-muted rounded-lg rounded-tl-none p-3">
              <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </CardContent>

      <div className="p-4 border-t border-border">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={hasExtractedData ? "Add more details..." : "Type your response..."}
            disabled={isLoading}
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading || !inputValue.trim()} size="icon">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </div>
    </Card>
  )
}
