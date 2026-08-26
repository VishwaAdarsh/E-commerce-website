"use client";

import { Modal } from "@/components/ui/Modal";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxModalProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export function LightboxModal({
  images,
  currentIndex,
  isOpen,
  onClose,
  onSelectIndex,
}: LightboxModalProps) {
  if (!isOpen || images.length === 0) return null;

  const handlePrev = () => {
    onSelectIndex((currentIndex - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    onSelectIndex((currentIndex + 1) % images.length);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Product Image Gallery (${currentIndex + 1}/${images.length})`}>
      <div className="relative space-y-4">
        {/* Main Lightbox Image View */}
        <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#171310] flex items-center justify-center border border-[#E6DED5]">
          <img
            src={images[currentIndex]}
            alt={`Gallery view ${currentIndex + 1}`}
            className="max-h-full max-w-full object-contain"
          />

          {/* Prev/Next Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#181512] transition-colors shadow-card"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#181512] transition-colors shadow-card"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Thumbnail Selector Strip */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-1">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => onSelectIndex(idx)}
              className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                currentIndex === idx ? "border-[#A56B4F] scale-105" : "border-[#E6DED5] opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}
