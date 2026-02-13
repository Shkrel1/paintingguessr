'use client';

import { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  icon?: ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  icon,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#1a1a2e] disabled:opacity-40 disabled:cursor-not-allowed disabled:pointer-events-none';

  const variants = {
    primary:
      'bg-gradient-to-r from-[#c9a84c] to-[#b8942f] text-[#0f0f1a] hover:from-[#d4b555] hover:to-[#c9a84c] focus:ring-[#c9a84c] shadow-lg shadow-[#c9a84c]/10',
    secondary:
      'bg-[#16213e]/80 text-[#f5f0e8] border border-[#2a2a4e] hover:bg-[#1e2d50] hover:border-[#3a3a5e] focus:ring-[#2a2a4e] backdrop-blur-sm',
    ghost:
      'bg-transparent text-[#f5f0e8] hover:bg-white/10 focus:ring-white/20',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base tracking-wide',
  };

  return (
    <motion.button
      whileHover={disabled ? undefined : { scale: 1.03, y: -1 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {children}
      {icon && <span className="ml-1">{icon}</span>}
    </motion.button>
  );
}
