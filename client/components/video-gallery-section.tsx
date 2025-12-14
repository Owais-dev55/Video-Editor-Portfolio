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
              className="absolute top-4 right-4 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
              aria-label="Close video"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-6 border-t border-border">
              <h3 className="font-semibold text-lg">{video.title}</h3>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function VideoGallerySection() {
  const [selectedVideo, setSelectedVideo] = useState<(typeof VIDEOS)[0] | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollButtons = () => {
    if (!scrollRef.current) return
    setCanScrollLeft(scrollRef.current.scrollLeft > 0)
    setCanScrollRight(
      scrollRef.current.scrollLeft <
        scrollRef.current.scrollWidth - scrollRef.current.clientWidth - 10
    )
  }

  useEffect(() => {
    updateScrollButtons()
    window.addEventListener("resize", updateScrollButtons)
    return () => window.removeEventListener("resize", updateScrollButtons)
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({
      left: direction === "left" ? -400 : 400,
      behavior: "smooth",
    })
    setTimeout(updateScrollButtons, 300)
  }

  return (
    <section id="work" className="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Work</h2>

        <div className="relative">
          {canScrollLeft && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 text-4xl"
              onClick={() => scroll("left")}
            >
              <ChevronLeft />
            </Button>
          )}

          {canScrollRight && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10"
              onClick={() => scroll("right")}
            >
              <ChevronRight />
            </Button>
          )}

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden scroll-smooth snap-x snap-mandatory pb-4"
            onScroll={updateScrollButtons}
          >
            {VIDEOS.map((video) => (
              <div key={video.id} className="w-80 flex-shrink-0 snap-start cursor-pointer">
                <button onClick={() => setSelectedVideo(video)} className="w-full cursor-pointer">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="rounded-lg aspect-video object-cover"
                    loading="lazy"
                  />
                  <h3 className="mt-4 font-semibold">{video.title}</h3>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <VideoModal video={selectedVideo} onClose={() => setSelectedVideo(null)} />
    </section>
  )
}
