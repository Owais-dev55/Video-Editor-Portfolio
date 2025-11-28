import { type NextRequest, NextResponse } from "next/server"
import { checkRateLimit, sanitizeInput, validateEmail } from "@/lib/utils"

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    if (!checkRateLimit(ip, 5, 60000)) {
      return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 })
    }

    const body = await request.json()
    const { name, email, phone, message, budget, honeypot } = body

    // Honeypot check
    if (honeypot) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    // Validation
    if (!name || name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 })
    }

    if (!validateEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    if (!message || message.trim().length < 10 || message.trim().length > 5000) {
      return NextResponse.json({ error: "Message must be 10-5000 characters" }, { status: 400 })
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name, 100),
      email: sanitizeInput(email, 254),
      phone: sanitizeInput(phone || "", 20),
      message: sanitizeInput(message, 5000),
      budget: ["under-5k", "5k-10k", "10k-25k", "25k-plus"].includes(budget) ? budget : "not-specified",
      submittedAt: new Date().toISOString(),
    }

    // TODO: In production, save to database and send email
    console.log("Contact form submission:", sanitizedData)

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully. I'll get back to you soon!",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 })
  }
}
