const { ChromaClient } = require("chromadb")
const fs = require("fs")
const path = require("path")

async function buildEmbeddings() {
  try {
    console.log("Starting embedding build process...")

    // Initialize Chroma client
    const client = new ChromaClient({
      path: process.env.CHROMA_URL || "http://localhost:8000",
    })

    // Delete existing collection if it exists
    try {
      await client.deleteCollection({ name: "n8n_workflows" })
      console.log("Deleted existing collection")
    } catch (error) {
      console.log("No existing collection to delete")
    }

    // Create new collection
    const collection = await client.createCollection({
      name: "n8n_workflows",
      metadata: { description: "n8n workflow embeddings" },
    })

    // Load workflows from JSON file
    const workflowsPath = path.join(__dirname, "..", "data", "workflows.json")

    if (!fs.existsSync(workflowsPath)) {
      console.log("Creating sample workflows.json file...")
      createSampleWorkflowsFile(workflowsPath)
    }

    const workflowsData = JSON.parse(fs.readFileSync(workflowsPath, "utf8"))
    const workflows = workflowsData.workflows || []

    console.log(`Processing ${workflows.length} workflows...`)

    // Process workflows in batches
    const batchSize = 100
    for (let i = 0; i < workflows.length; i += batchSize) {
      const batch = workflows.slice(i, i + batchSize)

      const documents = batch.map((workflow) => JSON.stringify(workflow))
      const metadatas = batch.map((workflow, index) => ({
        id: `workflow_${i + index}`,
        name: workflow.name || `Workflow ${i + index}`,
        nodeCount: workflow.nodes ? workflow.nodes.length : 0,
      }))
      const ids = batch.map((_, index) => `workflow_${i + index}`)

      await collection.add({
        documents,
        metadatas,
        ids,
      })

      console.log(`Processed batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(workflows.length / batchSize)}`)
    }

    console.log("Embedding build completed successfully!")
  } catch (error) {
    console.error("Error building embeddings:", error)
    process.exit(1)
  }
}

function createSampleWorkflowsFile(filePath) {
  const sampleWorkflows = {
    workflows: [
      {
        name: "Gmail to Slack Notification",
        description: "Send Slack notifications for new Gmail messages",
        nodes: [
          {
            parameters: {
              pollTimes: {
                item: [{ mode: "everyMinute" }],
              },
            },
            id: "gmail-trigger",
            name: "Gmail Trigger",
            type: "n8n-nodes-base.gmailTrigger",
            typeVersion: 1,
            position: [240, 300],
          },
          {
            parameters: {
              channel: "#general",
              text: "New email from {{$node['Gmail Trigger'].json['from']}} - {{$node['Gmail Trigger'].json['subject']}}",
            },
            id: "slack-node",
            name: "Slack",
            type: "n8n-nodes-base.slack",
            typeVersion: 1,
            position: [460, 300],
          },
        ],
        connections: {
          "Gmail Trigger": {
            main: [
              [
                {
                  node: "Slack",
                  type: "main",
                  index: 0,
                },
              ],
            ],
          },
        },
      },
      {
        name: "CSV Data Processing",
        description: "Process CSV files and save to Google Sheets",
        nodes: [
          {
            parameters: {
              httpMethod: "POST",
              path: "csv-upload",
            },
            id: "webhook-node",
            name: "Webhook",
            type: "n8n-nodes-base.webhook",
            typeVersion: 1,
            position: [240, 300],
          },
          {
            parameters: {
              operation: "toFile",
              fileFormat: "csv",
            },
            id: "csv-node",
            name: "Read CSV",
            type: "n8n-nodes-base.readBinaryFile",
            typeVersion: 1,
            position: [460, 300],
          },
          {
            parameters: {
              operation: "append",
              documentId: "your-sheet-id",
            },
            id: "sheets-node",
            name: "Google Sheets",
            type: "n8n-nodes-base.googleSheets",
            typeVersion: 1,
            position: [680, 300],
          },
        ],
        connections: {
          Webhook: {
            main: [
              [
                {
                  node: "Read CSV",
                  type: "main",
                  index: 0,
                },
              ],
            ],
          },
          "Read CSV": {
            main: [
              [
                {
                  node: "Google Sheets",
                  type: "main",
                  index: 0,
                },
              ],
            ],
          },
        },
      },
    ],
  }

  // Ensure directory exists
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(filePath, JSON.stringify(sampleWorkflows, null, 2))
  console.log(`Created sample workflows file at ${filePath}`)
}

// Run if called directly
if (require.main === module) {
  buildEmbeddings()
}

module.exports = { buildEmbeddings }
