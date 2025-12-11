import { describe, it, expect } from "vitest"
import { validateEmail, sanitizeInput } from "@/lib/utils"

describe("Contact Form Validation", () => {
  it("validates email correctly", () => {
    expect(validateEmail("test@example.com")).toBe(true)
    expect(validateEmail("invalid.email")).toBe(false)
    expect(validateEmail("test@domain")).toBe(false)
  })

  it("sanitizes input", () => {
    const input = '<script>alert("xss")</script>Hello'
    const sanitized = sanitizeInput(input, 20)
    expect(sanitized).not.toContain("<script>")
  })

  it("respects max length", () => {
    const input = "a".repeat(100)
    const sanitized = sanitizeInput(input, 50)
    expect(sanitized.length).toBe(50)
  })
})

describe("Rate Limiting", () => {
  it("allows requests within limit", () => {
    const { checkRateLimit } = require("@/lib/utils")
    // Clear any previous state
    const result1 = checkRateLimit("test-user", 3, 1000)
    const result2 = checkRateLimit("test-user", 3, 1000)
    expect(result1).toBe(true)
    expect(result2).toBe(true)
  })
})
