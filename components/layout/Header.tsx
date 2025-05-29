import React, { memo } from 'react'
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Navigation from './Navigation'
import Link from "next/link"

interface HeaderProps {
  isAtTop: boolean
  isHeaderVisible: boolean
  onScrollToSection: (sectionId: string) => void
}

const navigationItems = [
  { label: "홈", id: "home" },
  { label: "서비스안내", id: "services" },
  { label: "AI견적", id: "pricing-calculator" },
  { label: "포트폴리오", id: "portfolio" },
  { label: "문의하기", id: "contact" },
]

// 텍스트 로고 컴포넌트
const TextLogo = ({ color }: { color: 'current' | 'primary' }) => (
  <span className={`font-bold text-2xl transition-colors duration-200 ${color === 'primary' ? 'text-primary' : 'text-gray-900'}`}>
    WebCrew
  </span>
)

const Header = memo(({ 
  isAtTop, 
  isHeaderVisible, 
  onScrollToSection 
}: HeaderProps) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ 
        y: isHeaderVisible ? 0 : -100,
        backgroundColor: isAtTop ? "rgba(255, 255, 255, 0)" : "rgba(255, 255, 255, 0.95)",
        backdropFilter: isAtTop ? "blur(0px)" : "blur(8px)",
        borderBottomColor: isAtTop ? "rgba(255, 255, 255, 0)" : "rgba(229, 231, 235, 0.5)",
        borderBottomWidth: isAtTop ? "0px" : "1px"
      }}
      transition={{ 
        duration: 0.15,
        ease: "easeOut",
        y: { duration: 0.3 }
      }}
      className="fixed top-0 w-full z-[9999] border-b-0"
      style={{
        borderBottomStyle: "solid"
      }}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link href="/">
            <TextLogo color={isAtTop ? 'current' : 'primary'} />
          </Link>
        </motion.div>

        <Navigation 
          items={navigationItems}
          onItemClick={onScrollToSection}
        />

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={() => onScrollToSection('contact')}
            className="bg-primary hover:bg-primary/90 text-black px-6 py-2 rounded-full font-semibold"
          >
            지금 상담 신청하기
          </Button>
        </motion.div>
      </div>
    </motion.header>
  )
})

Header.displayName = 'Header'

export default Header 