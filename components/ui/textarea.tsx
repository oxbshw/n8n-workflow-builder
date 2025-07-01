import * as React from "react"
import { cn } from "@/lib/utils"

/**
 * Textarea
 * --------
 * A simple textarea built with Tailwind + shadcn conventions.
 *
 * Usage:
 *   import { Textarea } from "@/components/ui/textarea"
 *
 * Both a **named** and **default** export are provided to satisfy all bundlers.
 */
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
      "ring-offset-background placeholder:text-muted-foreground",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      "disabled:cursor-not-allowed disabled:opacity-50",
      className,
    )}
    {...props}
  />
))

Textarea.displayName = "Textarea"

export { Textarea }
export default Textarea
