"use client"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { MaterialIcon } from "@/components/ui/material-icon"
import { motion, useScroll, useTransform } from "framer-motion"
import { ModalProps } from "@/lib/types"

interface HeroSectionProps {
  onScrollToSection: (sectionId: string) => void
}

export default function HeroSection({ onScrollToSection }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3])

  return (
    <section
      id="home"
      ref={heroRef}
      className="h-screen flex items-center justify-center px-4 relative overflow-hidden"
      style={{
        backgroundImage: `url('/images/hero-bg.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        height: "100vh"
      }}
    >
      <div className="absolute inset-0 bg-white/85 backdrop-blur-sm" />

      <motion.div
        className="container mx-auto text-center max-w-5xl relative z-10"
        style={{
          y,
          opacity,
          willChange: 'transform, opacity'
        }}
      >
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight md:leading-normal lg:leading-relaxed"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          비전문가도 이해할 수 있는
          <br />웹 제작{" "}
          <motion.span
            className="text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            WebCrew{" "}
          </motion.span>
          가 함께합니다.
        </motion.h1>

        <motion.p
          className="text-xl sm:text-2xl md:text-3xl text-gray-600 mb-12 max-w-3xl mx-auto font-medium"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          상담부터 제작, 유지보수까지 원스톱으로
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={() => onScrollToSection('contact')}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-black px-8 py-4 rounded-full text-lg shadow-lg font-semibold pulse-button"
          >
            무료 상담 요청하기
            <motion.div
              className="ml-2 flex items-center"
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <MaterialIcon name="arrow_forward" size="md" className="align-middle" />
            </motion.div>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
} 