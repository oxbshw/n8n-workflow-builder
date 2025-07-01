const fs = require("fs")
const path = require("path")

// Simple text similarity function
function calculateSimilarity(text1, text2) {
  const words1 = text1.toLowerCase().split(/\s+/)
  const words2 = text2.toLowerCase().split(/\s+/)

  const set1 = new Set(words1)
  const set2 = new Set(words2)

  const intersection = new Set([...set1].filter((x) => set2.has(x)))
  const union = new Set([...set1, ...set2])

  return intersection.size / union.size
}

async function findSimilarWorkflows(prompt, limit = 5) {
  try {
    console.log("=== Finding Similar Workflows ===")
    console.log("Search prompt:", prompt)

    // Load workflows from JSON file
    const workflowsPath = path.join(__dirname, "..", "data", "workflows.json")

    if (!fs.existsSync(workflowsPath)) {
      console.log("Workflows file not found, creating sample data...")
      createSampleWorkflowsFile(workflowsPath)
    }

    const workflowsData = JSON.parse(fs.readFileSync(workflowsPath, "utf8"))
    const workflows = workflowsData.workflows || []

    console.log(`Loaded ${workflows.length} workflows from database`)

    if (workflows.length === 0) {
      console.log("No workflows in database, returning empty array")
      return []
    }

    // Calculate similarity scores
    const workflowsWithScores = workflows.map((workflow) => {
      const searchText = `${workflow.name || ""} ${workflow.description || ""}`.toLowerCase()
      const score = calculateSimilarity(prompt.toLowerCase(), searchText)

      return {
        ...workflow,
        similarityScore: score,
      }
    })

    // Sort by similarity score and take top results
    const similarWorkflows = workflowsWithScores
      .sort((a, b) => b.similarityScore - a.similarityScore)
      .slice(0, limit)
      .map(({ similarityScore, ...workflow }) => workflow) // Remove score from final result

    console.log(`Returning ${similarWorkflows.length} similar workflows`)
    similarWorkflows.forEach((wf, index) => {
      console.log(
        `${index + 1}. ${wf.name} (${workflowsWithScores.find((w) => w.name === wf.name)?.similarityScore?.toFixed(3)})`,
      )
    })

    return similarWorkflows
  } catch (error) {
    console.error("=== Vector Search Error ===")
    console.error("Error:", error.message)
    console.error("Stack:", error.stack)

    // Return sample workflows as fallback
    return getSampleWorkflows()
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
      {
        name: "Social Media Monitoring",
        description: "Monitor Twitter mentions and create Notion entries",
        nodes: [
          {
            parameters: {
              pollTimes: {
                item: [{ mode: "everyHour" }],
              },
            },
            id: "twitter-trigger",
            name: "Twitter Trigger",
            type: "n8n-nodes-base.twitterTrigger",
            typeVersion: 1,
            position: [240, 300],
          },
          {
            parameters: {
              operation: "create",
              databaseId: "your-database-id",
            },
            id: "notion-node",
            name: "Notion",
            type: "n8n-nodes-base.notion",
            typeVersion: 1,
            position: [460, 300],
          },
        ],
        connections: {
          "Twitter Trigger": {
            main: [
              [
                {
                  node: "Notion",
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

function getSampleWorkflows() {
  return [
    {
      name: "Email to Slack Notification",
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
            text: "New email: {{$node['Gmail Trigger'].json['subject']}}",
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
      name: "Data Processing Pipeline",
      description: "Process data and save to database",
      nodes: [
        {
          parameters: {
            httpMethod: "POST",
            path: "data-webhook",
          },
          id: "webhook-node",
          name: "Webhook",
          type: "n8n-nodes-base.webhook",
          typeVersion: 1,
          position: [240, 300],
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
          position: [460, 300],
        },
      ],
      connections: {
        Webhook: {
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
  ]
}

module.exports = { findSimilarWorkflows }
