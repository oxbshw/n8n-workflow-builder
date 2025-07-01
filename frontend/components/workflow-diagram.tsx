"use client"

import { motion } from "framer-motion"
import {
  ArrowRight,
  Play,
  Zap,
  Mail,
  MessageSquare,
  Database,
  Webhook,
  Settings,
  Globe,
  Calendar,
  Code,
  FileText,
  Bell,
  Cloud,
  Shield,
} from "lucide-react"

interface WorkflowDiagramProps {
  workflow: any
}

export function WorkflowDiagram({ workflow }: WorkflowDiagramProps) {
  // Extract nodes from workflow
  const nodes = workflow?.nodes || []

  // Map node types to icons and colors
  const getNodeIcon = (nodeType: string) => {
    if (nodeType.includes("gmail")) return Mail
    if (nodeType.includes("slack")) return MessageSquare
    if (nodeType.includes("webhook")) return Webhook
    if (nodeType.includes("database") || nodeType.includes("sheets")) return Database
    if (nodeType.includes("start")) return Play
    if (nodeType.includes("http")) return Globe
    if (nodeType.includes("schedule")) return Calendar
    if (nodeType.includes("code")) return Code
    if (nodeType.includes("set")) return FileText
    if (nodeType.includes("notification")) return Bell
    if (nodeType.includes("cloud")) return Cloud
    if (nodeType.includes("security")) return Shield
    return Settings
  }

  const getNodeColor = (nodeType: string) => {
    if (nodeType.includes("gmail")) return "from-red-500 to-red-600"
    if (nodeType.includes("slack")) return "from-purple-500 to-purple-600"
    if (nodeType.includes("webhook")) return "from-blue-500 to-blue-600"
    if (nodeType.includes("database") || nodeType.includes("sheets")) return "from-green-500 to-green-600"
    if (nodeType.includes("start")) return "from-emerald-500 to-emerald-600"
    if (nodeType.includes("http")) return "from-orange-500 to-orange-600"
    if (nodeType.includes("schedule")) return "from-indigo-500 to-indigo-600"
    if (nodeType.includes("code")) return "from-yellow-500 to-yellow-600"
    if (nodeType.includes("set")) return "from-cyan-500 to-cyan-600"
    if (nodeType.includes("notification")) return "from-pink-500 to-pink-600"
    if (nodeType.includes("cloud")) return "from-sky-500 to-sky-600"
    if (nodeType.includes("security")) return "from-violet-500 to-violet-600"
    return "from-slate-500 to-slate-600"
  }

  // Limit to first 6 nodes for display
  const displayNodes = nodes.slice(0, 6)

  if (displayNodes.length === 0) {
    return (
      <div className="flex items-center justify-center h-80 text-slate-500 dark:text-slate-400 p-16">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-3xl flex items-center justify-center"
          >
            <Zap className="w-12 h-12 opacity-50" />
          </motion.div>
          <h3 className="text-3xl font-bold mb-4">Workflow Visualization</h3>
          <p className="text-xl opacity-75">Generate a workflow to see the visual representation</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="p-16 bg-gradient-to-br from-slate-50/50 to-blue-50/30 dark:from-slate-800/50 dark:to-slate-900/50">
      <div className="flex items-center justify-center space-x-12 overflow-x-auto pb-8">
        {displayNodes.map((node, index) => {
          const Icon = getNodeIcon(node.type || "")
          const colorClass = getNodeColor(node.type || "")

          return (
            <motion.div
              key={node.id || index}
              initial={{ opacity: 0, scale: 0.8, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.25 }}
              className="flex items-center"
            >
              {/* Node */}
              <motion.div
                whileHover={{ scale: 1.15, y: -12 }}
                className="flex flex-col items-center space-y-6 min-w-[180px] group"
              >
                <div
                  className={`w-24 h-24 bg-gradient-to-br ${colorClass} rounded-3xl flex items-center justify-center shadow-2xl shadow-black/20 group-hover:shadow-3xl transition-all duration-500 border-4 border-white/60 dark:border-slate-800/60`}
                >
                  <Icon className="w-12 h-12 text-white" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-slate-900 dark:text-white truncate max-w-[160px] mb-3">
                    {node.name || `Node ${index + 1}`}
                  </p>
                  <p className="text-base text-slate-500 dark:text-slate-400 truncate max-w-[160px] bg-white/80 dark:bg-slate-800/80 px-4 py-2 rounded-xl backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60">
                    {node.type?.split(".").pop() || "Unknown"}
                  </p>
                </div>
              </motion.div>

              {/* Arrow */}
              {index < displayNodes.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.25 + 0.5 }}
                  className="mx-12"
                >
                  <motion.div
                    animate={{ x: [0, 12, 0] }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="flex items-center"
                  >
                    <div className="w-16 h-1.5 bg-gradient-to-r from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-500 rounded-full"></div>
                    <ArrowRight className="w-8 h-8 text-slate-400 -ml-3" />
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          )
        })}

        {/* Show more indicator if there are more nodes */}
        {nodes.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2 }}
            className="flex items-center space-x-4 text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-800/80 px-8 py-6 rounded-3xl backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60"
          >
            <div className="flex space-x-2">
              <div className="w-4 h-4 bg-slate-300 rounded-full animate-pulse"></div>
              <div className="w-4 h-4 bg-slate-300 rounded-full animate-pulse" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-4 h-4 bg-slate-300 rounded-full animate-pulse" style={{ animationDelay: "0.4s" }}></div>
            </div>
            <span className="text-lg font-bold">+{nodes.length - 6} more nodes</span>
          </motion.div>
        )}
      </div>

      {/* Workflow Stats */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
        className="mt-16 flex justify-center space-x-16 text-lg text-slate-600 dark:text-slate-300"
      >
        <motion.div
          className="flex items-center space-x-4 bg-white/80 dark:bg-slate-800/80 px-8 py-6 rounded-2xl backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60"
          whileHover={{ scale: 1.05, y: -4 }}
        >
          <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm"></div>
          <span className="font-bold">{nodes.length} nodes</span>
        </motion.div>
        <motion.div
          className="flex items-center space-x-4 bg-white/80 dark:bg-slate-800/80 px-8 py-6 rounded-2xl backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60"
          whileHover={{ scale: 1.05, y: -4 }}
        >
          <div className="w-5 h-5 bg-gradient-to-r from-green-500 to-green-600 rounded-full shadow-sm"></div>
          <span className="font-bold">{Object.keys(workflow?.connections || {}).length} connections</span>
        </motion.div>
        <motion.div
          className="flex items-center space-x-4 bg-white/80 dark:bg-slate-800/80 px-8 py-6 rounded-2xl backdrop-blur-sm border border-slate-200/60 dark:border-slate-700/60"
          whileHover={{ scale: 1.05, y: -4 }}
        >
          <div
            className={`w-5 h-5 ${workflow?.active ? "bg-gradient-to-r from-emerald-500 to-emerald-600" : "bg-gradient-to-r from-slate-400 to-slate-500"} rounded-full shadow-sm`}
          ></div>
          <span className="font-bold">{workflow?.active ? "Active" : "Inactive"}</span>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default WorkflowDiagram
