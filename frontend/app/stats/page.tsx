"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Users, Zap, Clock, Github, BarChart3 } from "lucide-react"
import Link from "next/link"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export default function Stats() {
  const [stats, setStats] = useState({
    totalWorkflows: 1247,
    totalGenerated: 8934,
    totalUsers: 2341,
    avgGenerationTime: 3.2,
  })

  const nodeTypeData = [
    { name: "Gmail", count: 456, percentage: 18.2 },
    { name: "Slack", count: 389, percentage: 15.5 },
    { name: "Webhook", count: 334, percentage: 13.3 },
    { name: "Google Sheets", count: 298, percentage: 11.9 },
    { name: "HTTP Request", count: 267, percentage: 10.7 },
    { name: "Notion", count: 234, percentage: 9.3 },
    { name: "Airtable", count: 189, percentage: 7.5 },
    { name: "Discord", count: 156, percentage: 6.2 },
  ]

  const workflowCategoryData = [
    { name: "Email Automation", value: 26, color: "#3b82f6" },
    { name: "Data Processing", value: 22, color: "#10b981" },
    { name: "Social Media", value: 18, color: "#8b5cf6" },
    { name: "CRM Integration", value: 15, color: "#f59e0b" },
    { name: "File Management", value: 12, color: "#ef4444" },
    { name: "Other", value: 7, color: "#6b7280" },
  ]

  const generationTrendData = [
    { month: "Jan", workflows: 234 },
    { month: "Feb", workflows: 345 },
    { month: "Mar", workflows: 456 },
    { month: "Apr", workflows: 567 },
    { month: "May", workflows: 678 },
    { month: "Jun", workflows: 789 },
  ]

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
                href="/library"
                className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white transition-colors"
              >
                Library
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
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Platform Statistics</h2>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            Real-time insights into workflow generation and usage patterns
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Workflows Generated</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalGenerated.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+23%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Workflows in Library</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalWorkflows.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+12%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+8%</span> from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Generation Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.avgGenerationTime}s</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">-0.8s</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Most Popular Node Types */}
          <Card>
            <CardHeader>
              <CardTitle>Most Popular Node Types</CardTitle>
              <CardDescription>Top integrations used in generated workflows</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={nodeTypeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Workflow Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Workflow Categories</CardTitle>
              <CardDescription>Distribution of generated workflow types</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={workflowCategoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {workflowCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Generation Trend */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Workflow Generation Trend</CardTitle>
            <CardDescription>Monthly workflow generation over the past 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={generationTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="workflows" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest workflow generations and system updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { time: "2 minutes ago", action: "Workflow generated", details: "Email to Slack notification system" },
                {
                  time: "5 minutes ago",
                  action: "Workflow generated",
                  details: "Google Sheets data processing pipeline",
                },
                {
                  time: "8 minutes ago",
                  action: "System update",
                  details: "Vector database refreshed with 50 new workflows",
                },
                {
                  time: "12 minutes ago",
                  action: "Workflow generated",
                  details: "Twitter automation for content creators",
                },
                {
                  time: "15 minutes ago",
                  action: "Workflow generated",
                  details: "CRM lead scoring and notification system",
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 pb-3 border-b border-slate-100 last:border-b-0">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-sm">{activity.action}</span>
                      <span className="text-xs text-slate-500">{activity.time}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">{activity.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
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
