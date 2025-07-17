'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
}

export const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative w-full h-3 rounded-full bg-gray-200 overflow-hidden",
          className
        )}
        {...props}
      >
        <div
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-600 to-blue-600 transition-all duration-500 ease-out"
          style={{ width: `${value}%` }}
        />
      </div>
    );
  }
);

Progress.displayName = 'Progress';