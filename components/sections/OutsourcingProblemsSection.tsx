"use client"

import { motion } from "framer-motion"
import { MaterialIcon } from "@/components/ui/material-icon"
import SectionContainer from "@/components/common/SectionContainer"
import SectionHeader from "@/components/common/SectionHeader"
import { animations, viewportSettings } from "@/lib/animations"
import { outsourcingProblems } from "@/lib/data/content"

export default function OutsourcingProblemsSection() {
  return (
    <SectionContainer backgroundColor="#FFFFFF">
      <SectionHeader
        title={
          <>
            많은 개발사는
            <br /><span className="text-primary">외부 하청에 일을 넘깁니다</span>
          </>
        }
        subtitle="외부 하청으로 인한 문제점으로 고객들이 다양한 어려움을 겪고 있습니다"
      />

      <motion.div
        className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16"
        variants={animations.staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={viewportSettings}
      >
        {outsourcingProblems.map((review, index) => (
          <motion.div
            key={index}
            className="relative p-5 rounded-2xl bg-white shadow-lg border-l-4 border-primary"
            style={{ transformOrigin: "top left" }}
            variants={animations.staggerItem}
            whileHover={{ 
              x: -8,
              y: -8, 
              boxShadow: "8px 16px 32px rgba(255, 176, 33, 0.3), 0 8px 24px rgba(255, 176, 33, 0.2)"
            }}
            transition={{ 
              boxShadow: { duration: 0.15, ease: "easeOut" },
              x: { duration: 0.25, ease: "easeOut", delay: 0.05 },
              y: { duration: 0.25, ease: "easeOut", delay: 0.05 }
            }}
          >
            <motion.div
              className="absolute top-3 left-3 w-6 h-6 rounded-full flex items-center justify-center bg-gray-100"
              initial={{ scale: 0, rotate: 180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index, type: "spring", stiffness: 400, damping: 10 }}
            >
              <MaterialIcon 
                name="error" 
                size="sm" 
                className="text-primary" 
              />
            </motion.div>

            <div className="ml-10">
              <h3 className="text-base font-bold text-gray-900 mb-2">{review.title}</h3>
              <p className="text-gray-700 mb-3 leading-relaxed text-sm">{review.content}</p>
              <motion.div
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                whileHover={{ scale: 1.05 }}
              >
                {review.author}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </SectionContainer>
  )
} 