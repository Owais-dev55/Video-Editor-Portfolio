import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/providers/theme-provider"
import type { PersonSchema } from "@/lib/schema"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Professional Video Editor | Award-Winning Content Creator",
  description:
    "Premium video editing, color grading, and motion graphics services. View portfolio, testimonials, and get in touch.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  openGraph: {
    title: "Professional Video Editor | Award-Winning Content Creator",
    description: "Premium video editing, color grading, and motion graphics services.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  },
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const personSchema: PersonSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Professional Video Editor",
    url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    image: {
      "@type": "ImageObject",
      url: `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/og-image.png`,
      width: 1200,
      height: 630,
    },
    sameAs: ["https://github.com", "https://linkedin.com", "https://twitter.com"],
    jobTitle: "Video Editor",
    worksFor: {
      "@type": "Organization",
      name: "Studio",
    },
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
