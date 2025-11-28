import { type NextRequest, NextResponse } from "next/server"
import { checkRateLimit, sanitizeInput, validateEmail } from "@/lib/utils"

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown"
    if (!checkRateLimit(ip, 3, 86400000)) {
      // 3 reviews per day
      return NextResponse.json({ error: "Review limit exceeded. Try again tomorrow." }, { status: 429 })
    }

    const body = await request.json()
    const { name, email, rating, comment, honeypot } = body

    // Honeypot check
    if (honeypot) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    // Validation
    if (!name || name.trim().length < 2 || name.trim().length > 100) {
      return NextResponse.json({ error: "Invalid name" }, { status: 400 })
    }

    if (email && !validateEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 })
    }

    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return NextResponse.json({ error: "Rating must be 1-5" }, { status: 400 })
    }

    if (!comment || comment.trim().length < 10 || comment.trim().length > 1000) {
      return NextResponse.json({ error: "Comment must be 10-1000 characters" }, { status: 400 })
    }

    // Sanitize inputs
    const sanitizedData = {
      name: sanitizeInput(name, 100),
      email: sanitizeInput(email || "", 254),
      rating,
      comment: sanitizeInput(comment, 1000),
      approved: false, // Require admin approval
      submittedAt: new Date().toISOString(),
    }

    // TODO: In production, save to database
    console.log("Review submission:", sanitizedData)

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your review! It will appear after approval.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("Review form error:", error)
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    // TODO: In production, fetch from database where approved = true
    const mockReviews = [
      {
        id: 1,
        name: "Sarah Mitchell",
        company: "Creative Agency Inc.",
        rating: 5,
        comment: "The editing work was phenomenal. Every detail was perfect.",
        date: "2024-10-15",
        approved: true,
      },
    ]

    return NextResponse.json(mockReviews, { status: 200 })
  } catch (error) {
    console.error("Fetch reviews error:", error)
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}
