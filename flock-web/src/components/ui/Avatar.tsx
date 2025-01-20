'use client';

import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string;
  hexColor?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ src, hexColor = '#ccc', alt, size = 'md', className }: AvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-24 h-24',
  };

  return (
    <div
      className={cn(
        'rounded-full flex-shrink-0',
        sizeClasses[size],
        className
      )}
      style={{
        backgroundColor: hexColor,
        backgroundImage: src ? `url(${src})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      role="img"
      aria-label={alt}
    />
  );
} 