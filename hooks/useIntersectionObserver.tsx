import React, { useState, useEffect, useRef, useCallback } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true
  } = options

  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  const callbackFunction = useCallback((entries: IntersectionObserverEntry[]) => {
    const [entry] = entries
    
    if (entry.isIntersecting) {
      setIsIntersecting(true)
      if (triggerOnce) {
        setHasTriggered(true)
      }
    } else if (!triggerOnce) {
      setIsIntersecting(false)
    }
  }, [triggerOnce])

  useEffect(() => {
    const element = elementRef.current
    if (!element || (triggerOnce && hasTriggered)) return

    const observer = new IntersectionObserver(callbackFunction, {
      threshold,
      rootMargin,
    })

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [callbackFunction, threshold, rootMargin, triggerOnce, hasTriggered])

  return { elementRef, isIntersecting: triggerOnce ? (hasTriggered || isIntersecting) : isIntersecting }
}

interface LazyComponentProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  options?: UseIntersectionObserverOptions
}

// 지연 로딩을 위한 컴포넌트 래퍼
export function LazyComponent({ 
  children, 
  fallback = null,
  options = {}
}: LazyComponentProps) {
  const { elementRef, isIntersecting } = useIntersectionObserver(options)

  return (
    <div ref={elementRef}>
      {isIntersecting ? children : fallback}
    </div>
  )
} 