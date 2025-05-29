import React from 'react'
import { cn } from '@/lib/utils'

interface MaterialIconProps {
  name: string
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl'
}

const sizeClasses = {
  sm: 'text-base', // 16px
  md: 'text-xl',   // 20px
  lg: 'text-2xl',  // 24px
  xl: 'text-3xl',  // 30px
  '2xl': 'text-4xl' // 36px
}

export function MaterialIcon({ name, className, size = 'lg' }: MaterialIconProps) {
  return (
    <span 
      className={cn(
        'material-icons select-none',
        sizeClasses[size],
        className
      )}
    >
      {name}
    </span>
  )
} 