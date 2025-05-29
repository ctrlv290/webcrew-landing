import { useState, useEffect, useCallback } from 'react'

// 스크롤 이벤트 최적화를 위한 throttle 함수
function throttle<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null
  let lastExecTime = 0
  
  return (...args: Parameters<T>) => {
    const currentTime = Date.now()
    
    if (currentTime - lastExecTime > delay) {
      func(...args)
      lastExecTime = currentTime
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(() => {
        func(...args)
        lastExecTime = Date.now()
      }, delay - (currentTime - lastExecTime))
    }
  }
}

export function useScrollOptimization() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true)
  const [isAtTop, setIsAtTop] = useState(true)
  const [scrollY, setScrollY] = useState(0)

  const handleScroll = useCallback(
    throttle(() => {
      const currentScrollY = Math.max(0, window.scrollY) // 음수 방지
      setScrollY(currentScrollY)
      
      // 네비게이션바 항상 보이기
      setIsHeaderVisible(true)
      
      // 15px 이하일 때 최상단으로 간주 (더 민감한 감지)
      setIsAtTop(currentScrollY <= 15)
    }, 8), // 더 빠른 반응을 위해 8ms 간격 (120fps)
    []
  )

  // 초기 로드 시와 리사이즈 시 스크롤 위치 재확인
  const checkInitialScroll = useCallback(() => {
    const currentScrollY = Math.max(0, window.scrollY)
    setScrollY(currentScrollY)
    setIsHeaderVisible(true) // 항상 보이기
    setIsAtTop(currentScrollY <= 15)
  }, [])

  useEffect(() => {
    // passive 옵션으로 성능 개선
    const options = { passive: true }
    window.addEventListener('scroll', handleScroll, options)
    window.addEventListener('resize', checkInitialScroll, options)
    
    // 초기 상태 설정 (즉시 확인)
    checkInitialScroll()
    // 렌더링 완료 후 한 번 더 확인
    setTimeout(checkInitialScroll, 50)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkInitialScroll)
    }
  }, [handleScroll, checkInitialScroll])

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start',
        // 성능을 위해 inline 옵션 제거
      })
    }
  }, [])

  return {
    isHeaderVisible,
    isAtTop,
    scrollY,
    scrollToSection
  }
} 