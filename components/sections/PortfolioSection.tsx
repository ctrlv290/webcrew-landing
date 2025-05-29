"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { MaterialIcon } from "@/components/ui/material-icon"
import SectionContainer from "@/components/common/SectionContainer"
import SectionHeader from "@/components/common/SectionHeader"
import ImageModal from "@/components/modals/ImageModal"
import { portfolioItems } from "@/lib/data/content"

// 상수 정의
const VISIBLE_CARDS = 2
const CARD_SCALE = {
  SELECTED: 1,
  MIN: 0.75,
  SCALE_FACTOR: 0.12
}

const CARD_SPACING = {
  MOBILE: 45,
  DESKTOP: 120
}

// 타입 정의
type CardPosition = {
  scale: number
  z: number
  rotateY: number
  rotateX: number
  x: number
  y: number
  opacity: number
}

export default function PortfolioSection() {
  const [selectedCard, setSelectedCard] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [dragStartX, setDragStartX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const handleCardClick = (index: number) => {
    if (index === selectedCard) {
      setIsModalOpen(true)
    } else {
      setSelectedCard(index)
    }
  }

  const nextCard = () => {
    setSelectedCard((prev) => (prev + 1) % portfolioItems.length)
  }

  const prevCard = () => {
    setSelectedCard((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length)
  }

  const handleDragStart = (event: any, info: any) => {
    setDragStartX(info.point.x)
    setIsDragging(true)
  }

  const handleDragEnd = (event: any, info: any) => {
    setIsDragging(false)
    const dragEndX = info.point.x
    const dragDistance = dragEndX - dragStartX

    if (Math.abs(dragDistance) > 100) {
      if (dragDistance > 0) {
        prevCard()
      } else {
        nextCard()
      }
    }
  }

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prevCard()
      if (e.key === 'ArrowRight') nextCard()
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  // 카드 위치 계산 함수
  const calculateCardPosition = (stackPosition: number, isSelected: boolean, isVisible: boolean): CardPosition => {
    const absPosition = Math.abs(stackPosition)
    const scale = isSelected ? CARD_SCALE.SELECTED : Math.max(CARD_SCALE.MIN, 1 - absPosition * CARD_SCALE.SCALE_FACTOR)
    
    return {
      scale,
      z: isSelected ? 100 : 50 - absPosition,
      rotateY: isSelected ? 0 : stackPosition * 2,
      rotateX: isSelected ? 0 : absPosition * 0.5,
      x: isSelected ? 0 : stackPosition * (window.innerWidth < 768 ? CARD_SPACING.MOBILE : CARD_SPACING.DESKTOP),
      y: isSelected ? 0 : absPosition * 25,
      opacity: isVisible ? (isSelected ? 1 : 0.6 - absPosition * 0.15) : 0
    }
  }

  return (
    <SectionContainer id="portfolio" backgroundColor="#FFFFFF">
      <SectionHeader
        title={
          <>
            다양한 분야의<br/><span className="text-primary">성공적인 프로젝트</span>
          </>
        }
        subtitle="다양한 업계의 클라이언트와 함께한 프로젝트들입니다."
        className="!mb-0"
      />

      {/* 카드 스택 컨테이너 */}
      <div className="relative w-full overflow-x-hidden">
        <div className="relative max-w-6xl mx-auto h-[700px] md:h-[700px] flex items-center justify-center">
          <div className="relative w-[85%] md:w-full max-w-4xl h-[500px] mx-auto md:mx-0">
            {portfolioItems.map((item, index) => {
              const isSelected = index === selectedCard
              const stackPosition = index - selectedCard
              const isVisible = Math.abs(stackPosition) <= VISIBLE_CARDS
              const cardPosition = calculateCardPosition(stackPosition, isSelected, isVisible)
              
              return (
                <motion.div
                  key={index}
                  className={`absolute w-full cursor-pointer ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
                  initial={false}
                  animate={cardPosition}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.2}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 35,
                    duration: 0.5
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: "1000px",
                    zIndex: cardPosition.z
                  }}
                  onClick={() => !isDragging && handleCardClick(index)}
                  whileHover={{
                    scale: isSelected ? 1.02 : cardPosition.scale + 0.02,
                    y: isSelected ? -8 : cardPosition.y - 12,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden h-[500px] transition-shadow duration-300 ${
                    isSelected 
                      ? 'shadow-2xl ring-2 ring-primary/20' 
                      : 'shadow-lg hover:shadow-xl'
                  }`}>
                    {/* 이미지 섹션 */}
                    <div className="relative h-64 overflow-hidden">
                      {/* 카테고리 배지 */}
                      <div className="absolute top-3 left-3">
                        <span className="bg-primary text-black text-xs font-bold px-2 py-1 rounded-full">
                          {item.category}
                        </span>
                      </div>
                      
                      {/* 기간 배지 */}
                      <div className="absolute top-3 right-3">
                        <span className="bg-white text-gray-800 text-xs font-semibold px-2 py-1 rounded shadow-sm">
                          {item.duration}
                        </span>
                      </div>

                      {/* 카드 번호 표시 (선택 안된 카드들용) */}
                      {!isSelected && (
                        <div className="absolute bottom-3 right-3">
                          <span className="bg-white text-gray-800 text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                            {index + 1}/{portfolioItems.length}
                          </span>
                        </div>
                      )}

                      {/* 선택된 카드 표시 및 확대 힌트 */}
                      {isSelected && (
                        <motion.div
                          className="absolute bottom-3 left-3"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <div className="bg-primary text-black text-xs font-bold px-2 py-1 rounded-full flex items-center">
                            <MaterialIcon name="zoom_in" size="sm" className="mr-1" />
                            클릭하여 확대
                          </div>
                        </motion.div>
                      )}
                      
                      <Image
                        src={item.image || "/images/pf-1.webp"}
                        alt={item.title}
                        width={500}
                        height={300}
                        className="w-full h-full object-cover"
                        onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                          e.currentTarget.src = "/images/pf-1.webp"
                        }}
                      />
                    </div>

                    {/* 콘텐츠 섹션 */}
                    <div className="p-6 h-[236px] flex flex-col">
                      <div className="flex-1">
                        <h3 className={`font-bold mb-3 ${isSelected ? 'text-xl text-gray-900' : 'text-lg text-gray-900'}`}>
                          {item.title}
                        </h3>
                        <p className={`text-gray-800 leading-relaxed mb-4 font-medium ${isSelected ? 'text-sm' : 'text-xs'}`}>
                          {isSelected ? item.desc : item.desc.slice(0, 80) + '...'}
                        </p>
                      </div>

                      {/* 기술 스택 */}
                      <div>
                        <p className="text-gray-700 text-xs font-semibold mb-2">사용 기술</p>
                        <div className="flex flex-wrap gap-1">
                          {item.tech.slice(0, isSelected ? item.tech.length : 3).map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="bg-primary/15 text-primary text-xs px-2 py-1 rounded-full font-semibold"
                            >
                              {tech}
                            </span>
                          ))}
                          {!isSelected && item.tech.length > 3 && (
                            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full font-semibold">
                              +{item.tech.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* 네비게이션 인디케이터 */}
        <div className="absolute bottom-4 md:bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2 overflow-hidden px-4 py-3">
          {portfolioItems.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleCardClick(index)}
              className={`w-2.5 md:w-3 h-2.5 md:h-3 rounded-full transition-all duration-300 ${
                index === selectedCard 
                  ? "bg-primary shadow-lg scale-125" 
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              whileHover={{ scale: index === selectedCard ? 1.25 : 1.1 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>

      {/* 안내 텍스트 */}
      <motion.div
        className="text-center mt-12 text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        선택된 카드를 클릭하면 이미지를 확대해서 볼 수 있습니다
      </motion.div>

      {/* 이미지 모달 */}
      <ImageModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageSrc={portfolioItems[selectedCard]?.image || ""}
        imageAlt={portfolioItems[selectedCard]?.title || ""}
        title={portfolioItems[selectedCard]?.title}
        category={portfolioItems[selectedCard]?.category}
      />
    </SectionContainer>
  )
} 