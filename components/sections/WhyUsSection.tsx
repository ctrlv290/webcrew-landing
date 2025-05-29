"use client"

import { motion } from "framer-motion"
import { MaterialIcon } from "@/components/ui/material-icon"
import SectionContainer from "@/components/common/SectionContainer"
import { animations, viewportSettings } from "@/lib/animations"
import { whyUsFeatures } from "@/lib/data/content"

export default function WhyUsSection() {
  return (
    <SectionContainer backgroundColor="#F9FAFB" className="min-h-screen">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        왜 <span className="text-primary">WebCrew</span>를 선택해야 할까요?
      </motion.h2>

      <motion.div
        className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto"
        variants={animations.staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={viewportSettings}
      >
        {whyUsFeatures.map((item, index) => (
          <motion.div
            key={index}
            className="relative p-6 rounded-3xl bg-white border border-gray-100 shadow-xl backdrop-blur-sm overflow-hidden group"
            variants={animations.staggerItem}
            whileHover={{ 
              y: -15, 
              scale: 1.05,
              rotateY: 5,
              boxShadow: "0 25px 50px -12px rgba(255, 176, 33, 0.25)"
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 0.05 }}
            />

            <motion.div className="text-center mb-4">
              <MaterialIcon name={item.icon} size="xl" className="text-primary" />
            </motion.div>

            <div className="text-center relative z-10">
              <motion.h3 
                className="font-bold text-gray-900 mb-3 text-lg group-hover:text-gray-800 transition-colors"
                whileHover={{ scale: 1.05 }}
              >
                {item.title}
              </motion.h3>
              <motion.p 
                className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
              >
                {item.desc}
              </motion.p>
            </div>

            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-primary/80 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
            />

            <motion.div
              className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary to-primary/80 opacity-0 group-hover:opacity-10 blur-xl -z-10"
              whileHover={{ opacity: 0.1 }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* 자체 인력 솔루션 섹션 */}
      <div className="mt-16">
        <div className="bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 text-white relative overflow-hidden max-w-5xl mx-auto">
          <div className="w-full">
            <div className="inline-flex items-center bg-white/20 px-3 py-1 rounded-full mb-4">
              <MaterialIcon name="verified" size="sm" className="text-white mr-2" />
              <span className="text-white font-medium text-sm">우리의 차이점</span>
            </div>

            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-white">WebCrew는</span>{" "}
              <span className="bg-emerald-400 text-black px-3 py-1 rounded-xl">자체 인력으로만</span>{" "}
              <span className="text-white">개발합니다</span>
            </h3>

            <p className="text-white/90 text-lg leading-relaxed mb-6 max-w-3xl">
              모든 과정을 직접 관리하고 소통하여 외부 하청의 문제들을 원천 차단합니다. 
              투명한 개발 과정과 정직한 커뮤니케이션으로 고객 만족을 최우선으로 생각합니다.
            </p>

            <div className="grid md:grid-cols-4 gap-4">
              {[
                { icon: "security", title: "외부 하청 금지", desc: "모든 프로젝트는 내부 전문가가 직접 수행합니다." },
                { icon: "chat", title: "직접 소통", desc: "외부 업체 없이 담당자와 직접 소통" },
                { icon: "schedule", title: "일정 준수", desc: "약속된 일정을 100% 지키는 시스템" },
                { icon: "block", title: "추가 비용 없음", desc: "계약 후 추가 비용 일체 없음" }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <MaterialIcon name={item.icon} size="lg" className="text-white" />
                  </div>
                  <h4 className="font-bold mb-2">{item.title}</h4>
                  <p className="text-white/80 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  )
} 