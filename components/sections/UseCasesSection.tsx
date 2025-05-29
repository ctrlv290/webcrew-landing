"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { MaterialIcon } from "@/components/ui/material-icon"
import SectionContainer from "@/components/common/SectionContainer"
import SectionHeader from "@/components/common/SectionHeader"
import { animations, viewportSettings } from "@/lib/animations"
import { useCases } from "@/lib/data/content"

export default function UseCasesSection() {
  return (
    <SectionContainer backgroundColor="#F9FAFB">
      <SectionHeader
        title={
          <>
            다양한 분야의 고객들이<br/><span className="text-primary">WebCrew와 함께</span>합니다
          </>
        }
        subtitle="업종과 규모에 상관없이 누구나 쉽게 원하는 웹사이트를 만들 수 있습니다"
        className="mb-10"
      />

      <motion.div
        className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        variants={animations.staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={viewportSettings}
      >
        {useCases.map((item, index) => {
          const backgroundImages = [
            "/images/cl-1.jpg",
            "/images/cl-2.jpg", 
            "/images/cl-3.jpg",
            "/images/cl-4.jpg"
          ];
          
          return (
            <motion.div
              key={index}
              className="custom-card group relative overflow-hidden"
              variants={animations.staggerItem}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 15, duration: 0.4 }}
            >
              {/* 최적화된 배경 이미지 */}
              <Image
                src={backgroundImages[index]}
                alt={`${item.title} 배경`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 80vw, 40vw"
                priority={index < 2} // 첫 번째 두 이미지만 우선 로딩
                quality={35} // 품질을 35%로 더 낮춤 (매우 공격적 압축)
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R1+lCNVZhQauafulI5kunQdQVdZGATa9HPDLd/eiIdf2v7bQlL5pL6cJDR2GBJe8ktWuOeKZuSkBTU6s+u/wf8AKJ1MAABF"
                loading={index < 2 ? "eager" : "lazy"} // 첫 두 개는 즉시, 나머지는 지연 로딩
                unoptimized={false} // Next.js 최적화 활성화
              />
              
              {/* 배경 오버레이 */}
              <div className="absolute inset-0 bg-black/70 group-hover:bg-black/60 transition-all duration-300 z-10"></div>
              
              {/* 콘텐츠 */}
              <div className="relative z-20">
                <motion.div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-md group-hover:shadow-lg transition-shadow">
                  {item.icon && <MaterialIcon name={item.icon} size="lg" className="text-black" />}
                </motion.div>
                <h3 className="text-base font-bold text-white mb-2 text-center">{item.title}</h3>
                <p className="text-primary font-medium mb-3 text-center">&ldquo;{item.desc}&rdquo;</p>
                <p className="text-white/90 text-center leading-relaxed text-sm">{item.detail}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </SectionContainer>
  )
} 