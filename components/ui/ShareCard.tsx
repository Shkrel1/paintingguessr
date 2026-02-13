'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RoundResult } from '@/types';
import { getScoreEmoji, getRating } from '@/lib/scoring';
import Button from './Button';

interface ShareCardProps {
  rounds: RoundResult[];
  totalScore: number;
  mode: 'standard' | 'daily';
  date?: string;
}

export default function ShareCard({ rounds, totalScore, mode, date }: ShareCardProps) {
  const [copied, setCopied] = useState(false);

  const generateShareText = () => {
    const rating = getRating(totalScore);
    const lines = [
      `🎨 PaintingGuessr ${mode === 'daily' ? `Daily (${date})` : ''} — ${totalScore.toLocaleString()}/50,000 ${rating.emoji}`,
      '',
      ...rounds.map(
        (r, i) =>
          `🖼️ Round ${i + 1}: ${getScoreEmoji(r.locationScore, 5000)} | ${getScoreEmoji(r.yearScore, 5000)}`
      ),
      '',
      '🏛️ paintingguessr.com',
    ];
    return lines.join('\n');
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
      <div className="relative">
        <Button onClick={handleCopy} variant="secondary" size="sm">
          {copied ? 'Copied!' : 'Copy Results'}
        </Button>
        {/* Inline toast */}
        <AnimatePresence>
          {copied && (
            <motion.span
              initial={{ opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="absolute left-32 top-1/2 -translate-y-1/2 text-xs text-green-400/80"
            >
              Copied to clipboard
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
