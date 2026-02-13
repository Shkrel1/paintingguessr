'use client';

import { useState, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface PaintingDisplayProps {
  imageUrl: string;
  title: string;
  artist?: string;
  nationality?: string;
  blurred?: boolean;
  onLightboxChange?: (open: boolean) => void;
}

export default function PaintingDisplay({
  imageUrl,
  title,
  blurred,
  onLightboxChange,
}: PaintingDisplayProps) {
  const [lightboxOpen, _setLightboxOpen] = useState(false);
  const setLightboxOpen = (open: boolean) => {
    _setLightboxOpen(open);
    onLightboxChange?.(open);
  };
  const [imageError, setImageError] = useState(false);
  const [imgSrc, setImgSrc] = useState(imageUrl);
  const [imageLoaded, setImageLoaded] = useState(false);

  // Reset state when imageUrl changes (new round)
  useEffect(() => {
    setImgSrc(imageUrl);
    setImageError(false);
    setImageLoaded(false);
  }, [imageUrl]);

  const handleImageError = useCallback(() => {
    if (!imageError) {
      setImageError(true);
      setImgSrc(imageUrl.replace(/\/\d+px-/, '/800px-'));
    }
  }, [imageUrl, imageError]);

  // Escape closes lightbox
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
    };
    if (lightboxOpen) {
      window.addEventListener('keydown', handleKey);
      return () => window.removeEventListener('keydown', handleKey);
    }
  }, [lightboxOpen]);

  return (
    <>
      <div className="relative w-full h-full flex flex-col items-center justify-center p-6">
        {/* Warm spotlight behind painting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[70%] bg-[#c9a84c]/[0.02] rounded-full blur-[80px] pointer-events-none" />

        {/* Picture frame with entrance animation */}
        <motion.div
          key={imageUrl}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="relative max-w-full max-h-[70vh] cursor-pointer group"
          onClick={() => setLightboxOpen(true)}
        >
          {/* Outer frame — deep wood */}
          <div className="absolute -inset-4 bg-gradient-to-br from-[#6B5B3E] via-[#8B7355] to-[#5A4A30] rounded-[2px] shadow-[0_8px_40px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.05)]" />
          {/* Inner frame bevel */}
          <div className="absolute -inset-2 bg-gradient-to-br from-[#C9B888] via-[#B8A570] to-[#A0845C] rounded-[1px]" />
          {/* Inner shadow for depth */}
          <div className="absolute -inset-1 bg-gradient-to-br from-[#4A3C28] to-[#3A2E1C] rounded-[1px]" />

          <div className="relative bg-[#1a1a2e] overflow-hidden">
            {/* Skeleton while loading */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-[#16213e] animate-pulse flex items-center justify-center">
                <div className="w-12 h-14 border border-[#c9a84c]/20 rounded-sm" />
              </div>
            )}

            <Image
              src={imgSrc}
              alt={title}
              width={800}
              height={600}
              className={`object-contain max-h-[65vh] w-auto transition-all duration-500 ${blurred ? 'blur-md' : ''} ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
              onError={handleImageError}
              onLoad={() => setImageLoaded(true)}
              unoptimized
              priority
            />

            {/* Hover zoom overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20 backdrop-blur-[1px]">
              <motion.span
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                className="bg-black/60 text-white/90 px-4 py-2 rounded-full text-xs font-medium tracking-wide border border-white/10"
              >
                Click to zoom
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* Title badge (shown when painting is blurred in hard mode) */}
        <AnimatePresence>
          {blurred && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ delay: 0.5 }}
              className="mt-5 px-5 py-2 bg-[#c9a84c]/10 border border-[#c9a84c]/30 rounded-full text-[#c9a84c] text-sm font-serif font-medium italic"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
          >
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 right-4 text-white/60 hover:text-white text-2xl z-50 w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setLightboxOpen(false)}
              aria-label="Close zoom"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </motion.button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: 'spring', damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={imgSrc}
                alt={title}
                width={1600}
                height={1200}
                className={`max-w-full max-h-[90vh] object-contain ${blurred ? 'blur-md' : ''}`}
                unoptimized
              />
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white/30 text-xs"
            >
              Press Escape or click outside to close
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
