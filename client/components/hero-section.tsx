"use client"

import Image from "next/image"
import { motion, easeOut } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: easeOut },
    },
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 1, ease: easeOut },
    },
  }

  return (
    <section id="/" className="min-h-screen pt-24 pb-12 md:pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Content */}
          <motion.div className="space-y-6 md:space-y-8 order-2 md:order-1" variants={itemVariants}>
            <div className="space-y-3">
              <motion.div
                className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
                variants={itemVariants}
              >
                Award-Winning Video Editor
              </motion.div>
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance"
                variants={itemVariants}
              >
                Elevate Your{" "}
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Visual Story
                </span>
              </motion.h1>
            </div>

            <motion.p className="text-lg text-muted-foreground leading-relaxed max-w-lg" variants={itemVariants}>
              Professional video editing, color grading, and motion graphics. I transform raw footage into compelling
              narratives that captivate audiences and drive results.
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4 pt-4" variants={itemVariants}>
              <Button size="lg" className="gap-2">
                <Link href="#work">
                View Work
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                <Link href="#contact">
                Get in Touch
                </Link>
              </Button>
            </motion.div>

            <motion.div className="flex gap-8 pt-8 border-t border-border" variants={itemVariants}>
              <div>
                <div className="text-2xl md:text-3xl font-bold">500+</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold">50+</div>
                <div className="text-sm text-muted-foreground">Happy Clients</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold">12y</div>
                <div className="text-sm text-muted-foreground">Experience</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div className="relative order-1 md:order-2" variants={imageVariants}>
            <div className="relative aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
              <Image
                src="/professional-video-editor.png"
                alt="Professional video editor at work"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* floating accent */}
            <motion.div
              className="absolute -z-10 w-96 h-96 bg-primary/20 rounded-full blur-3xl -bottom-20 -right-20"
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 6,
                repeat: Number.POSITIVE_INFINITY,
              }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
