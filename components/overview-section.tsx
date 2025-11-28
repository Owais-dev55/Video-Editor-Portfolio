"use client"

import { motion } from "framer-motion"
import { Video, Palette, Music, Sparkles } from "lucide-react"

export function OverviewSection() {
  const services = [
    {
      icon: Video,
      title: "Video Editing",
      description: "Professional cutting, sequencing, and post-production workflows.",
    },
    {
      icon: Palette,
      title: "Color Grading",
      description: "Cinematic color correction and grading for visual consistency.",
    },
    {
      icon: Music,
      title: "Sound Design",
      description: "Audio mastering, foley, and soundtrack integration.",
    },
    {
      icon: Sparkles,
      title: "Motion Graphics",
      description: "Animated titles, effects, and dynamic visual elements.",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="services" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">What I Offer</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Comprehensive video production services tailored to bring your vision to life with cinematic quality and
            attention to detail.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                className="p-6 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors group"
                variants={itemVariants}
              >
                <div className="inline-block p-3 rounded-lg bg-primary/10 mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
