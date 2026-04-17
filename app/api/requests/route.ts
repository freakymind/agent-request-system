import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"
import type { AgentRequest, AgentRequestsStore } from "@/lib/types"

const DATA_FILE = path.join(process.cwd(), "data", "agent-requests.json")

async function ensureDataFile() {
  const dir = path.dirname(DATA_FILE)
  try {
    await fs.mkdir(dir, { recursive: true })
  } catch {}
  try {
    await fs.access(DATA_FILE)
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify({ requests: [], lastUpdated: new Date().toISOString() }))
  }
}

async function readRequests(): Promise<AgentRequestsStore> {
  await ensureDataFile()
  const data = await fs.readFile(DATA_FILE, "utf-8")
  return JSON.parse(data)
}

async function writeRequests(store: AgentRequestsStore): Promise<void> {
  await ensureDataFile()
  await fs.writeFile(DATA_FILE, JSON.stringify(store, null, 2))
}

// GET all requests
export async function GET() {
  try {
    const store = await readRequests()
    return NextResponse.json(store)
  } catch (error) {
    console.error("Error reading requests:", error)
    return NextResponse.json({ requests: [], lastUpdated: new Date().toISOString() })
  }
}

// POST new request
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const store = await readRequests()

    const newRequest: AgentRequest = {
      ...body,
      id: `AGT-${Date.now().toString().slice(-8)}`,
      status: "pending",
      createdAt: new Date().toISOString(),
    }

    store.requests.unshift(newRequest)
    store.lastUpdated = new Date().toISOString()

    await writeRequests(store)

    return NextResponse.json(newRequest, { status: 201 })
  } catch (error) {
    console.error("Error saving request:", error)
    return NextResponse.json({ error: "Failed to save request" }, { status: 500 })
  }
}
