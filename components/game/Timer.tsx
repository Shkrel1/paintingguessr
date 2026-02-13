'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface TimerProps {
  seconds: number;
  onExpire: () => void;
  paused?: boolean;
}

export default function Timer({ seconds, onExpire, paused }: TimerProps) {
  const [remaining, setRemaining] = useState(seconds);

  useEffect(() => {
    setRemaining(seconds);
  }, [seconds]);

  useEffect(() => {
    if (paused || remaining <= 0) return;

    const interval = setInterval(() => {
      setRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onExpire();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [paused, remaining, onExpire]);

  const percentage = (remaining / seconds) * 100;
  const isLow = remaining <= 10;
  const isCritical = remaining <= 5;

  const formatTime = useCallback((s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, []);

  return (
    <div className="flex items-center gap-2">
      <div className="relative w-24 h-1.5 rounded-full bg-[#2a2a4e] overflow-hidden">
        <motion.div
          className={`absolute left-0 top-0 h-full rounded-full ${
            isCritical ? 'bg-red-500' : isLow ? 'bg-red-400/80' : 'bg-[#c9a84c]'
          }`}
          animate={{
            width: `${percentage}%`,
            ...(isCritical ? { opacity: [1, 0.5, 1] } : {}),
          }}
          transition={{
            width: { duration: 0.8, ease: 'linear' },
            ...(isCritical ? { opacity: { duration: 0.5, repeat: Infinity } } : {}),
          }}
        />
      </div>
      <span
        className={`font-mono text-xs font-bold min-w-[2.5rem] text-right tabular-nums transition-colors duration-300 ${
          isCritical ? 'text-red-400' : isLow ? 'text-red-400/80' : 'text-[#f5f0e8]/60'
        }`}
      >
        {formatTime(remaining)}
      </span>
    </div>
  );
}
