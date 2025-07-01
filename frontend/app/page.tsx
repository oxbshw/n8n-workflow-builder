"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Loader2,
  Copy,
  CheckCircle,
  Github,
  Code2,
  Search,
  AlertCircle,
  Sparkles,
  ArrowRight,
  Play,
  Bot,
  Download,
  ExternalLink,
  Database,
  Rocket,
  Heart,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { motion, AnimatePresence } from "framer-motion"
import { WorkflowDiagram } from "@/components/workflow-diagram"

export default function Home() {
  const [prompt, setPrompt] = useState("")
  const [workflow, setWorkflow] = useState(null)
  const [similarWorkflows, setSimilarWorkflows] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [error, setError] = useState("")
  const { toast } = useToast()

  const generateWorkflow = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a workflow description",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setError("")
    setWorkflow(null)
    setSimilarWorkflows([])

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }))
        throw new Error(errorData.error || `HTTP ${response.status}: ${response.statusText}`)
      }

      const data = await response.json()
      setWorkflow(data.workflow)
      setSimilarWorkflows(data.similarWorkflows || [])

      toast({
        title: "Success",
        description: "Workflow generated successfully!",
      })
    } catch (error) {
      const errorMessage = error.message || "Failed to generate workflow. Please try again."
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async () => {
    if (workflow) {
      try {
        await navigator.clipboard.writeText(JSON.stringify(workflow, null, 2))
        setCopied(true)
        toast({
          title: "Copied",
          description: "Workflow JSON copied to clipboard",
        })
        setTimeout(() => setCopied(false), 2000)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to copy to clipboard",
          variant: "destructive",
        })
      }
    }
  }

  const downloadWorkflow = () => {
    if (workflow) {
      const blob = new Blob([JSON.stringify(workflow, null, 2)], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${workflow.name || "workflow"}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-blue-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1.3, 1, 1.3],
            rotate: [360, 180, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-1/3 left-1/3 w-80 h-80 bg-gradient-to-br from-purple-400/15 to-pink-600/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 border-b border-white/20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl sticky top-0"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <motion.div
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
                  WorkflowAI
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">AI-Powered n8n Generator</p>
              </div>
            </motion.div>
            <nav className="flex items-center space-x-8">
              <Link
                href="/library"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors font-medium text-lg"
              >
                Library
              </Link>
              <Link
                href="/stats"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors font-medium text-lg"
              >
                Analytics
              </Link>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  size="lg"
                  asChild
                  className="border-slate-200 hover:border-slate-300 bg-white/50 backdrop-blur-sm text-lg px-6"
                >
                  <Link href="https://github.com/yourusername/n8n-workflow-generator" target="_blank">
                    <Github className="w-5 h-5 mr-2" />
                    GitHub
                  </Link>
                </Button>
              </motion.div>
            </nav>
          </div>
        </div>
      </motion.header>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-32">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-full border border-blue-200/50 dark:border-blue-800/50 mb-12 backdrop-blur-sm"
            >
              <Sparkles className="w-5 h-5 text-blue-600" />
              <span className="text-lg font-semibold text-blue-700 dark:text-blue-300">Powered by AI</span>
              <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 text-sm px-3 py-1">
                Free & Open Source
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-7xl md:text-8xl font-bold mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-white dark:via-blue-100 dark:to-indigo-100 bg-clip-text text-transparent">
                Generate n8n
              </span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                Workflows with AI
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-2xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto leading-relaxed mb-16"
            >
              Transform your automation ideas into production-ready n8n workflows instantly. Just describe what you
              want, and our AI will create the perfect workflow for you.
            </motion.p>

            {/* Main Input Section */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="max-w-5xl mx-auto"
            >
              <Card className="shadow-2xl border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl overflow-hidden">
                <CardContent className="p-12">
                  <div className="space-y-8">
                    <div className="relative">
                      <Textarea
                        placeholder="Example: Create a workflow that monitors my Gmail for new emails from customers, extracts the email content, analyzes the sentiment using OpenAI, and if it's negative, creates a high-priority ticket in Jira and sends a Slack notification to the support team..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="min-h-[200px] resize-none text-xl leading-relaxed border-slate-200 dark:border-slate-700 focus:border-blue-500 dark:focus:border-blue-400 transition-colors rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm p-8 text-slate-700 dark:text-slate-200"
                      />
                      <div className="absolute bottom-6 right-6 text-lg text-slate-400 bg-white/90 dark:bg-slate-800/90 px-4 py-2 rounded-xl backdrop-blur-sm">
                        {prompt.length}/1000
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={generateWorkflow}
                        disabled={isLoading || !prompt.trim()}
                        className="w-full h-24 text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 shadow-2xl hover:shadow-3xl transition-all duration-300 rounded-2xl border-0"
                        size="lg"
                      >
                        {isLoading ? (
                          <motion.div
                            className="flex items-center gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Loader2 className="h-8 w-8 animate-spin" />
                            <span>Generating Your Workflow...</span>
                          </motion.div>
                        ) : (
                          <motion.div
                            className="flex items-center gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Sparkles className="h-8 w-8" />
                            <span>Generate Workflow with AI</span>
                            <ArrowRight className="h-8 w-8" />
                          </motion.div>
                        )}
                      </Button>
                    </motion.div>

                    {/* Error Display */}
                    <AnimatePresence>
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="flex items-center gap-4 p-8 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl backdrop-blur-sm"
                        >
                          <AlertCircle className="w-8 h-8 text-red-500 flex-shrink-0" />
                          <span className="text-lg text-red-700 dark:text-red-300">{error}</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl font-bold text-slate-900 dark:text-white mb-6">Why Choose WorkflowAI?</h2>
            <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
              The most advanced AI-powered n8n workflow generator with everything you need to automate faster.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Bot,
                title: "AI-Powered Generation",
                description:
                  "Advanced language models understand your requirements and generate production-ready workflows instantly with perfect node connections.",
                gradient: "from-blue-500 to-cyan-500",
                stats: "99.9% accuracy",
              },
              {
                icon: Database,
                title: "3,000+ Ready Workflows",
                description:
                  "Massive database of real-world workflows for similarity search and inspiration. Find the perfect starting point for any automation.",
                gradient: "from-purple-500 to-pink-500",
                stats: "3,000+ templates",
              },
              {
                icon: Rocket,
                title: "One-Click Deploy",
                description:
                  "Generated workflows are fully compatible with n8n and ready to import directly. Copy JSON or download files instantly.",
                gradient: "from-emerald-500 to-teal-500",
                stats: "< 3s generation",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.4 + index * 0.2 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group"
              >
                <Card className="h-full shadow-2xl border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl hover:shadow-3xl transition-all duration-500 rounded-3xl overflow-hidden">
                  <CardHeader className="pb-6 bg-gradient-to-br from-slate-50/50 to-slate-100/50 dark:from-slate-800/50 dark:to-slate-900/50">
                    <div
                      className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center mb-6 shadow-xl group-hover:scale-110 transition-transform duration-300`}
                    >
                      <feature.icon className="w-10 h-10 text-white" />
                    </div>
                    <CardTitle className="text-3xl mb-4">{feature.title}</CardTitle>
                    <Badge
                      variant="secondary"
                      className="w-fit bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 dark:from-blue-900/20 dark:to-indigo-900/20 dark:text-blue-300 text-lg px-4 py-2"
                    >
                      {feature.stats}
                    </Badge>
                  </CardHeader>
                  <CardContent className="p-8">
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xl">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Results Section */}
        <AnimatePresence>
          {(workflow || similarWorkflows.length > 0) && (
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.8 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32"
            >
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                {/* Generated Workflow */}
                {workflow && (
                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="lg:col-span-3 space-y-12"
                  >
                    {/* Workflow Diagram */}
                    <Card className="shadow-2xl border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-emerald-50/50 to-teal-50/50 dark:from-emerald-900/10 dark:to-teal-900/10 p-8">
                        <CardTitle className="flex items-center gap-4 text-3xl">
                          <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
                            <Play className="w-7 h-7 text-white" />
                          </div>
                          Workflow Visualization
                        </CardTitle>
                        <CardDescription className="text-xl">
                          Visual representation of your generated workflow
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <WorkflowDiagram workflow={workflow} />
                      </CardContent>
                    </Card>

                    {/* JSON Code */}
                    <Card className="shadow-2xl border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl overflow-hidden">
                      <CardHeader className="bg-gradient-to-r from-orange-50/50 to-red-50/50 dark:from-orange-900/10 dark:to-red-900/10 p-8">
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center gap-4 text-3xl">
                            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center">
                              <Code2 className="w-7 h-7 text-white" />
                            </div>
                            Generated Workflow JSON
                          </CardTitle>
                          <div className="flex gap-3">
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                variant="outline"
                                size="lg"
                                onClick={copyToClipboard}
                                className="gap-3 bg-white/70 backdrop-blur-sm border-slate-200 hover:border-slate-300 rounded-xl text-lg px-6"
                              >
                                {copied ? <CheckCircle className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                                {copied ? "Copied!" : "Copy"}
                              </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                              <Button
                                variant="outline"
                                size="lg"
                                onClick={downloadWorkflow}
                                className="gap-3 bg-white/70 backdrop-blur-sm border-slate-200 hover:border-slate-300 rounded-xl text-lg px-6"
                              >
                                <Download className="h-5 w-5" />
                                Download
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                        <CardDescription className="text-xl">Ready to import into your n8n instance</CardDescription>
                      </CardHeader>
                      <CardContent className="p-0">
                        <div className="max-h-[700px] overflow-auto">
                          <SyntaxHighlighter
                            language="json"
                            style={vscDarkPlus}
                            customStyle={{
                              margin: 0,
                              fontSize: "16px",
                              background: "transparent",
                              padding: "3rem",
                            }}
                          >
                            {JSON.stringify(workflow, null, 2)}
                          </SyntaxHighlighter>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Similar Workflows Sidebar */}
                {similarWorkflows.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className={workflow ? "" : "lg:col-span-4"}
                  >
                    <Card className="shadow-2xl border-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl h-fit rounded-3xl overflow-hidden sticky top-32">
                      <CardHeader className="bg-gradient-to-r from-violet-50/50 to-purple-50/50 dark:from-violet-900/10 dark:to-purple-900/10 p-8">
                        <CardTitle className="flex items-center gap-4 text-2xl">
                          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center">
                            <Search className="w-6 h-6 text-white" />
                          </div>
                          Similar Workflows
                        </CardTitle>
                        <CardDescription className="text-lg">
                          Found {similarWorkflows.length} related workflows
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6 p-8 max-h-[900px] overflow-y-auto">
                        {similarWorkflows.map((similarWorkflow, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            whileHover={{ scale: 1.02, y: -4 }}
                            className="p-6 border border-slate-200/50 dark:border-slate-700/50 rounded-2xl hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-all duration-200 cursor-pointer group backdrop-blur-sm bg-white/50 dark:bg-slate-800/50"
                          >
                            <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {similarWorkflow.name || `Workflow ${index + 1}`}
                            </h4>
                            <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2 leading-relaxed">
                              {similarWorkflow.description || "No description available"}
                            </p>
                            <div className="flex items-center justify-between">
                              <Badge
                                variant="secondary"
                                className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 rounded-xl text-sm px-3 py-1"
                              >
                                {similarWorkflow.nodes?.length || 0} nodes
                              </Badge>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="opacity-0 group-hover:opacity-100 transition-opacity rounded-xl text-sm"
                              >
                                <ExternalLink className="w-4 h-4 mr-2" />
                                View Details
                              </Button>
                            </div>
                          </motion.div>
                        ))}
                      </CardContent>
                    </Card>
                  </motion.div>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2 }}
        className="relative z-10 border-t border-white/20 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl mt-32"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <motion.div whileHover={{ scale: 1.05 }} className="inline-flex items-center space-x-6 mb-12">
              <Link
                href="https://github.com/yourusername/n8n-workflow-generator"
                target="_blank"
                className="flex items-center space-x-4 px-10 py-6 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-200 text-white dark:text-slate-900 rounded-2xl hover:shadow-2xl transition-all duration-300 font-semibold shadow-xl text-xl"
              >
                <Github className="w-7 h-7" />
                <span>Open Source on GitHub</span>
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white dark:bg-slate-900/20 dark:text-slate-900 rounded-xl text-lg px-4 py-2"
                >
                  Free Forever
                </Badge>
              </Link>
            </motion.div>
            <div className="flex items-center justify-center gap-3 text-2xl text-slate-600 dark:text-slate-300 mb-6">
              <span>Built with</span>
              <Heart className="w-7 h-7 text-red-500 animate-pulse" />
              <span>by</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">Sayed Allam</span>
            </div>
            <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Empowering developers worldwide with AI-powered automation tools. Join thousands of users who trust
              WorkflowAI for their n8n workflow generation needs.
            </p>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
