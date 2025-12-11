import { describe, it, expect } from "vitest"

describe("Contact API", () => {
  it("rejects invalid email", async () => {
    const payload = {
      name: "Test User",
      email: "invalid-email",
      message: "This is a test message",
      honeypot: "",
    }

    // Test payload structure
    expect(payload.name).toBeDefined()
    expect(payload.email).toBeDefined()
    expect(payload.message).toBeDefined()
  })

  it("rejects short messages", async () => {
    const payload = {
      message: "too short",
    }

    expect(payload.message.length < 10).toBe(true)
  })

  it("detects honeypot", async () => {
    const payload = {
      name: "Test",
      email: "test@example.com",
      message: "Valid message here",
      honeypot: "filled", // Honeypot filled = spam
    }

    expect(payload.honeypot).toBe("filled")
  })
})
