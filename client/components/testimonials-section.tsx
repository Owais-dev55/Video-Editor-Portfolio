"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Mitchell",
    company: "Creative Agency Inc.",
    rating: 5,
    comment:
      "The editing work was phenomenal. Every detail was perfect, and the turnaround time was impressive. Highly recommend!",
    date: "2024-10-15",
    approved: true,
  },
  {
    id: 2,
    name: "James Chen",
    company: "Tech Startup Co.",
    rating: 5,
    comment:
      "Our product launch video exceeded all expectations. The color grading was cinematic and the motion graphics were captivating.",
    date: "2024-09-28",
    approved: true,
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    company: "Fashion Brand LLC",
    rating: 5,
    comment: "Professional, creative, and responsive to feedback. This is someone who truly cares about their craft.",
    date: "2024-09-10",
    approved: true,
  },
  {
    id: 4,
    name: "Michael Toronto",
    company: "Documentary Films",
    rating: 5,
    comment: "Absolutely stunning work on our documentary series. The sound design integration was seamless.",
    date: "2024-08-22",
    approved: true,
  },
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`w-4 h-4 ${i < rating ? "fill-accent text-accent" : "text-muted"}`} />
      ))}
    </div>
  )
}

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  const approvedTestimonials = TESTIMONIALS.filter((t) => t.approved)

  useEffect(() => {
    if (!autoplay) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % approvedTestimonials.length)
    }, 6000)

    return () => clearInterval(timer)
  }, [autoplay, approvedTestimonials.length])

  const handlePrev = () => {
    setAutoplay(false)
    setCurrentIndex((prev) => (prev - 1 + approvedTestimonials.length) % approvedTestimonials.length)
  }

  const handleNext = () => {
    setAutoplay(false)
    setCurrentIndex((prev) => (prev + 1) % approvedTestimonials.length)
  }

  const current = approvedTestimonials[currentIndex]

  return (
    <section id="testimonials" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-4xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">What Clients Say</h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Real feedback from professionals I've worked with.
          </p>
        </motion.div>

        <div className="space-y-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="bg-card border border-border rounded-lg p-8 md:p-12"
            >
              <div className="space-y-6">
                {/* Rating */}
                <StarRating rating={current.rating} />

                {/* Comment */}
                <p className="text-lg leading-relaxed italic text-foreground">"{current.comment}"</p>

                {/* Client Info */}
                <div className="flex items-center justify-between pt-6 border-t border-border">
                  <div>
                    <p className="font-semibold">{current.name}</p>
                    <p className="text-sm text-muted-foreground">{current.company}</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {new Date(current.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="outline" size="icon" onClick={handlePrev} aria-label="Previous testimonial">
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Pagination Dots */}
            <div className="flex gap-2">
              {approvedTestimonials.map((_, i) => (
                <motion.button
                  key={i}
                  onClick={() => {
                    setAutoplay(false)
                    setCurrentIndex(i)
                  }}
                  className={`h-2 rounded-full transition-all ${
                    i === currentIndex ? "bg-primary w-8" : "bg-muted w-2 hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.95 }}
                />
              ))}
            </div>

            <Button variant="outline" size="icon" onClick={handleNext} aria-label="Next testimonial">
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {[
              { label: "Satisfied Clients", value: "50+" },
              { label: "Avg. Rating", value: "4.9/5" },
              { label: "Projects", value: "500+" },
            ].map((stat, i) => (
              <div key={i} className="text-center p-4 rounded-lg bg-card border border-border">
                <p className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
