import Link from "next/link"
import { Bot, MessageSquare, Shield, ArrowRight, Zap, Users, Clock, CheckCircle2, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const benefits = [
  {
    icon: MessageSquare,
    title: "AI-Guided Process",
    description: "Our intelligent coach walks you through each step, capturing all requirements accurately.",
  },
  {
    icon: Zap,
    title: "Faster Delivery",
    description: "Structured requests mean the Agentic team can review and build with fewer back-and-forth cycles.",
  },
  {
    icon: Users,
    title: "Full Transparency",
    description: "Track your request status in real-time as your agent progresses through the pipeline.",
  },
  {
    icon: Clock,
    title: "Streamlined Workflow",
    description: "From initial idea to deployed agent, everything flows through one unified system.",
  },
]

const steps = [
  { number: "01", title: "Start a Conversation", description: "Chat with our AI Coach" },
  { number: "02", title: "Define Requirements", description: "Answer guided questions" },
  { number: "03", title: "Submit Request", description: "Send to Agentic team" },
  { number: "04", title: "Track Progress", description: "Monitor and receive updates" },
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="text-lg font-bold text-foreground">NatWest</span>
              <span className="text-xs text-muted-foreground block -mt-0.5">Agent Request System</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </Link>
            <Link href="/request">
              <Button size="sm" className="shadow-md shadow-primary/20">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-8 border border-primary/20">
            <Sparkles className="w-4 h-4" />
            Core Agentic Team
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance leading-[1.1] tracking-tight">
            Request AI Agents
            <span className="block text-primary">The Smart Way</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty leading-relaxed">
            Our AI Coach guides you through defining your agent requirements, ensuring faster delivery with complete specifications.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/request">
              <Button size="lg" className="px-8 h-12 text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-shadow">
                <MessageSquare className="w-5 h-5 mr-2" />
                Start New Request
              </Button>
            </Link>
            <Link href="/request?tab=requests">
              <Button variant="outline" size="lg" className="h-12 text-base border-2">
                View My Requests
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground mb-4">Why Use This System?</h2>
            <p className="text-muted-foreground text-lg">A smarter way to request and track AI agents</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="border-border/50 hover:border-primary/30 transition-colors group">
                <CardContent className="p-6">
                  <div className="flex gap-5">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
                      <benefit.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-lg mb-2">{benefit.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">Four simple steps to get your agent built</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/15 transition-colors">
                  <span className="text-2xl font-bold text-primary">{step.number}</span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-4 text-primary/30">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Card className="bg-primary border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 to-transparent" />
            <CardContent className="p-10 text-center relative">
              <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">Ready to Request Your Agent?</h2>
              <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto text-lg">
                Start a conversation with our AI Coach and have your complete request submitted in minutes.
              </p>
              <Link href="/request">
                <Button variant="secondary" size="lg" className="px-10 h-12 text-base shadow-lg">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Start Now
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-border py-8 px-6 bg-card">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <span>NatWest Agent Request System</span>
          </div>
          <span>Core Agentic Team</span>
        </div>
      </footer>
    </div>
  )
}
