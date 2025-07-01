const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const { generateWorkflow } = require("./services/llm")
const { findSimilarWorkflows } = require("./services/vector")

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://your-domain.vercel.app"]
        : ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
  }),
)
app.use(express.json({ limit: "10mb" }))
app.use(express.urlencoded({ extended: true }))

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  if (req.body && Object.keys(req.body).length > 0) {
    console.log("Request body:", JSON.stringify(req.body, null, 2))
  }
  next()
})

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    env: {
      nodeEnv: process.env.NODE_ENV,
      hasOpenRouterKey: !!process.env.OPENROUTER_API_KEY,
      port: PORT,
    },
  })
})

// Main workflow generation endpoint
app.post("/api/generate", async (req, res) => {
  try {
    console.log("=== Workflow Generation Request ===")
    const { prompt } = req.body

    // Validate input
    if (!prompt || typeof prompt !== "string" || !prompt.trim()) {
      console.log("Invalid prompt received:", prompt)
      return res.status(400).json({
        error: "Invalid prompt. Please provide a valid non-empty string.",
      })
    }

    const trimmedPrompt = prompt.trim()
    console.log("Processing prompt:", trimmedPrompt)

    // Check for OpenRouter API key
    if (!process.env.OPENROUTER_API_KEY) {
      console.error("OPENROUTER_API_KEY not found in environment variables")
      return res.status(500).json({
        error: "Server configuration error: Missing API key",
      })
    }

    // Step 1: Find similar workflows using vector search
    console.log("Finding similar workflows...")
    const similarWorkflows = await findSimilarWorkflows(trimmedPrompt)
    console.log(`Found ${similarWorkflows.length} similar workflows`)

    // Step 2: Generate workflow using LLM
    console.log("Generating workflow with LLM...")
    const workflow = await generateWorkflow(trimmedPrompt, similarWorkflows)
    console.log("Workflow generated successfully")

    // Step 3: Return response
    const response = {
      workflow,
      similarWorkflows,
      similarWorkflowsCount: similarWorkflows.length,
      timestamp: new Date().toISOString(),
    }

    console.log("Sending response with workflow and", similarWorkflows.length, "similar workflows")
    res.json(response)
  } catch (error) {
    console.error("=== Error generating workflow ===")
    console.error("Error details:", error)
    console.error("Stack trace:", error.stack)

    res.status(500).json({
      error: "Failed to generate workflow",
      details: error.message,
      timestamp: new Date().toISOString(),
    })
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("=== Unhandled Error ===")
  console.error("Error:", err)
  console.error("Stack:", err.stack)

  res.status(500).json({
    error: "Internal server error",
    details: err.message,
    timestamp: new Date().toISOString(),
  })
})

// 404 handler
app.use((req, res) => {
  console.log("404 - Route not found:", req.method, req.path)
  res.status(404).json({
    error: "Route not found",
    path: req.path,
    method: req.method,
  })
})

app.listen(PORT, () => {
  console.log("=== Server Started ===")
  console.log(`Server running on port ${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/health`)
  console.log(`API endpoint: http://localhost:${PORT}/api/generate`)
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`)
  console.log(`OpenRouter API Key: ${process.env.OPENROUTER_API_KEY ? "Present" : "Missing"}`)
})
