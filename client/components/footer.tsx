"use client"
import { motion } from "framer-motion"
import {  Linkedin, Twitter, Mail, ArrowUp, Instagram } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/exxceptional_creations?igsh=aGJsdmMyM2xkdTls&utm_source=qr", label: "Instragram" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/fuzail-shahzad-337229397?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app", label: "LinkedIn" },
  ]

  const quickLinks = [
    {label: "Home", href: "#home" },
    { label: "Work", href: "#work" },
    { label: "Services", href: "#services" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ]

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
    <footer className="bg-card border-t border-border">
      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
          {/* Brand */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-xl font-bold">Studio</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional video editing and motion graphics. Transforming ideas into visual stories.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h4 className="font-semibold text-sm uppercase tracking-wider">Navigation</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h4 className="font-semibold text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2">
              {["Video Editing", "Color Grading", "Sound Design", "Motion Graphics"].map((service) => (
                <li key={service}>
                  <button className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left">
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h4 className="font-semibold text-sm uppercase tracking-wider">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                  target="_blank"
                    key={social.href}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 rounded-lg bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div className="border-t border-border py-8" variants={itemVariants}>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">{`© ${currentYear} Studio. All rights reserved.`}</p>

            <div className="flex gap-4">
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </button>
              <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </button>
            </div>

            {/* Scroll to Top Button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="hidden md:flex"
            >
              <ArrowUp className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}
