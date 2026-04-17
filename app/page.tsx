import Link from "next/link"
import { Bot, MessageSquare, Shield, ArrowRight, Zap, Users, Clock, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const benefits = [
  {
    icon: MessageSquare,
    title: "AI-Guided Process",
    description: "Our intelligent coach walks you through each step, ensuring all requirements are captured accurately.",
  },
  {
    icon: Zap,
    title: "Faster Delivery",
    description: "Structured requests mean the Agentic team can review and build faster with fewer back-and-forth cycles.",
  },
  {
    icon: Users,
    title: "Full Transparency",
    description: "Track your request status in real-time and receive updates as your agent progresses through the pipeline.",
  },
  {
    icon: Clock,
    title: "Streamlined Workflow",
    description: "From initial idea to deployed agent, everything flows through one unified system.",
  },
]

const steps = [
  { number: "01", title: "Start a Conversation", description: "Chat with our AI Coach about your agent needs" },
  { number: "02", title: "Define Requirements", description: "Answer guided questions about process and data" },
  { number: "03", title: "Submit Request", description: "Your complete request goes to the Agentic team" },
  { number: "04", title: "Track Progress", description: "Monitor status and receive updates" },
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold text-foreground">NatWest</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </Link>
            <Link href="/request">
              <Button size="sm">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-primary/5 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <Bot className="w-4 h-4" />
            Core Agentic Team
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 text-balance leading-tight">
            Agent Request System
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Request new AI agents for your team through a guided, conversational process. 
            Our AI Coach helps you capture all requirements for faster delivery.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/request">
              <Button size="lg" className="px-8">
                <MessageSquare className="w-5 h-5 mr-2" />
                Start New Request
              </Button>
            </Link>
            <Link href="/request?tab=requests">
              <Button variant="outline" size="lg">
                View My Requests
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-3">Why Use This System?</h2>
            <p className="text-muted-foreground">A smarter way to request and track AI agents</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="border-border">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">{benefit.title}</h3>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-3">How It Works</h2>
            <p className="text-muted-foreground">Four simple steps to get your agent built</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary/20 mb-2">{step.number}</div>
                  <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 right-0 translate-x-1/2 text-border">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-primary text-primary-foreground border-0">
            <CardContent className="p-8 text-center">
              <CheckCircle2 className="w-12 h-12 mx-auto mb-4 opacity-90" />
              <h2 className="text-2xl font-bold mb-3">Ready to Request Your Agent?</h2>
              <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
                Start a conversation with our AI Coach and have your complete request submitted in minutes.
              </p>
              <Link href="/request">
                <Button variant="secondary" size="lg" className="px-8">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Start Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-6 px-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4" />
            <span>NatWest Agent Request System</span>
          </div>
          <span>Core Agentic Team</span>
        </div>
      </footer>
    </div>
  )
}
