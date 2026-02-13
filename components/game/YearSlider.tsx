'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface YearSliderProps {
  onYearChange: (year: number) => void;
  selectedYear: number | null;
  disabled?: boolean;
  showResult?: boolean;
  actualYear?: number;
}

const MIN_YEAR = 1300;
const MAX_YEAR = 2000;
const CENTURIES = [1300, 1400, 1500, 1600, 1700, 1800, 1900, 2000];

export default function YearSlider({
  onYearChange,
  selectedYear,
  disabled,
  showResult,
  actualYear,
}: YearSliderProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!disabled) {
        onYearChange(parseInt(e.target.value));
      }
    },
    [disabled, onYearChange]
  );

  const yearPosition = (year: number) =>
    ((year - MIN_YEAR) / (MAX_YEAR - MIN_YEAR)) * 100;

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[#f5f0e8]/50 font-medium">Year</span>
        <AnimatePresence mode="wait">
          {selectedYear !== null ? (
            <motion.span
              key="year"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className={`text-2xl font-mono font-bold tabular-nums transition-colors duration-200 ${isDragging ? 'text-[#c9a84c]' : 'text-[#f5f0e8]'}`}
            >
              {selectedYear}
            </motion.span>
          ) : (
            <motion.span
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-lg text-[#f5f0e8]/25 font-mono"
            >
              Select a year
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      <div className="relative pt-2 pb-6">
        {/* Track background with filled portion */}
        <div className="absolute top-[14px] left-0 right-0 h-1.5 rounded-full bg-[#2a2a4e] overflow-hidden">
          {selectedYear !== null && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${yearPosition(selectedYear)}%` }}
              transition={{ duration: 0.1 }}
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#c9a84c]/60 to-[#c9a84c] rounded-full"
            />
          )}
        </div>

        <input
          type="range"
          min={MIN_YEAR}
          max={MAX_YEAR}
          step={1}
          value={selectedYear ?? 1650}
          onChange={handleChange}
          onMouseDown={() => {
            setIsDragging(true);
            if (selectedYear === null) onYearChange(1650);
          }}
          onMouseUp={() => setIsDragging(false)}
          onTouchStart={() => {
            setIsDragging(true);
            if (selectedYear === null) onYearChange(1650);
          }}
          onTouchEnd={() => setIsDragging(false)}
          disabled={disabled}
          className="year-slider relative w-full h-6 appearance-none cursor-pointer bg-transparent disabled:opacity-50 disabled:cursor-not-allowed z-10"
          aria-label="Select year"
        />

        {/* Century markers */}
        <div className="relative w-full mt-0.5">
          {CENTURIES.map((century) => (
            <div
              key={century}
              className="absolute -translate-x-1/2 flex flex-col items-center"
              style={{ left: `${yearPosition(century)}%` }}
            >
              <div className="w-px h-2 bg-[#f5f0e8]/15" />
              <span className="text-[9px] text-[#f5f0e8]/25 mt-0.5 font-mono tabular-nums">
                {century}
              </span>
            </div>
          ))}
        </div>

        {/* Result comparison marker */}
        {showResult && actualYear && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="absolute top-[10px] w-3.5 h-3.5 rounded-full bg-green-400 border-2 border-[#0f0f1a] -translate-x-1/2 z-20 pointer-events-none shadow-[0_0_8px_rgba(74,222,128,0.4)]"
            style={{ left: `${yearPosition(actualYear)}%` }}
            title={`Actual: ${actualYear}`}
          />
        )}
      </div>

      <style jsx>{`
        .year-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: linear-gradient(145deg, #dbb85c, #b8942f);
          cursor: pointer;
          border: 2.5px solid #f5f0e8;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4), 0 0 12px rgba(201, 168, 76, 0.15);
          transition: transform 0.15s ease, box-shadow 0.15s ease;
        }
        .year-slider::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(201, 168, 76, 0.25);
        }
        .year-slider::-webkit-slider-thumb:active {
          transform: scale(1.2);
        }
        .year-slider::-webkit-slider-runnable-track {
          height: 6px;
          background: transparent;
        }
        .year-slider::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: linear-gradient(145deg, #dbb85c, #b8942f);
          cursor: pointer;
          border: 2.5px solid #f5f0e8;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4), 0 0 12px rgba(201, 168, 76, 0.15);
        }
        .year-slider::-moz-range-track {
          height: 6px;
          background: transparent;
        }
      `}</style>
    </div>
  );
}
