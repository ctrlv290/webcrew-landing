"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion, AnimatePresence, PanInfo } from "framer-motion"
import { MaterialIcon } from "@/components/ui/material-icon"
import SectionContainer from "@/components/common/SectionContainer"
import SectionHeader from "@/components/common/SectionHeader"
import ImageModal from "@/components/modals/ImageModal"
import { portfolioItems } from "@/lib/data/content"

export default function PortfolioSection() {
  const [selectedCard, setSelectedCard] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartPosition = useRef({ x: 0, y: 0 })

  const handleCardClick = (index: number) => {
    // 드래그 중이면 카드 변경만 수행 (모달 열지 않음)
    if (isDragging) {
      setIsDragging(false)
      return
    }

    // 선택된 카드를 클릭한 경우 모달 열기
    if (index === selectedCard) {
      setIsModalOpen(true)
    } else {
      // 다른 카드 클릭 시 해당 카드로 이동
      setSelectedCard(index)
    }
  }

  const nextCard = () => {
    setSelectedCard((prev) => (prev + 1) % portfolioItems.length)
  }

  const prevCard = () => {
    setSelectedCard((prev) => (prev - 1 + portfolioItems.length) % portfolioItems.length)
  }

  // 드래그 시작 핸들러
  const handleDragStart = (event: any, info: PanInfo) => {
    setIsDragging(false)
    dragStartPosition.current = { x: info.point.x, y: info.point.y }
  }

  // 드래그 중 핸들러
  const handleDrag = (event: any, info: PanInfo) => {
    const threshold = 5 // 드래그 감지 임계값 (픽셀)
    const deltaX = Math.abs(info.point.x - dragStartPosition.current.x)
    const deltaY = Math.abs(info.point.y - dragStartPosition.current.y)
    
    if (deltaX > threshold || deltaY > threshold) {
      setIsDragging(true)
    }
  }

  // 드래그 종료 핸들러
  const handleDragEnd = (event: any, info: PanInfo) => {
    const threshold = 50 // 카드 변경을 위한 드래그 임계값
    
    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > threshold) {
        prevCard() // 오른쪽으로 드래그 시 이전 카드
      } else if (info.offset.x < -threshold) {
        nextCard() // 왼쪽으로 드래그 시 다음 카드
      }
    }
    
    // 드래그 상태를 약간의 지연 후 리셋 (클릭 이벤트와의 충돌 방지)
    setTimeout(() => {
      setIsDragging(false)
    }, 100)
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

  return (
    <SectionContainer id="portfolio" backgroundColor="#FFFFFF">
      <SectionHeader
        title={
          <>
            다양한 분야의<br/><span className="text-primary">성공적인 프로젝트</span>
          </>
        }
        subtitle="6개월간 다양한 업계의 클라이언트와 함께한 프로젝트들입니다. 각 프로젝트마다 측정 가능한 성과를 달성했습니다."
      />

      {/* 카드 스택 컨테이너 */}
      <div className="relative max-w-6xl mx-auto h-[700px] flex items-center justify-center">
        <div className="relative w-full max-w-4xl h-[500px]">
          {portfolioItems.map((item, index) => {
            const isSelected = index === selectedCard
            const stackPosition = index - selectedCard
            const isVisible = Math.abs(stackPosition) <= 2
            
            return (
              <motion.div
                key={index}
                className={`absolute w-full cursor-pointer ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'}`}
                initial={false}
                animate={{
                  scale: isSelected ? 1 : Math.max(0.75, 1 - Math.abs(stackPosition) * 0.12),
                  z: isSelected ? 100 : 50 - Math.abs(stackPosition),
                  rotateY: isSelected ? 0 : stackPosition * 2,
                  rotateX: isSelected ? 0 : Math.abs(stackPosition) * 0.5,
                  x: isSelected ? 0 : stackPosition * 120, // 좌우 간격 더 확대 (60 → 120)
                  y: isSelected ? 0 : Math.abs(stackPosition) * 25,
                  opacity: isVisible ? (isSelected ? 1 : 0.6 - Math.abs(stackPosition) * 0.15) : 0
                }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 35,
                  duration: 0.5
                }}
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                  zIndex: isSelected ? 100 : 50 - Math.abs(stackPosition)
                }}
                onClick={() => handleCardClick(index)}
                drag={isSelected ? "x" : false} // 선택된 카드만 드래그 가능
                dragConstraints={{ left: -200, right: 200 }} // 드래그 제한
                dragElastic={0.3} // 드래그 탄성
                onDragStart={handleDragStart}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                whileHover={{
                  scale: isSelected ? 1.02 : Math.max(0.77, 1 - Math.abs(stackPosition) * 0.12 + 0.02),
                  y: isSelected ? -8 : Math.abs(stackPosition) * 25 - 12,
                  transition: { duration: 0.2 }
                }}
                whileDrag={{
                  scale: 1.05,
                  rotateZ: 0,
                  transition: { duration: 0.1 }
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
                        className="absolute bottom-3 left-3 flex items-center space-x-2"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="bg-primary text-black text-xs font-bold px-2 py-1 rounded-full flex items-center">
                          <MaterialIcon name="zoom_in" size="sm" className="mr-1" />
                          클릭하여 확대
                        </div>
                        <motion.div
                          className="bg-white text-gray-800 text-xs font-semibold px-2 py-1 rounded-full flex items-center shadow-sm"
                          animate={{ x: [-2, 2, -2] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                        >
                          <MaterialIcon name="drag_handle" size="sm" className="mr-1" />
                          드래그
                        </motion.div>
                      </motion.div>
                    )}
                    
                    <Image
                      src={item.image || "/images/pf-1.webp"}
                      alt={item.title}
                      width={500}
                      height={300}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/images/pf-1.webp";
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

        {/* 네비게이션 인디케이터 */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {portfolioItems.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleCardClick(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
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
        className="text-center mt-8 text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        선택된 카드를 클릭하면 이미지를 확대해서 볼 수 있습니다. 좌우로 드래그하여 프로젝트를 탐색해보세요
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