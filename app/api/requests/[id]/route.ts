import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import type { AgentRequestsStore, StatusUpdate } from "@/lib/types"

const DATA_FILE = path.join(process.cwd(), "data", "agent-requests.json")

async function readRequests(): Promise<AgentRequestsStore> {
  const data = await fs.readFile(DATA_FILE, "utf-8")
  return JSON.parse(data)
}

async function writeRequests(store: AgentRequestsStore): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(store, null, 2))
}

// GET single request
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const store = await readRequests()
    const agentRequest = store.requests.find((r) => r.id === id)

    if (!agentRequest) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 })
    }

    return NextResponse.json(agentRequest)
  } catch (error) {
    console.error("Error reading request:", error)
    return NextResponse.json({ error: "Failed to read request" }, { status: 500 })
  }
}

// PATCH update request status
export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { status, comment, updatedBy } = body

    const store = await readRequests()
    const requestIndex = store.requests.findIndex((r) => r.id === id)

    if (requestIndex === -1) {
      return NextResponse.json({ error: "Request not found" }, { status: 404 })
    }

    const statusUpdate: StatusUpdate = {
      status,
      comment: comment || "",
      updatedBy: updatedBy || "Admin",
      updatedAt: new Date().toISOString(),
    }

    store.requests[requestIndex].status = status
    store.requests[requestIndex].statusHistory = [
      ...(store.requests[requestIndex].statusHistory || []),
      statusUpdate,
    ]
    store.lastUpdated = new Date().toISOString()

    await writeRequests(store)

    return NextResponse.json(store.requests[requestIndex])
  } catch (error) {
    console.error("Error updating request:", error)
    return NextResponse.json({ error: "Failed to update request" }, { status: 500 })
  }
}
