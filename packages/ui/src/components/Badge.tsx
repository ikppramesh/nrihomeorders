import React from 'react';
import { cn } from '../utils/cn';

type Variant = 'default' | 'success' | 'warning' | 'error' | 'info' | 'purple';

const variants: Record<Variant, string> = {
  default:  'bg-gray-100 text-gray-800',
  success:  'bg-green-100 text-green-800',
  warning:  'bg-yellow-100 text-yellow-800',
  error:    'bg-red-100 text-red-800',
  info:     'bg-blue-100 text-blue-800',
  purple:   'bg-purple-100 text-purple-800',
};

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium', variants[variant], className)}>
      {children}
    </span>
  );
}
