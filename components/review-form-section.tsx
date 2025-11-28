"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star, Check, AlertCircle } from "lucide-react"

type FormState = "idle" | "loading" | "success" | "error"

export function ReviewFormSection() {
  const [formState, setFormState] = useState<FormState>("idle")
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 5,
    comment: "",
    honeypot: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const finalValue = name === "rating" ? Number.parseInt(value) : value
    setFormData((prev) => ({ ...prev, [name]: finalValue }))
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

    if (formData.name.trim().length < 2 || formData.name.trim().length > 100) {
      newErrors.name = "Name must be 2-100 characters"
    }
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email"
    }
    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = "Rating must be 1-5"
    }
    if (formData.comment.trim().length < 10 || formData.comment.trim().length > 1000) {
      newErrors.comment = "Comment must be 10-1000 characters"
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
      setFormData({ name: "", email: "", rating: 5, comment: "", honeypot: "" })
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
    <section className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-2xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">Share Your Experience</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Your feedback helps me improve and helps others make informed decisions.
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
          {/* Honeypot field */}
          <input type="hidden" name="honeypot" value={formData.honeypot} onChange={handleChange} />

          {/* Name */}
          <motion.div className="space-y-2" variants={itemVariants}>
            <label htmlFor="review-name" className="block text-sm font-medium">
              Your Name *
            </label>
            <Input
              id="review-name"
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
            <label htmlFor="review-email" className="block text-sm font-medium">
              Email Address (Optional)
            </label>
            <Input
              id="review-email"
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

          {/* Rating */}
          <motion.div className="space-y-3" variants={itemVariants}>
            <label className="block text-sm font-medium">Rating *</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, rating: star }))}
                  className="transition-transform hover:scale-110"
                  aria-label={`Rate ${star} stars`}
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= formData.rating ? "fill-accent text-accent" : "text-muted hover:text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
            {errors.rating && (
              <p className="text-sm text-destructive flex gap-1">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                {errors.rating}
              </p>
            )}
          </motion.div>

          {/* Comment */}
          <motion.div className="space-y-2" variants={itemVariants}>
            <label htmlFor="review-comment" className="block text-sm font-medium">
              Your Review *
            </label>
            <Textarea
              id="review-comment"
              name="comment"
              placeholder="Share your experience working with me..."
              rows={4}
              value={formData.comment}
              onChange={handleChange}
              className={errors.comment ? "border-destructive focus-visible:ring-destructive" : ""}
              disabled={formState === "loading"}
            />
            <div className="flex justify-between">
              <div>
                {errors.comment && (
                  <p className="text-sm text-destructive flex gap-1">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {errors.comment}
                  </p>
                )}
              </div>
              <p className="text-xs text-muted-foreground">{formData.comment.length}/1000</p>
            </div>
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
                <p className="font-medium text-green-900 dark:text-green-100">Thank you!</p>
                <p className="text-sm text-green-800 dark:text-green-200">
                  Your review has been submitted and is pending approval.
                </p>
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
                  Submitting...
                </>
              ) : (
                "Submit Review"
              )}
            </Button>
          </motion.div>

          <p className="text-xs text-muted-foreground text-center">Reviews are moderated before publication.</p>
        </motion.form>
      </div>
    </section>
  )
}
