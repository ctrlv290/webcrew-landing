import { Variants } from "framer-motion"

// 공통 애니메이션 Variants
export const animations = {
  // Fade in up 애니메이션
  fadeInUp: {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  } as Variants,

  // Stagger 컨테이너
  staggerContainer: {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  } as Variants,

  // Stagger 아이템
  staggerItem: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  } as Variants,

  // 카드 호버
  cardHover: {
    hover: { 
      y: -10, 
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  } as Variants,

  // 섹션 타이틀
  sectionTitle: {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
  } as Variants,

  // 버튼 애니메이션
  button: {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  } as Variants,
}

// 공통 트랜지션
export const transitions = {
  spring: {
    type: "spring" as const,
    stiffness: 400,
    damping: 10
  },
  
  springSmooth: {
    type: "spring" as const,
    stiffness: 300,
    damping: 20
  },

  smooth: {
    duration: 0.3,
    ease: "easeInOut" as const
  }
}

// Viewport 설정
export const viewportSettings = {
  once: true,
  amount: 0.3 as const
} 