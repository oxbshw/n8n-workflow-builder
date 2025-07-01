import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/** cn() – merge Tailwind & conditional classNames */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
