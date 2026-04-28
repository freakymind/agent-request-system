import Link from "next/link"
import {
  Bot,
  MessageSquare,
  Shield,
  ArrowRight,
  Zap,
  Users,
  Clock,
  CheckCircle2,
  Sparkles,
  Brain,
  Workflow,
  Database,
  Lightbulb,
  Target,
  TrendingUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

const whatIsAgent = [
  {
    icon: Brain,
    title: "Intelligent",
    description: "Powered by AI to understand context and make decisions",
  },
  {
    icon: Workflow,
    title: "Autonomous",
    description: "Executes multi-step processes with minimal human input",
  },
  {
    icon: Database,
    title: "Connected",
    description: "Integrates with your data sources and existing systems",
  },
]

const whenToUse = [
  {
    icon: Target,
    title: "Repetitive Processes",
    description: "Tasks performed regularly that follow predictable patterns and rules.",
  },
  {
    icon: TrendingUp,
    title: "Scaling Challenges",
    description: "When manual effort cannot keep pace with growing customer demand.",
  },
  {
    icon: Lightbulb,
    title: "Decision Support",
    description: "Complex workflows requiring data analysis and contextual reasoning.",
  },
]

const benefits = [
  {
    icon: MessageSquare,
    title: "AI-Guided Process",
    description: "Our intelligent coach walks you through each step, capturing requirements accurately.",
  },
  {
    icon: Zap,
    title: "Faster Delivery",
    description: "Structured requests mean fewer back-and-forth cycles with the build team.",
  },
  {
    icon: Users,
    title: "Full Transparency",
    description: "Track your request status in real-time as it moves through the pipeline.",
  },
  {
    icon: Clock,
    title: "Streamlined Workflow",
    description: "From initial idea to deployed agent, everything flows through one system.",
  },
]

const steps = [
  { number: "01", title: "Start Conversation", description: "Chat with our AI Coach" },
  { number: "02", title: "Define Requirements", description: "Answer guided questions" },
  { number: "03", title: "Submit Request", description: "Send to Agentic team" },
  { number: "04", title: "Track Progress", description: "Monitor and receive updates" },
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="text-lg font-bold text-foreground leading-none">NatWest</span>
              <span className="text-xs text-muted-foreground block mt-0.5">Agent Request System</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
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
      <section className="relative py-24 md:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-background to-background" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-8 border border-primary/20">
            <Sparkles className="w-4 h-4" />
            Powered by Core Agentic Team
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 text-balance leading-[1.05] tracking-tight">
            Build AI Agents
            <span className="block text-primary mt-2">Without the Friction</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty leading-relaxed">
            From idea to production-ready agent. Our AI Coach captures every requirement so the build team can deliver
            faster.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link href="/request">
              <Button
                size="lg"
                className="px-8 h-12 text-base shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Start New Request
              </Button>
            </Link>
            <Link href="/request?tab=requests">
              <Button variant="outline" size="lg" className="h-12 text-base border-2 bg-transparent">
                View My Requests
              </Button>
            </Link>
          </div>

          {/* Stats strip */}
          <div className="mt-20 grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-10 border-t border-border/50">
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">5x</div>
              <div className="text-sm text-muted-foreground">Faster Delivery</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Requirements Captured</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">AI Coach Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* What is an AI Agent */}
      <section className="py-20 px-6 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div>
              <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-wider mb-4">
                <div className="w-8 h-px bg-primary" />
                What is an AI Agent?
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-5 leading-tight">
                Software that thinks, decides, and acts
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                An AI Agent is an intelligent software system that performs tasks on behalf of users. Unlike traditional
                automation, agents use AI to reason about context, adapt to changing inputs, and execute multi-step
                workflows independently.
              </p>
            </div>
            <div className="grid gap-3">
              {whatIsAgent.map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 p-5 rounded-xl bg-background border border-border hover:border-primary/30 transition-colors"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* When to Use */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-wider mb-4">
              <div className="w-8 h-px bg-primary" />
              When to Use This System
              <div className="w-8 h-px bg-primary" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Right problem. Right tool.</h2>
            <p className="text-muted-foreground text-lg">
              An AI agent is the right fit when your process matches one of these patterns.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {whenToUse.map((item) => (
              <Card
                key={item.title}
                className="border-border/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all group"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary group-hover:scale-110 transition-all">
                    <item.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-semibold text-foreground text-lg mb-2">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6 bg-card border-y border-border">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Use This System?</h2>
            <p className="text-muted-foreground text-lg">A smarter way to request and track AI agents</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {benefits.map((benefit) => (
              <Card
                key={benefit.title}
                className="border-border/50 hover:border-primary/30 transition-colors group"
              >
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
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">Four simple steps to get your agent built</p>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={step.number} className="relative text-center group">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:bg-primary group-hover:scale-105 transition-all">
                  <span className="text-2xl font-bold text-primary group-hover:text-primary-foreground transition-colors">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-3 text-primary/30">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-primary border-0 overflow-hidden relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/15 to-transparent" />
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
            <CardContent className="p-10 md:p-14 text-center relative">
              <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-balance">
                Ready to request your agent?
              </h2>
              <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto text-lg leading-relaxed">
                Start a conversation with our AI Coach and have your complete request submitted in minutes.
              </p>
              <Link href="/request">
                <Button
                  variant="secondary"
                  size="lg"
                  className="px-10 h-12 text-base shadow-lg hover:shadow-xl transition-shadow"
                >
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
