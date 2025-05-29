import React from 'react'

// 성능 측정 유틸리티
export class PerformanceMonitor {
  private static instance: PerformanceMonitor
  private metrics: Map<string, number> = new Map()

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor()
    }
    return PerformanceMonitor.instance
  }

  // 성능 측정 시작
  startMeasure(name: string): void {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(`${name}-start`)
    }
  }

  // 성능 측정 종료 및 결과 반환
  endMeasure(name: string): number | null {
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.mark(`${name}-end`)
      window.performance.measure(name, `${name}-start`, `${name}-end`)
      
      const measure = window.performance.getEntriesByName(name, 'measure')[0]
      const duration = measure?.duration || 0
      
      this.metrics.set(name, duration)
      
      // 개발 환경에서만 로그 출력
      if (process.env.NODE_ENV === 'development') {
        console.log(`🚀 Performance: ${name} took ${duration.toFixed(2)}ms`)
      }
      
      return duration
    }
    return null
  }

  // 모든 메트릭 조회
  getAllMetrics(): Map<string, number> {
    return new Map(this.metrics)
  }

  // 특정 메트릭 조회
  getMetric(name: string): number | undefined {
    return this.metrics.get(name)
  }

  // 메트릭 초기화
  clearMetrics(): void {
    this.metrics.clear()
    if (typeof window !== 'undefined' && window.performance) {
      window.performance.clearMarks()
      window.performance.clearMeasures()
    }
  }
}

// 컴포넌트 렌더링 성능 측정을 위한 HOC
export function withPerformanceMonitor<T extends object>(
  WrappedComponent: React.ComponentType<T>,
  componentName?: string
) {
  const displayName = componentName || WrappedComponent.displayName || WrappedComponent.name

  return function PerformanceWrappedComponent(props: T) {
    const monitor = PerformanceMonitor.getInstance()
    
    React.useEffect(() => {
      monitor.startMeasure(`${displayName}-render`)
      
      return () => {
        monitor.endMeasure(`${displayName}-render`)
      }
    })

    return React.createElement(WrappedComponent, props)
  }
}

// 지연 로딩 성능 최적화
export function createOptimizedLazyComponent<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  componentName: string
) {
  const monitor = PerformanceMonitor.getInstance()
  
  return React.lazy(async () => {
    monitor.startMeasure(`${componentName}-load`)
    
    try {
      const component = await importFunc()
      monitor.endMeasure(`${componentName}-load`)
      return component
    } catch (error) {
      monitor.endMeasure(`${componentName}-load`)
      throw error
    }
  })
}

// 이미지 최적화를 위한 유틸리티
export function optimizeImageLoading() {
  if (typeof window === 'undefined') return

  // 이미지 preload 최적화
  const images = document.querySelectorAll('img[data-src]')
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement
        const src = img.getAttribute('data-src')
        
        if (src) {
          img.src = src
          img.removeAttribute('data-src')
          imageObserver.unobserve(img)
        }
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// 메모리 사용량 모니터링 (개발 환경)
export function monitorMemoryUsage(): void {
  if (process.env.NODE_ENV === 'development' && 'memory' in performance) {
    const memInfo = (performance as any).memory
    
    console.log('🧠 Memory Usage:', {
      used: `${(memInfo.usedJSHeapSize / 1048576).toFixed(2)} MB`,
      total: `${(memInfo.totalJSHeapSize / 1048576).toFixed(2)} MB`,
      limit: `${(memInfo.jsHeapSizeLimit / 1048576).toFixed(2)} MB`
    })
  }
}

// FPS 모니터링
export function createFPSMonitor() {
  if (typeof window === 'undefined') return null

  let fps = 0
  let lastTime = performance.now()
  let frameCount = 0

  function calculateFPS() {
    frameCount++
    const currentTime = performance.now()
    
    if (currentTime >= lastTime + 1000) {
      fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
      frameCount = 0
      lastTime = currentTime
      
      if (process.env.NODE_ENV === 'development') {
        console.log(`📊 FPS: ${fps}`)
      }
    }
    
    requestAnimationFrame(calculateFPS)
  }

  requestAnimationFrame(calculateFPS)
  
  return {
    getFPS: () => fps
  }
} 