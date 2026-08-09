"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface SlideItem {
  id: string;
  name: string;
  price: string;
  category: string;
  image: string;
}

const HERO_SLIDES: SlideItem[] = [
  {
    id: "p1",
    name: "Artisanal Terracotta Vessel",
    price: "₹1,800",
    category: "FEATURED ITEM",
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p2",
    name: "Ergonomic Lounge Armchair",
    price: "₹24,500",
    category: "FURNITURE SELECTION",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p3",
    name: "Studio Acoustic Headphones",
    price: "₹14,900",
    category: "STUDIO AUDIO",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p4",
    name: "Organic Linen Bedding Set",
    price: "₹6,400",
    category: "TEXTILE REPERTOIRE",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "p5",
    name: "Sculptural Brass Pendant Lamp",
    price: "₹8,900",
    category: "LIGHTING COLLECTION",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1200&auto=format&fit=crop",
  },
];

export function HeroImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isHovered, setIsHovered] = useState(false);

  const touchStartX = useRef<number | null>(null);

  // Auto-slide every 4.5 seconds (paused on hover)
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      handleNext();
    }, 4500);
    return () => clearInterval(interval);
  }, [currentIndex, isHovered]);

  const handleNext = () => {
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const handlePrev = () => {
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchStartX.current - touchEndX;

    if (Math.abs(diffX) > 40) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  const currentSlide = HERO_SLIDES[currentIndex];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-card border border-[#E6DED5] bg-white group select-none"
    >
      {/* Sliding Image Container */}
      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={currentSlide.id}
          custom={direction}
          initial={{
            x: direction === "right" ? "100%" : "-100%",
            opacity: 0.4,
          }}
          animate={{
            x: 0,
            opacity: 1,
          }}
          exit={{
            x: direction === "right" ? "-100%" : "100%",
            opacity: 0.4,
          }}
          transition={{
            duration: 0.6,
            ease: "easeInOut",
          }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={currentSlide.image}
            alt={currentSlide.name}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next Navigation Arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/80 backdrop-blur-md border border-[#E6DED5] text-[#171310] shadow-subtle hover:bg-white transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/80 backdrop-blur-md border border-[#E6DED5] text-[#171310] shadow-subtle hover:bg-white transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
        aria-label="Next Slide"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Floating Featured Product Badge (Synced with Slide) */}
      <div className="absolute bottom-4 left-4 right-4 z-20 p-4 bg-white/95 backdrop-blur-md rounded-2xl border border-[#E6DED5] shadow-dropdown flex items-center justify-between">
        <div>
          <span className="text-[9px] font-bold uppercase tracking-widest text-[#A56B4F] block">
            {currentSlide.category}
          </span>
          <h4 className="text-sm font-bold text-[#181512] line-clamp-1">{currentSlide.name}</h4>
        </div>

        <div className="flex items-center space-x-4">
          {/* Pagination Indicators */}
          <div className="flex items-center space-x-1.5">
            {HERO_SLIDES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleDotClick(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  currentIndex === idx ? "w-5 bg-[#A56B4F]" : "w-1.5 bg-[#E6DED5] hover:bg-[#6F6861]"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <span className="text-sm font-extrabold text-[#171310]">{currentSlide.price}</span>
        </div>
      </div>
    </div>
  );
}
