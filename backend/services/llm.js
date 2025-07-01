const axios = require("axios")

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"

async function generateWorkflow(prompt, similarWorkflows) {
  try {
    console.log("=== LLM Generation Started ===")
    console.log("Prompt:", prompt)
    console.log("Similar workflows count:", similarWorkflows.length)

    const systemPrompt = createSystemPrompt(similarWorkflows)
    const userPrompt = `Generate a valid n8n JSON workflow for: ${prompt}`

    console.log("Making request to OpenRouter API...")

    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: "mistralai/mistral-7b-instruct",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
          {
            role: "user",
            content: userPrompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": process.env.HTTP_REFERER || "http://localhost:3000",
          "X-Title": "n8n Workflow Generator",
        },
        timeout: 30000, // 30 second timeout
      },
    )

    console.log("OpenRouter API response received")
    const generatedText = response.data.choices[0].message.content
    console.log("Generated text length:", generatedText.length)

    // Try to extract JSON from the response
    let workflow
    try {
      // First try to parse the entire response as JSON
      workflow = JSON.parse(generatedText)
    } catch (e) {
      // If that fails, try to extract JSON from the response
      const jsonMatch = generatedText.match(/\{[\s\S]*\}/)
      if (!jsonMatch) {
        throw new Error("No valid JSON found in LLM response")
      }
      workflow = JSON.parse(jsonMatch[0])
    }

    // Validate basic n8n workflow structure
    if (!workflow.nodes || !Array.isArray(workflow.nodes)) {
      console.log("Invalid workflow structure, using fallback")
      workflow = createFallbackWorkflow(prompt)
    }

    // Ensure required fields
    workflow.name = workflow.name || "Generated Workflow"
    workflow.active = workflow.active !== undefined ? workflow.active : false
    workflow.settings = workflow.settings || {}
    workflow.connections = workflow.connections || {}

    console.log("Workflow validation successful")
    return workflow
  } catch (error) {
    console.error("=== LLM Generation Error ===")
    console.error("Error type:", error.constructor.name)
    console.error("Error message:", error.message)

    if (error.response) {
      console.error("API Response status:", error.response.status)
      console.error("API Response data:", error.response.data)
    }

    // Return fallback workflow instead of throwing
    console.log("Returning fallback workflow due to error")
    return createFallbackWorkflow(prompt)
  }
}

function createSystemPrompt(similarWorkflows) {
  const examplesText =
    similarWorkflows.length > 0
      ? similarWorkflows
          .map(
            (wf, index) => `Example ${index + 1}:
${JSON.stringify(wf, null, 2)}`,
          )
          .join("\n\n")
      : "No similar workflows found."

  return `You are an expert n8n workflow engineer. Your task is to generate valid n8n JSON workflows.

Here are some similar workflows for reference:

${examplesText}

Important guidelines:
- Output ONLY a single valid JSON object (no explanations or markdown)
- Include required fields: name, nodes, connections, active, settings
- Each node must have: id, name, type, position, parameters
- Use realistic node types like: n8n-nodes-base.start, n8n-nodes-base.webhook, n8n-nodes-base.gmail, n8n-nodes-base.slack, etc.
- Include proper connections between nodes
- Set reasonable position coordinates for nodes (e.g., [240, 300], [460, 300], etc.)
- Make the workflow functional and production-ready
- Ensure all node IDs are unique
- Use proper parameter structures for each node type

Generate a complete, valid n8n workflow JSON that accomplishes the user's request.`
}

function createFallbackWorkflow(prompt) {
  console.log("Creating fallback workflow for prompt:", prompt)

  return {
    name: "Generated Workflow",
    nodes: [
      {
        parameters: {},
        id: "start-node",
        name: "Start",
        type: "n8n-nodes-base.start",
        typeVersion: 1,
        position: [240, 300],
      },
      {
        parameters: {
          httpMethod: "POST",
          path: "webhook",
          responseMode: "onReceived",
          options: {},
        },
        id: "webhook-node",
        name: "Webhook",
        type: "n8n-nodes-base.webhook",
        typeVersion: 1,
        position: [460, 300],
        webhookId: "generated-webhook",
      },
      {
        parameters: {
          values: {
            string: [
              {
                name: "prompt",
                value: prompt,
              },
              {
                name: "status",
                value: "generated",
              },
            ],
          },
          options: {},
        },
        id: "set-node",
        name: "Set Data",
        type: "n8n-nodes-base.set",
        typeVersion: 1,
        position: [680, 300],
      },
    ],
    connections: {
      Start: {
        main: [
          [
            {
              node: "Webhook",
              type: "main",
              index: 0,
            },
          ],
        ],
      },
      Webhook: {
        main: [
          [
            {
              node: "Set Data",
              type: "main",
              index: 0,
            },
          ],
        ],
      },
    },
    active: false,
    settings: {},
    id: "generated-workflow-" + Date.now(),
  }
}

module.exports = { generateWorkflow }
