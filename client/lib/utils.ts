import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function sanitizeInput(input: string, maxLength = 5000): string {
  return input.trim().slice(0, maxLength).replace(/[<>]/g, "")
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

// Rate limiting helper
const requestTimestamps: Record<string, number[]> = {}

export function checkRateLimit(identifier: string, maxRequests = 5, windowMs = 60000): boolean {
  const now = Date.now()
  if (!requestTimestamps[identifier]) {
    requestTimestamps[identifier] = []
  }

  const timestamps = requestTimestamps[identifier]
  const validTimestamps = timestamps.filter((ts) => now - ts < windowMs)

  if (validTimestamps.length >= maxRequests) {
    return false
  }

  validTimestamps.push(now)
  requestTimestamps[identifier] = validTimestamps
  return true
}
