"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const VIDEOS = [
  {
    id: 1,
    title: "Cinematic Travel Vlog",
    thumbnail: "/cinematic-travel-vlog.jpg",
    videoUrl: "https://player.vimeo.com/video/1146140791",
  },
  {
    id: 2,
    title: "Corporate Promo",
    thumbnail: "/corporate-video-promo.jpg",
    videoUrl: "https://player.vimeo.com/video/1146369701",
  },
  {
    id: 3,
    title: "Music Video Production",
    thumbnail: "/music-video-production.png",
    videoUrl: "https://player.vimeo.com/video/1146369618",
  },
  {
    id: 4,
    title: "Podcast Intro Sequence",
    thumbnail: "/podcast-intro-animation.jpg",
    videoUrl: "https://player.vimeo.com/video/1146369317",
  },
  {
    id: 5,
    title: "Product Launch Campaign",
    thumbnail: "/product-launch-video.png",
    videoUrl: "https://player.vimeo.com/video/1146369133",
  },
  {
    id: 6,
    title: "Wedding Highlights",
    thumbnail: "/wedding-highlights-video.jpg",
    videoUrl: "https://player.vimeo.com/video/1146368822",
  },
]

/* ---------------- VIDEO MODAL (unchanged layout) ---------------- */

function VideoModal({
  video,
  onClose,
}: {
  video: (typeof VIDEOS)[0] | null
  onClose: () => void
}) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-4xl bg-background rounded-lg overflow-hidden relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative pt-[56.25%]">
              <iframe
                src={video.videoUrl}
                title={video.title}
                className="absolute inset-0 w-full h-full"
                allow="autoplay; fullscreen"
                allowFullScreen
              />
            </div>

            <button
              onClick={onClose}
              className="absolute top-3 right-3 p-2 bg-background/80 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-4 border-t border-border">
              <h3 className="font-semibold">{video.title}</h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/* ---------------- GALLERY SECTION ---------------- */

export function VideoGallerySection() {
  const [selectedVideo, setSelectedVideo] =
    useState<(typeof VIDEOS)[0] | null>(null)

  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollButtons = () => {
    if (!scrollRef.current) return
    setCanScrollLeft(scrollRef.current.scrollLeft > 0)
    setCanScrollRight(
      scrollRef.current.scrollLeft <
        scrollRef.current.scrollWidth -
          scrollRef.current.clientWidth -
          10
    )
  }

  useEffect(() => {
    updateScrollButtons()
    window.addEventListener("resize", updateScrollButtons)
    return () => window.removeEventListener("resize", updateScrollButtons)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    const distance = 400 // SAME as original for desktop
    scrollRef.current.scrollBy({
      left: direction === "left" ? -distance : distance,
      behavior: "smooth",
    })
    setTimeout(updateScrollButtons, 300)
  }

  return (
    <section id="work" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Featured Work
        </h2>

        <div className="relative">
          {/* Desktop arrows ONLY */}
          {canScrollLeft && (
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex absolute left-0 -translate-x-16 top-1/2 -translate-y-1/2 z-10"
              onClick={() => scroll("left")}
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>
          )}

          {canScrollRight && (
            <Button
              variant="ghost"
              size="icon"
              className="hidden lg:flex absolute right-0 translate-x-16 top-1/2 -translate-y-1/2 z-10"
              onClick={() => scroll("right")}
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          )}

          {/* Carousel */}
          <div
            ref={scrollRef}
            onScroll={updateScrollButtons}
            className="
              flex gap-4 lg:gap-6
              overflow-x-auto lg:overflow-x-hidden
              scroll-smooth snap-x snap-mandatory
              pb-4
            "
          >
            {VIDEOS.map((video) => (
              <div
                key={video.id}
                className="
                  flex-shrink-0 snap-start
                  w-72 sm:w-80 lg:w-80
                "
              >
                <button
                  onClick={() => setSelectedVideo(video)}
                  className="w-full text-left"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="rounded-lg aspect-video object-cover"
                  />
                  <h3 className="mt-4 font-semibold">
                    {video.title}
                  </h3>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <VideoModal
        video={selectedVideo}
        onClose={() => setSelectedVideo(null)}
      />
    </section>
  )
}
