export const SITE_NAME = "Professional Video Editor | Studio"
export const SITE_DESCRIPTION =
  "Award-winning video editor specializing in editing, color grading, sound design, and motion graphics."
export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

export const NAV_LINKS = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
]

export const SOCIAL_LINKS = [
  { icon: "Github", href: "https://github.com", label: "GitHub" },
  { icon: "Linkedin", href: "https://linkedin.com", label: "LinkedIn" },
  { icon: "Twitter", href: "https://twitter.com", label: "Twitter" },
  { icon: "Mail", href: "mailto:hello@example.com", label: "Email" },
]

export const SERVICES = [
  {
    title: "Video Editing",
    description: "Professional cutting, sequencing, and post-production workflows.",
  },
  {
    title: "Color Grading",
    description: "Cinematic color correction and grading for visual consistency.",
  },
  {
    title: "Sound Design",
    description: "Audio mastering, foley, and soundtrack integration.",
  },
  {
    title: "Motion Graphics",
    description: "Animated titles, effects, and dynamic visual elements.",
  },
]
