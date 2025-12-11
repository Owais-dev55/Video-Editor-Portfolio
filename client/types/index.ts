import type React from "react"
export interface ContactFormData {
  name: string
  email: string
  phone: string
  message: string
  budget: "under-5k" | "5k-10k" | "10k-25k" | "25k-plus"
  honeypot: string
}

export interface ReviewFormData {
  name: string
  email: string
  rating: number
  comment: string
  honeypot: string
}

export interface Review {
  id: number
  name: string
  company?: string
  rating: number
  comment: string
  date: string
  approved: boolean
}

export interface Video {
  id: number
  title: string
  thumbnail: string
  videoUrl: string
  description?: string
}

export interface Service {
  icon: React.ReactNode
  title: string
  description: string
}

export interface NavLink {
  href: string
  label: string
}

export interface SocialLink {
  icon: React.ComponentType<{ className?: string }>
  href: string
  label: string
}
