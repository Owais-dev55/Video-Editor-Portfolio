import { Header } from "@/components/header"
import { SkipLink } from "@/components/skip-link"
import { HeroSection } from "@/components/hero-section"
import { OverviewSection } from "@/components/overview-section"
import { ThreeDModelSection } from "@/components/three-d-model-section"
import { VideoGallerySection } from "@/components/video-gallery-section"
import { TestimonialsSection } from "@/components/testimonials-section"
// import { ReviewFormSection } from "@/components/review-form-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main>
      <SkipLink />
      <Header />
      <HeroSection />
      <OverviewSection />
      <ThreeDModelSection />
      <VideoGallerySection />
      <TestimonialsSection />
      {/* <ReviewFormSection /> */}
      <ContactSection />
      <Footer />
    </main>
  )
}
