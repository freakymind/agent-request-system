import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const DATA_FILE = path.join(process.cwd(), "data", "agent-requests.json")

// GET export as downloadable JSON
export async function GET() {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8")
    const json = JSON.parse(data)

    return new NextResponse(JSON.stringify(json, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="agent-requests-${new Date().toISOString().split("T")[0]}.json"`,
      },
    })
  } catch {
    return new NextResponse(JSON.stringify({ requests: [], lastUpdated: new Date().toISOString() }, null, 2), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Content-Disposition": `attachment; filename="agent-requests-${new Date().toISOString().split("T")[0]}.json"`,
      },
    })
  }
}
