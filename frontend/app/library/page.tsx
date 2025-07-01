"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, ArrowLeft, Code2, Eye, Github, Zap } from "lucide-react"
import Link from "next/link"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"

export default function Library() {
  const [searchQuery, setSearchQuery] = useState("")
  const [workflows, setWorkflows] = useState([])
  const [filteredWorkflows, setFilteredWorkflows] = useState([])
  const [expandedWorkflow, setExpandedWorkflow] = useState(null)

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockWorkflows = [
      {
        id: 1,
        name: "Gmail to Slack Notification",
        description: "Automatically send Slack notifications when new emails arrive in Gmail",
        nodes: 3,
        tags: ["email", "slack", "notification"],
        workflow: {
          name: "Gmail to Slack",
          nodes: [
            {
              id: "gmail-trigger",
              name: "Gmail Trigger",
              type: "n8n-nodes-base.gmailTrigger",
            },
          ],
        },
      },
      {
        id: 2,
        name: "CSV Data Processing",
        description: "Process CSV files and save results to Google Sheets",
        nodes: 4,
        tags: ["csv", "data", "google-sheets"],
        workflow: {
          name: "CSV Processing",
          nodes: [
            {
              id: "webhook",
              name: "Webhook",
              type: "n8n-nodes-base.webhook",
            },
          ],
        },
      },
      {
        id: 3,
        name: "Social Media Monitor",
        description: "Monitor Twitter mentions and create Notion database entries",
        nodes: 5,
        tags: ["twitter", "notion", "monitoring"],
        workflow: {
          name: "Social Monitor",
          nodes: [],
        },
      },
      {
        id: 4,
        name: "E-commerce Order Processing",
        description: "Process new orders from Shopify and update inventory",
        nodes: 6,
        tags: ["shopify", "ecommerce", "inventory"],
        workflow: {
          name: "Order Processing",
          nodes: [],
        },
      },
      {
        id: 5,
        name: "Lead Scoring Automation",
        description: "Score leads from HubSpot and trigger follow-up actions",
        nodes: 4,
        tags: ["hubspot", "crm", "leads"],
        workflow: {
          name: "Lead Scoring",
          nodes: [],
        },
      },
    ]
    setWorkflows(mockWorkflows)
    setFilteredWorkflows(mockWorkflows)
  }, [])

  useEffect(() => {
    const filtered = workflows.filter(
      (workflow) =>
        workflow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workflow.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        workflow.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
    )
    setFilteredWorkflows(filtered)
  }, [searchQuery, workflows])

  const toggleExpanded = (workflowId) => {
    setExpandedWorkflow(expandedWorkflow === workflowId ? null : workflowId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Open Source Workflow Generator</h1>
            </div>
            <nav className="flex items-center space-x-6">
              <Link
                href="/"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                Home
              </Link>
              <Link
                href="/stats"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                Stats
              </Link>
              <Button variant="outline" size="sm" asChild>
                <Link href="https://github.com/yourusername/n8n-workflow-generator" target="_blank">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Generator
            </Button>
          </Link>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Workflow Library</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">Browse our collection of pre-built n8n workflows</p>
        </div>

        {/* Search */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search workflows..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-slate-600 dark:text-slate-300">
            Showing {filteredWorkflows.length} of {workflows.length} workflows
          </p>
        </div>

        {/* Workflow Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkflows.map((workflow) => (
            <Card key={workflow.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg mb-2">{workflow.name}</CardTitle>
                    <CardDescription className="text-sm">{workflow.description}</CardDescription>
                  </div>
                  <Badge variant="secondary">{workflow.nodes} nodes</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {workflow.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => toggleExpanded(workflow.id)} className="flex-1">
                      <Eye className="w-4 h-4 mr-2" />
                      {expandedWorkflow === workflow.id ? "Hide JSON" : "Preview JSON"}
                    </Button>
                    <Button variant="outline" size="sm">
                      <Code2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Expanded JSON */}
                  {expandedWorkflow === workflow.id && (
                    <div className="mt-4">
                      <div className="rounded-lg overflow-hidden border">
                        <SyntaxHighlighter
                          language="json"
                          style={vscDarkPlus}
                          customStyle={{
                            margin: 0,
                            maxHeight: "300px",
                            fontSize: "12px",
                          }}
                        >
                          {JSON.stringify(workflow.workflow, null, 2)}
                        </SyntaxHighlighter>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredWorkflows.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">No workflows found</h3>
              <p className="text-slate-600 dark:text-slate-300">
                Try adjusting your search terms or browse all workflows
              </p>
            </CardContent>
          </Card>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-center space-x-6">
            <Link
              href="https://github.com/yourusername/n8n-workflow-generator"
              target="_blank"
              className="flex items-center space-x-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>Open Source on GitHub</span>
            </Link>
          </div>
          <div className="text-center text-sm text-slate-500 dark:text-slate-400 mt-4">
            Built with ❤️ for the automation community
          </div>
        </div>
      </footer>
    </div>
  )
}
