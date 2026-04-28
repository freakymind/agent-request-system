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
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/70 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30">
                <Bot className="w-5 h-5 text-primary-foreground" />
              </div>
              <div className="absolute inset-0 bg-primary rounded-xl blur-md opacity-40 -z-10 animate-pulse-glow" />
            </div>
            <div>
              <span className="text-lg font-bold text-foreground leading-none tracking-tight">NatWest</span>
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
              <Button size="sm" className="shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section - Full Screen */}
      <section className="relative min-h-[calc(100vh-73px)] flex items-center px-6 lg:px-10 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-grid-pattern opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_var(--background)_70%)]" />

        {/* Floating orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow" />
        <div
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-primary/15 rounded-full blur-3xl animate-pulse-glow"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-2 rounded-full mb-8 border border-primary/20 backdrop-blur-sm animate-fade-in-up opacity-0">
              <Sparkles className="w-4 h-4 animate-pulse" />
              Powered by Core Agentic Team
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-foreground mb-8 text-balance leading-[1.02] tracking-tight animate-fade-in-up opacity-0 delay-100">
              Build AI Agents
              <span className="block bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent mt-3 animate-gradient">
                Without the Friction
              </span>
            </h1>

            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto text-pretty leading-relaxed animate-fade-in-up opacity-0 delay-200">
              From idea to production-ready agent. Our AI Coach captures every requirement so the build team can deliver
              faster.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0 delay-300">
              <Link href="/request">
                <Button
                  size="lg"
                  className="px-10 h-14 text-base shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all hover:-translate-y-0.5 group"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Start New Request
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/request?tab=requests">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 text-base border-2 bg-background/50 backdrop-blur-sm hover:bg-background"
                >
                  View My Requests
                </Button>
              </Link>
            </div>

            {/* Stats strip */}
            <div className="mt-24 grid grid-cols-3 gap-8 max-w-3xl mx-auto pt-12 border-t border-border/50 animate-fade-in-up opacity-0 delay-500">
              <div className="group cursor-default">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform inline-block">
                  5x
                </div>
                <div className="text-sm md:text-base text-muted-foreground">Faster Delivery</div>
              </div>
              <div className="group cursor-default border-x border-border/50">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform inline-block">
                  100%
                </div>
                <div className="text-sm md:text-base text-muted-foreground">Requirements Captured</div>
              </div>
              <div className="group cursor-default">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform inline-block">
                  24/7
                </div>
                <div className="text-sm md:text-base text-muted-foreground">AI Coach Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground/60 animate-float">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
        </div>
      </section>

      {/* What is an AI Agent */}
      <section className="relative py-32 px-6 lg:px-10 bg-card border-y border-border overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-40" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-wider mb-6">
                <div className="w-8 h-px bg-primary" />
                What is an AI Agent?
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
                Software that <span className="text-primary">thinks</span>, decides, and acts
              </h2>
              <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed">
                An AI Agent is an intelligent software system that performs tasks on behalf of users. Unlike traditional
                automation, agents use AI to reason about context, adapt to changing inputs, and execute multi-step
                workflows independently.
              </p>
            </div>
            <div className="grid gap-4">
              {whatIsAgent.map((item, index) => (
                <div
                  key={item.title}
                  className="group flex items-start gap-5 p-6 rounded-2xl bg-background border border-border hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:scale-110 transition-all">
                    <item.icon className="w-6 h-6 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-1.5">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* When to Use */}
      <section className="relative py-32 px-6 lg:px-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-primary text-sm font-semibold uppercase tracking-wider mb-6">
              <div className="w-8 h-px bg-primary" />
              When to Use This System
              <div className="w-8 h-px bg-primary" />
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-[1.1] tracking-tight">
              Right problem. <span className="text-primary">Right tool.</span>
            </h2>
            <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed">
              An AI agent is the right fit when your process matches one of these patterns.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {whenToUse.map((item) => (
              <Card
                key={item.title}
                className="border-border/50 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 group hover:-translate-y-1 bg-card/50 backdrop-blur-sm"
              >
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                    <item.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                  </div>
                  <h3 className="font-semibold text-foreground text-xl mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-32 px-6 lg:px-10 bg-card border-y border-border overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Why Use This System?
            </h2>
            <p className="text-muted-foreground text-lg lg:text-xl">
              A smarter way to request and track AI agents
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit) => (
              <Card
                key={benefit.title}
                className="border-border/50 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group bg-background/80 backdrop-blur-sm hover:-translate-y-0.5"
              >
                <CardContent className="p-8">
                  <div className="flex gap-6">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary transition-all duration-300">
                      <benefit.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-xl mb-2">{benefit.title}</h3>
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
      <section className="relative py-32 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              How It Works
            </h2>
            <p className="text-muted-foreground text-lg lg:text-xl">
              Four simple steps to get your agent built
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            {steps.map((step, index) => (
              <div key={step.number} className="relative text-center group">
                <div className="relative inline-block mb-6">
                  <div className="w-20 h-20 bg-card border-2 border-border rounded-2xl flex items-center justify-center mx-auto group-hover:border-primary group-hover:bg-primary group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 relative z-10 shadow-md">
                    <span className="text-2xl font-bold text-primary group-hover:text-primary-foreground transition-colors">
                      {step.number}
                    </span>
                  </div>
                  <div className="absolute inset-0 bg-primary rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity -z-0" />
                </div>
                <h3 className="font-semibold text-foreground text-lg mb-2">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <Card className="bg-primary border-0 overflow-hidden relative group">
            {/* Animated gradients */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 to-transparent" />
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse-glow" />
            <div
              className="absolute -bottom-32 -left-32 w-80 h-80 bg-white/5 rounded-full blur-3xl animate-pulse-glow"
              style={{ animationDelay: "2s" }}
            />
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />

            <CardContent className="p-12 md:p-20 text-center relative">
              <div className="w-20 h-20 bg-white/15 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="w-10 h-10 text-primary-foreground" />
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 text-balance tracking-tight">
                Ready to request your agent?
              </h2>
              <p className="text-primary-foreground/80 mb-10 max-w-xl mx-auto text-lg lg:text-xl leading-relaxed">
                Start a conversation with our AI Coach and have your complete request submitted in minutes.
              </p>
              <Link href="/request">
                <Button
                  variant="secondary"
                  size="lg"
                  className="px-12 h-14 text-base shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5 group/btn"
                >
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Start Now
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto border-t border-border py-10 px-6 lg:px-10 bg-card">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
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
