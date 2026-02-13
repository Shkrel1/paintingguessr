'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

const SHOWCASE_PAINTINGS = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/600px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/400px-1665_Girl_with_a_Pearl_Earring.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/600px-The_Night_Watch_-_HD.jpg',
  'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Tsunami_by_hokusai_19th_century.jpg/600px-Tsunami_by_hokusai_19th_century.jpg',
];

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#0f0f1a] text-[#f5f0e8] flex flex-col items-center justify-center relative overflow-hidden">
      {/* Background spotlight glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#c9a84c]/[0.03] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#1a1a4e]/20 rounded-full blur-[100px]" />
      </div>

      {/* Floating painting thumbnails */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {SHOWCASE_PAINTINGS.map((url, i) => (
          <motion.div
            key={i}
            className="absolute opacity-[0.04] rounded-sm overflow-hidden"
            style={{
              width: 120 + i * 20,
              height: 90 + i * 15,
              left: `${15 + i * 20}%`,
              top: `${20 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -15 - i * 5, 0],
              rotate: [-2 + i, 2 - i, -2 + i],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="w-full h-full object-cover" />
          </motion.div>
        ))}
      </div>

      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle, #c9a84c 0.5px, transparent 0.5px)`,
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="relative z-10 text-center px-6 w-full"
      >
        {/* Title */}
        <h1 className="font-serif font-bold mb-2 tracking-tight text-[clamp(2rem,11vw,8rem)] whitespace-nowrap">
          <span className="text-[#f5f0e8]">Painting</span>
          <span className="text-[#c9a84c]">Guessr</span>
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-base italic text-[#c9a84c]/60 font-serif mb-3"
        >
          Guess where. Guess when.
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-base text-[#f5f0e8]/50 mb-12 max-w-sm mx-auto leading-relaxed"
        >
          Test your art history knowledge across 700 years of masterworks from the world&apos;s great collections.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button
            onClick={() => router.push('/daily')}
            size="lg"
            className="min-w-[200px] text-base bg-gradient-to-r from-[#e08a2c] to-[#c96f1a] hover:from-[#eb9535] hover:to-[#d47a22] shadow-[#e08a2c]/10 focus:ring-[#e08a2c]"
          >
            Daily Challenge
          </Button>
          <Button
            onClick={() => router.push('/play')}
            variant="secondary"
            size="lg"
            className="min-w-[200px] text-base"
          >
            Endless Mode
          </Button>
        </motion.div>

        {/* Stats line */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="mt-14 flex items-center justify-center gap-6 text-xs text-[#f5f0e8]/25"
        >
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#c9a84c]/40" />
            5 rounds
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#c9a84c]/40" />
            Location + Year
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1 h-1 rounded-full bg-[#c9a84c]/40" />
            50,000 points
          </span>
        </motion.div>
      </motion.div>

      {/* Footer links */}
      <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-4 text-[10px] text-[#f5f0e8]/25">
        <Link href="/terms" className="hover:text-[#f5f0e8]/50 transition-colors">
          Terms of Use
        </Link>
        <span>·</span>
        <Link href="/privacy" className="hover:text-[#f5f0e8]/50 transition-colors">
          Privacy Policy
        </Link>
      </div>

      {/* Decorative frame corners */}
      <div className="absolute top-6 left-6 w-12 h-12 border-t border-l border-[#c9a84c]/15" />
      <div className="absolute top-6 right-6 w-12 h-12 border-t border-r border-[#c9a84c]/15" />
      <div className="absolute bottom-6 left-6 w-12 h-12 border-b border-l border-[#c9a84c]/15" />
      <div className="absolute bottom-6 right-6 w-12 h-12 border-b border-r border-[#c9a84c]/15" />
    </div>
  );
}
