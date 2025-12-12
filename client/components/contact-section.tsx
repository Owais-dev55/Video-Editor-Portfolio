"use client";

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, AlertCircle } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;
const AUTOREPLY_ID =
  process.env.NEXT_PUBLIC_EMAILJS_AUTORESPONSE_TEMPLATE_ID!;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!;

export function ContactSection() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    to_email: "",
    phone: "",
    budget: "under-5k",
    message: "",
    honeypot: "",
  });

  const form = useRef<HTMLFormElement>(null);

  // ===== VALIDATION ===== //
  const validateEmail = (email: string): boolean =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateName = (name: string): boolean =>
    name.trim().length >= 2 && name.trim().length <= 100;

  const validateMessage = (msg: string): boolean =>
    msg.trim().length >= 10 && msg.trim().length <= 5000;

  const validatePhone = (phone: string): boolean => {
    if (!phone) return true;
    return /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/.test(
      phone
    );
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      const clone = { ...errors };
      delete clone[name];
      setErrors(clone);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!validateName(formData.name)) newErrors.name = "Name must be 2–100 characters.";
    if (!validateEmail(formData.to_email)) newErrors.to_email = "Enter a valid email.";
    if (formData.phone && !validatePhone(formData.phone))
      newErrors.phone = "Invalid phone number.";
    if (!validateMessage(formData.message))
      newErrors.message = "Message must be 10–5000 characters.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ===== SEND EMAIL ===== //
  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.honeypot) return;
    if (!validateForm()) return;

    setFormState("loading");

    try {
      // Send main email (to you)
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, form.current!, PUBLIC_KEY);

      // Send auto-responder (to the user)
      await emailjs.sendForm(SERVICE_ID, AUTOREPLY_ID, form.current!, PUBLIC_KEY);

      setFormState("success");

      setFormData({
        name: "",
        to_email: "",
        phone: "",
        budget: "under-5k",
        message: "",
        honeypot: "",
      });

      setTimeout(() => setFormState("idle"), 3000);
    } catch (err) {
      console.log("EmailJS error:", err);
      setFormState("error");
      setTimeout(() => setFormState("idle"), 3000);
    }
  };

  // Animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

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
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Let’s Work Together 🎬
          </h2>
          <p className="text-lg text-muted-foreground">
            Tell me your idea — I’ll help you turn it into a cinematic experience.
          </p>
        </motion.div>

        <motion.form
          ref={form}
          onSubmit={sendEmail}
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <input type="hidden" name="honeypot" value={formData.honeypot} />

          {/* NAME */}
          <motion.div className="space-y-2" variants={itemVariants}>
            <label className="font-medium text-sm">Full Name *</label>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={errors.name ? "border-destructive" : ""}
            />
            {errors.name && (
              <p className="text-sm text-destructive flex gap-1">
                <AlertCircle size={16} /> {errors.name}
              </p>
            )}
          </motion.div>

          {/* EMAIL */}
          <motion.div className="space-y-2" variants={itemVariants}>
            <label className="font-medium text-sm">Email Address *</label>
            <Input
              name="to_email"
              value={formData.to_email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={errors.to_email ? "border-destructive" : ""}
            />
            {errors.to_email && (
              <p className="text-sm text-destructive flex gap-1">
                <AlertCircle size={16} /> {errors.to_email}
              </p>
            )}
          </motion.div>

          {/* PHONE */}
          <motion.div className="space-y-2" variants={itemVariants}>
            <label className="font-medium text-sm">Phone (Optional)</label>
            <Input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 555 000 000"
              className={errors.phone ? "border-destructive" : ""}
            />
            {errors.phone && (
              <p className="text-sm text-destructive flex gap-1">
                <AlertCircle size={16} /> {errors.phone}
              </p>
            )}
          </motion.div>

          {/* BUDGET */}
          <motion.div className="space-y-2" variants={itemVariants}>
            <label className="font-medium text-sm">Project Budget</label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-3 py-2 rounded border bg-background"
            >
              <option value="under-5k">Under $5,000</option>
              <option value="5k-10k">$5,000 – $10,000</option>
              <option value="10k-25k">$10,000 – $25,000</option>
              <option value="25k-plus">$25,000+</option>
            </select>
          </motion.div>

          {/* MESSAGE */}
          <motion.div className="space-y-2" variants={itemVariants}>
            <label className="font-medium text-sm">Message *</label>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me about your project..."
              rows={5}
              className={errors.message ? "border-destructive" : ""}
            />
            {errors.message && (
              <p className="text-sm text-destructive flex gap-1">
                <AlertCircle size={16} /> {errors.message}
              </p>
            )}
          </motion.div>

          {/* SUCCESS / ERROR MESSAGE */}
          {formState === "success" && (
            <motion.div
              className="p-4 rounded bg-green-100 border border-green-300 flex gap-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Check className="text-green-600" />
              <div>
                <p className="font-medium">Message sent!</p>
                <p className="text-sm">Thanks — I’ll reply soon.</p>
              </div>
            </motion.div>
          )}

          {formState === "error" && (
            <motion.div
              className="p-4 rounded bg-red-100 border border-red-300 flex gap-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <AlertCircle className="text-red-600" />
              <div>
                <p className="font-medium">Something went wrong.</p>
                <p className="text-sm">Please try again later.</p>
              </div>
            </motion.div>
          )}

          {/* BUTTON */}
          <motion.div variants={itemVariants}>
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={formState === "loading" || formState === "success"}
            >
              {formState === "loading" ? "Sending..." : "Send Message"}
            </Button>
          </motion.div>

          <p className="text-xs text-muted-foreground text-center">
            No spam, no BS — just a friendly response.
          </p>
        </motion.form>
      </div>
    </section>
  );
}
