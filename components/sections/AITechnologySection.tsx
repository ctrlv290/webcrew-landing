"use client"

import Image from "next/image"
import { motion, useMotionValue, useTransform, animate, useInView } from "framer-motion"
import { useEffect, useRef } from "react"
import SectionContainer from "@/components/common/SectionContainer"
import SectionHeader from "@/components/common/SectionHeader"
import { animations, viewportSettings } from "@/lib/animations"
import { aiTechnologyFeatures } from "@/lib/data/content"

// 카운팅 애니메이션 컴포넌트
function AnimatedCounter({ value, label, index }: { value: string, label: string, index: number }) {
  const count = useMotionValue(0)
  const rounded = useTransform(count, (latest) => {
    // 숫자와 단위 분리
    const numericValue = parseFloat(value)
    const unit = value.replace(/[\d.]/g, '')
    
    if (unit === '%') {
      return Math.round(latest) + '%'
    } else if (unit === '+') {
      return Math.round(latest) + '+'
    } else {
      return Math.round(latest).toString()
    }
  })

  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const numericValue = parseFloat(value)
      const controls = animate(count, numericValue, {
        duration: 2,
        delay: 0.3 + (0.1 * index),
        ease: "easeOut"
      })
      
      return controls.stop
    }
  }, [isInView, value, count, index])

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-2xl p-6 text-center shadow-lg border border-gray-100"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay: 0.1 * index,
        type: "spring",
        stiffness: 400,
        damping: 10
      }}
    >
      <motion.div
        className="text-3xl md:text-4xl font-bold text-primary mb-2"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.8, 
          delay: 0.1 + (0.1 * index),
          type: "spring",
          stiffness: 600,
          damping: 12
        }}
      >
        {rounded}
      </motion.div>
      <div className="text-sm font-medium text-gray-700">
        {label}
      </div>
    </motion.div>
  )
}

export default function AITechnologySection() {
  // 통계 데이터
  const stats = [
    { value: "40%", label: "개발 시간 단축" },
    { value: "95%", label: "버그 사전 감지율" },
    { value: "60%", label: "유지보수 비용 절감" },
    { value: "5+", label: "전문 AI 도구 통합" }
  ]

  return (
    <SectionContainer id="ai-estimate" backgroundColor="#F9FAFB">
      <SectionHeader
        title={
          <>
            <span className="text-primary">AI 기술</span>로 더 빠르고 정확한
            <br />웹 개발을 경험하세요
          </>
        }
        subtitle="최신 AI 기술을 활용하여 개발 시간을 단축하고, 더 나은 품질의 웹사이트를 제공합니다"
      />

      <motion.div
        className="grid md:grid-cols-3 gap-6 mb-16"
        variants={animations.staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={viewportSettings}
      >
        {aiTechnologyFeatures.map((item, index) => (
          <motion.div
            key={index}
            className="custom-card group overflow-hidden p-0"
            variants={animations.staggerItem}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, duration: 0.4 }}
          >
            <div className="w-full h-40 bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <Image
                src={item.icon}
                alt={item.title}
                width={80}
                height={60}
                className="w-full h-full object-cover opacity-80"
              />
            </div>
            
            <div className="p-6">
              <h3 className="text-base font-bold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-gray-600 mb-4 leading-relaxed text-sm">{item.description}</p>
              {item.features && (
                <ul className="space-y-1">
                  {item.features.map((feature, featureIndex) => (
                    <motion.li
                      key={featureIndex}
                      className="flex items-center text-gray-700 text-xs"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * featureIndex }}
                    >
                      <span className="material-icons text-primary mr-1 flex-shrink-0" style={{ fontSize: '12px', lineHeight: '12px' }}>
                        download_done
                      </span>
                      {feature}
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* AI 기술 통계 섹션 */}
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {stats.map((stat, index) => (
          <AnimatedCounter
            key={index}
            value={stat.value}
            label={stat.label}
            index={index}
          />
        ))}
      </motion.div>
    </SectionContainer>
  )
} 