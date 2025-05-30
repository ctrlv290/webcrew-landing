"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { MaterialIcon } from "@/components/ui/material-icon"

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageSrc: string
  imageAlt: string
  title?: string
  category?: string
}

export default function ImageModal({ 
  isOpen, 
  onClose, 
  imageSrc, 
  imageAlt, 
  title, 
  category 
}: ImageModalProps) {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      // 배경 스크롤 방지
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* 배경 오버레이 */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* 모달 컨텐츠 */}
          <motion.div
            className="relative z-10 max-w-7xl max-h-[90vh] mx-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            {/* 닫기 버튼 */}
            <button
              onClick={onClose}
              className="absolute -top-16 right-0 bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:text-gray-900 w-12 h-12 rounded-full shadow-xl hover:shadow-2xl transition-all duration-200 z-20 flex items-center justify-center border border-gray-200/50 backdrop-blur-sm"
            >
              <MaterialIcon name="close" size="md" />
            </button>

            {/* 카테고리 배지 (있는 경우) */}
            {category && (
              <motion.div
                className="absolute -top-16 left-0 bg-primary text-black text-sm font-bold px-4 py-2 rounded-full shadow-xl border border-primary/20"
                initial={{ y: -20, opacity: 0, scale: 0.8 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 20 }}
              >
                {category}
              </motion.div>
            )}

            {/* 이미지 컨테이너 */}
            <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={1200}
                height={800}
                className="w-full h-auto object-contain max-h-[80vh]"
                priority
              />

              {/* 제목 오버레이 (있는 경우) */}
              {title && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="text-white text-xl font-bold">{title}</h3>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 