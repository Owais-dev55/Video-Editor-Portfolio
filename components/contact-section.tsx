"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Check, AlertCircle } from "lucide-react"

type FormState = "idle" | "loading" | "success" | "error"

function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validateName(name: string): boolean {
  return name.trim().length >= 2 && name.trim().length <= 100
}

function validateMessage(message: string): boolean {
  return message.trim().length >= 10 && message.trim().length <= 5000
}

function validatePhone(phone: string): boolean {
  if (!phone) return true // optional field
  const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/
  return phoneRegex.test(phone)
}

export function ContactSection() {
  const [formState, setFormState] = useState<FormState>("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    budget: "under-5k",
    message: "",
    honeypot: "", // spam protection
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!validateName(formData.name)) {
      newErrors.name = "Name must be 2-100 characters"
    }
    if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number"
    }
    if (!validateMessage(formData.message)) {
      newErrors.message = "Message must be 10-5000 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (formData.honeypot) {
      return
    }

    if (!validateForm()) return

    setFormState("loading")

    try {
      // Simulate API call - in production would send to backend
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setFormState("success")
      setFormData({ name: "", email: "", phone: "", budget: "under-5k", message: "", honeypot: "" })
      setTimeout(() => setFormState("idle"), 3000)
    } catch {
      setFormState("error")
      setTimeout(() => setFormState("idle"), 3000)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  return (
    <section id="contact" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
            Let's Create Something Amazing
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Have a project in mind? Get in touch and let's discuss how I can help bring your vision to life.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Honeypot field - hidden from users */}
          <input type="hidden" name="honeypot" value={formData.honeypot} onChange={handleChange} />

          {/* Name */}
          <motion.div className="space-y-2" variants={itemVariants}>
            <label htmlFor="name" className="block text-sm font-medium">
              Full Name *
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? "border-destructive focus-visible:ring-destructive" : ""}
              disabled={formState === "loading"}
            />
            {errors.name && (
              <p className="text-sm text-destructive flex gap-1">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {errors.name}
              </p>
            )}
          </motion.div>

          {/* Email */}
          <motion.div className="space-y-2" variants={itemVariants}>
            <label htmlFor="email" className="block text-sm font-medium">
              Email Address *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="your@email.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
              disabled={formState === "loading"}
            />
            {errors.email && (
              <p className="text-sm text-destructive flex gap-1">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {errors.email}
              </p>
            )}
          </motion.div>

          {/* Phone */}
          <motion.div className="space-y-2" variants={itemVariants}>
            <label htmlFor="phone" className="block text-sm font-medium">
              Phone Number (Optional)
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? "border-destructive focus-visible:ring-destructive" : ""}
              disabled={formState === "loading"}
            />
            {errors.phone && (
              <p className="text-sm text-destructive flex gap-1">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {errors.phone}
              </p>
            )}
          </motion.div>

          {/* Budget */}
          <motion.div className="space-y-2" variants={itemVariants}>
            <label htmlFor="budget" className="block text-sm font-medium">
              Project Budget (Optional)
            </label>
            <select
              id="budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              disabled={formState === "loading"}
              className="w-full px-3 py-2 rounded-md border border-input bg-background text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
            >
              <option value="under-5k">Under $5,000</option>
              <option value="5k-10k">$5,000 - $10,000</option>
              <option value="10k-25k">$10,000 - $25,000</option>
              <option value="25k-plus">$25,000+</option>
            </select>
          </motion.div>

          {/* Message */}
          <motion.div className="space-y-2" variants={itemVariants}>
            <label htmlFor="message" className="block text-sm font-medium">
              Message *
            </label>
            <Textarea
              id="message"
              name="message"
              placeholder="Tell me about your project..."
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className={errors.message ? "border-destructive focus-visible:ring-destructive" : ""}
              disabled={formState === "loading"}
            />
            {errors.message && (
              <p className="text-sm text-destructive flex gap-1">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {errors.message}
              </p>
            )}
          </motion.div>

          {/* Status Message */}
          {formState === "success" && (
            <motion.div
              className="p-4 rounded-lg bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 flex gap-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Check className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-green-900 dark:text-green-100">Message sent!</p>
                <p className="text-sm text-green-800 dark:text-green-200">I'll get back to you soon.</p>
              </div>
            </motion.div>
          )}

          {formState === "error" && (
            <motion.div
              className="p-4 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 flex gap-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-red-900 dark:text-red-100">Something went wrong.</p>
                <p className="text-sm text-red-800 dark:text-red-200">Please try again later.</p>
              </div>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={formState === "loading" || formState === "success"}
            >
              {formState === "loading" ? (
                <>
                  <span className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin mr-2" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </motion.div>

          <p className="text-xs text-muted-foreground text-center">We respect your privacy. No spam, ever.</p>
        </motion.form>
      </div>
    </section>
  )
}
