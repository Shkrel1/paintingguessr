'use client';

import { motion } from 'framer-motion';

interface GalleryLoaderProps {
  message?: string;
}

export default function GalleryLoader({ message = 'Loading...' }: GalleryLoaderProps) {
  return (
    <div className="min-h-screen bg-[#0f0f1a] flex flex-col items-center justify-center gap-6">
      {/* Animated frame outline */}
      <div className="relative w-20 h-24">
        <motion.div
          className="absolute inset-0 border-2 border-[#c9a84c]/40 rounded-sm"
          animate={{
            borderColor: ['rgba(201,168,76,0.2)', 'rgba(201,168,76,0.6)', 'rgba(201,168,76,0.2)'],
            scale: [1, 1.04, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute inset-2 border border-[#c9a84c]/20 rounded-sm"
          animate={{
            borderColor: ['rgba(201,168,76,0.1)', 'rgba(201,168,76,0.3)', 'rgba(201,168,76,0.1)'],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        />
        {/* Brush stroke accent */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-0.5 bg-[#c9a84c]/40 rounded-full"
          animate={{ scaleX: [0.5, 1, 0.5], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <motion.p
        className="text-[#f5f0e8]/50 text-sm"
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {message}
      </motion.p>
    </div>
  );
}
