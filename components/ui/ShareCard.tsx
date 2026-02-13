'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoundResult } from '@/types';
import Button from './Button';
import { getTodayDateString } from '@/lib/daily';

interface ShareCardProps {
  rounds: RoundResult[];
  totalScore: number;
  mode: 'standard' | 'daily';
  date?: string;
}

function scoreToBlocks(score: number, max: number): string {
  const ratio = score / max;
  if (ratio >= 0.8) return '🟩🟩🟩';
  if (ratio >= 0.6) return '🟩🟩🟨';
  if (ratio >= 0.4) return '🟩🟨⬛️';
  if (ratio >= 0.2) return '🟨⬛️⬛️';
  if (ratio > 0) return '🟨⬛️⬛️';
  return '⬛️⬛️⬛️';
}

export default function ShareCard({ rounds, totalScore, mode, date }: ShareCardProps) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [sharing, setSharing] = useState(false);
  const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share;

  const generateShareText = () => {
    const dateStr = date || getTodayDateString();
    const lines = [
      `PaintingGuessr ${dateStr} ${totalScore.toLocaleString()}/50,000`,
      ...rounds.map(
        (r) =>
          `🌎${scoreToBlocks(r.locationScore, 5000)} 📅${scoreToBlocks(r.yearScore, 5000)}`
      ),
      '',
      'paintingguessr.com',
    ];
    return lines.join('\n');
  };

  const handleShare = async () => {
    if (sharing) return;
    setSharing(true);
    try {
      await navigator.share({ text: generateShareText() });
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== 'AbortError') {
        console.error('Share failed:', err);
      }
    } finally {
      setSharing(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateShareText());
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = generateShareText();
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <pre className="bg-[#0a0a14] rounded-lg p-4 text-sm text-[#f5f0e8]/70 whitespace-pre-wrap font-mono border border-[#2a2a4e]/60 leading-relaxed">
        {generateShareText()}
      </pre>
      <div className="relative flex gap-2 items-center">
        {canNativeShare ? (
          <>
            <Button onClick={handleShare} variant="secondary" size="sm">
              {shared ? 'Shared!' : 'Share Results'}
            </Button>
            <Button onClick={handleCopy} variant="secondary" size="sm">
              {copied ? 'Copied!' : 'Copy'}
            </Button>
          </>
        ) : (
          <Button onClick={handleCopy} variant="secondary" size="sm">
            {copied ? 'Copied!' : 'Copy Results'}
          </Button>
        )}
        {/* Inline toast */}
        <AnimatePresence>
          {copied && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="absolute right-0 top-1/2 -translate-y-1/2 text-xs text-green-400/80"
            >
              Copied to clipboard
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
