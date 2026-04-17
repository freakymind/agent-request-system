"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Check, ChevronLeft, ChevronRight, Bot, User, Settings, Database, Send } from "lucide-react"

const steps = [
  { id: 1, title: "Your Details", icon: User },
  { id: 2, title: "Agent Purpose", icon: Bot },
  { id: 3, title: "Process Details", icon: Settings },
  { id: 4, title: "Data & Ownership", icon: Database },
  { id: 5, title: "Review & Submit", icon: Send },
]

const departments = [
  "Retail Banking",
  "Commercial Banking",
  "Wealth Management",
  "Operations",
  "Technology",
  "Risk & Compliance",
  "Human Resources",
  "Finance",
  "Marketing",
]

const businessUnits = [
  "UK Personal Banking",
  "UK Business Banking",
  "Private Banking",
  "Corporate & Institutional",
  "Digital Services",
  "Customer Operations",
]

const journeys = [
  "Customer Onboarding",
  "Account Management",
  "Loan Processing",
  "Payment Services",
  "Customer Support",
  "Fraud Detection",
  "Compliance Monitoring",
  "Report Generation",
]

const dataSources = [
  "Customer Database",
  "Transaction History",
  "CRM System",
  "External APIs",
  "Document Management System",
  "Analytics Platform",
  "Core Banking System",
]

export function AgentRequestForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    // User details
    name: "",
    email: "",
    department: "",
    businessUnit: "",
    role: "",
    // Agent purpose
    agentDescription: "",
    journey: "",
    processDescription: "",
    // Process details
    isRegulated: "",
    tolerance: "",
    existingProcess: "",
    existingProcessDetails: "",
    // Data & ownership
    dataSources: [] as string[],
    processOwner: "",
    processOwnerEmail: "",
  })

  const updateField = (field: string, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleDataSource = (source: string) => {
    setFormData((prev) => ({
      ...prev,
      dataSources: prev.dataSources.includes(source)
        ? prev.dataSources.filter((s) => s !== source)
        : [...prev.dataSources, source],
    }))
  }

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 5))
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1))

  const handleSubmit = () => {
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-lg text-center">
          <CardContent className="pt-10 pb-10">
            <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center mb-6">
              <Check className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Request Submitted</h2>
            <p className="text-muted-foreground mb-6">
              Your agent request has been submitted successfully. The Core Agentic Team will review your request and
              contact you soon.
            </p>
            <div className="bg-muted rounded-lg p-4 text-left">
              <p className="text-sm text-muted-foreground mb-1">Request ID</p>
              <p className="font-mono font-semibold text-foreground">AGT-{Date.now().toString().slice(-8)}</p>
            </div>
            <Button className="mt-6" onClick={() => { setIsSubmitted(false); setCurrentStep(1) }}>
              Submit Another Request
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">NatWest</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Agent Request System</h1>
          <p className="text-muted-foreground">Request a new AI agent for your team</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === step.id
              const isCompleted = currentStep > step.id
              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                        isCompleted
                          ? "bg-primary text-primary-foreground"
                          : isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <span
                      className={`text-xs mt-2 hidden sm:block ${
                        isActive || isCompleted ? "text-foreground font-medium" : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-12 sm:w-20 h-0.5 mx-2 ${
                        currentStep > step.id ? "bg-primary" : "bg-border"
                      }`}
                    />
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-lg border-border">
          <CardHeader className="border-b border-border">
            <CardTitle className="text-foreground">{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>
              {currentStep === 1 && "Tell us about yourself"}
              {currentStep === 2 && "Describe what you want the agent to do"}
              {currentStep === 3 && "Provide details about the process"}
              {currentStep === 4 && "Specify data sources and ownership"}
              {currentStep === 5 && "Review your request before submitting"}
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            {/* Step 1: User Details */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => updateField("name", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@natwest.com"
                      value={formData.email}
                      onChange={(e) => updateField("email", e.target.value)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select value={formData.department} onValueChange={(v) => updateField("department", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map((dept) => (
                          <SelectItem key={dept} value={dept}>
                            {dept}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bu">Business Unit</Label>
                    <Select value={formData.businessUnit} onValueChange={(v) => updateField("businessUnit", v)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select business unit" />
                      </SelectTrigger>
                      <SelectContent>
                        {businessUnits.map((bu) => (
                          <SelectItem key={bu} value={bu}>
                            {bu}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Your Role</Label>
                  <Input
                    id="role"
                    placeholder="e.g., Product Manager, Team Lead"
                    value={formData.role}
                    onChange={(e) => updateField("role", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Agent Purpose */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="agentDescription">What do you want the agent to do?</Label>
                  <Textarea
                    id="agentDescription"
                    placeholder="Describe the tasks and goals for this agent..."
                    className="min-h-[120px]"
                    value={formData.agentDescription}
                    onChange={(e) => updateField("agentDescription", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="journey">Which journey can this integrate with?</Label>
                  <Select value={formData.journey} onValueChange={(v) => updateField("journey", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a journey" />
                    </SelectTrigger>
                    <SelectContent>
                      {journeys.map((journey) => (
                        <SelectItem key={journey} value={journey}>
                          {journey}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="processDescription">What process will the agent perform?</Label>
                  <Textarea
                    id="processDescription"
                    placeholder="Describe the specific process or workflow..."
                    className="min-h-[100px]"
                    value={formData.processDescription}
                    onChange={(e) => updateField("processDescription", e.target.value)}
                  />
                </div>
              </div>
            )}

            {/* Step 3: Process Details */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Is this a regulated process?</Label>
                  <RadioGroup value={formData.isRegulated} onValueChange={(v) => updateField("isRegulated", v)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="regulated-yes" />
                      <Label htmlFor="regulated-yes" className="font-normal">Yes, this involves regulatory requirements</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="regulated-no" />
                      <Label htmlFor="regulated-no" className="font-normal">No, this is not regulated</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="unsure" id="regulated-unsure" />
                      <Label htmlFor="regulated-unsure" className="font-normal">Not sure</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tolerance">What is the error tolerance for this agent?</Label>
                  <Select value={formData.tolerance} onValueChange={(v) => updateField("tolerance", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tolerance level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zero">Zero tolerance - Must be 100% accurate</SelectItem>
                      <SelectItem value="low">Low tolerance - Minimal errors acceptable</SelectItem>
                      <SelectItem value="medium">Medium tolerance - Some errors acceptable with review</SelectItem>
                      <SelectItem value="high">High tolerance - Human review always applied</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label>Is there an existing process you want to change?</Label>
                  <RadioGroup value={formData.existingProcess} onValueChange={(v) => updateField("existingProcess", v)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="yes" id="existing-yes" />
                      <Label htmlFor="existing-yes" className="font-normal">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="existing-no" />
                      <Label htmlFor="existing-no" className="font-normal">No, this is a new process</Label>
                    </div>
                  </RadioGroup>
                </div>
                {formData.existingProcess === "yes" && (
                  <div className="space-y-2">
                    <Label htmlFor="existingProcessDetails">Describe the existing process</Label>
                    <Textarea
                      id="existingProcessDetails"
                      placeholder="What is the current process and what changes are needed?"
                      className="min-h-[100px]"
                      value={formData.existingProcessDetails}
                      onChange={(e) => updateField("existingProcessDetails", e.target.value)}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Step 4: Data & Ownership */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label>Which data sources should the agent pull from?</Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {dataSources.map((source) => (
                      <div
                        key={source}
                        onClick={() => toggleDataSource(source)}
                        className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                          formData.dataSources.includes(source)
                            ? "border-primary bg-primary/10 text-foreground"
                            : "border-border bg-card text-muted-foreground hover:border-primary/50"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center ${
                              formData.dataSources.includes(source)
                                ? "bg-primary border-primary"
                                : "border-border"
                            }`}
                          >
                            {formData.dataSources.includes(source) && (
                              <Check className="w-3 h-3 text-primary-foreground" />
                            )}
                          </div>
                          <span className="text-sm">{source}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="processOwner">Process Owner Name</Label>
                    <Input
                      id="processOwner"
                      placeholder="Who owns the process?"
                      value={formData.processOwner}
                      onChange={(e) => updateField("processOwner", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="processOwnerEmail">Process Owner Email</Label>
                    <Input
                      id="processOwnerEmail"
                      type="email"
                      placeholder="owner@natwest.com"
                      value={formData.processOwnerEmail}
                      onChange={(e) => updateField("processOwnerEmail", e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Review */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Requestor</h4>
                      <p className="text-foreground">{formData.name || "—"}</p>
                      <p className="text-sm text-muted-foreground">{formData.email || "—"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Department / BU</h4>
                      <p className="text-foreground">{formData.department || "—"} / {formData.businessUnit || "—"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Role</h4>
                      <p className="text-foreground">{formData.role || "—"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Journey</h4>
                      <p className="text-foreground">{formData.journey || "—"}</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Regulated</h4>
                      <p className="text-foreground capitalize">{formData.isRegulated || "—"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Error Tolerance</h4>
                      <p className="text-foreground capitalize">{formData.tolerance || "—"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Process Owner</h4>
                      <p className="text-foreground">{formData.processOwner || "—"}</p>
                      <p className="text-sm text-muted-foreground">{formData.processOwnerEmail || "—"}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-1">Data Sources</h4>
                      <p className="text-foreground">{formData.dataSources.length > 0 ? formData.dataSources.join(", ") : "—"}</p>
                    </div>
                  </div>
                </div>
                <div className="border-t border-border pt-4">
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Agent Description</h4>
                  <p className="text-foreground">{formData.agentDescription || "—"}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Process Description</h4>
                  <p className="text-foreground">{formData.processDescription || "—"}</p>
                </div>
                {formData.existingProcess === "yes" && formData.existingProcessDetails && (
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Existing Process Changes</h4>
                    <p className="text-foreground">{formData.existingProcessDetails}</p>
                  </div>
                )}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-border">
              <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              {currentStep < 5 ? (
                <Button onClick={nextStep}>
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit}>
                  <Send className="w-4 h-4 mr-2" />
                  Submit Request
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
