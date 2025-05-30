"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { MaterialIcon } from "@/components/ui/material-icon"
import SectionContainer from "@/components/common/SectionContainer"
import SectionHeader from "@/components/common/SectionHeader"
import { animations, viewportSettings } from "@/lib/animations"

const PricingCalculatorSection = () => {
  return (
    <SectionContainer id="pricing-calculator" backgroundColor="#FFFFFF">
      <SectionHeader
        title={
          <>
            정확한 외주 개발 비용을
            <br /><span className="text-primary">AI로 계산</span>해보세요
          </>
        }
        subtitle="일반 개발 방식과 AI 개발 방식의 비용을 비교하여 얼마나 절감할 수 있는지 확인해보세요"
        className="mb-16"
      />

      <div className="max-w-6xl mx-auto">
        <motion.div
          className="grid lg:grid-cols-[2fr_auto_2fr] gap-8 items-center overflow-x-hidden lg:overflow-x-visible"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* 왼쪽: 프로세스 단계 - 계산기 디자인 */}
          <motion.div
            className="bg-white rounded-3xl p-8 sm:shadow-2xl border-4 border-gray-300 max-w-sm sm:max-w-xl mx-auto"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div
              className="space-y-4"
              variants={animations.staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={viewportSettings}
            >
              <motion.h3 
                className="text-lg font-bold text-gray-900 mb-4 text-center"
                variants={animations.staggerItem}
              >
                <MaterialIcon name="calculate" size="sm" className="text-primary mr-2 inline-block" />
                외주 개발 견적 계산기
              </motion.h3>

              {/* 계산기 LCD 디스플레이 */}
              <motion.div
                className="bg-black rounded-xl p-3 mb-4 border border-gray-600"
                variants={animations.staggerItem}
              >
                <div className="bg-green-900/30 rounded-lg p-2 font-mono">
                  <div className="text-green-400 text-xs mb-1">견적 계산 준비중...</div>
                  <div className="text-green-300 text-right text-base font-bold">READY</div>
                  <div className="text-green-400 text-xs text-right">AI 계산기</div>
                </div>
              </motion.div>

              {/* 3단계 프로세스를 계산기 버튼 스타일로 */}
              {[
                {
                  number: "1",
                  title: "요구사항 입력",
                  description: "간단한 프로젝트의 요구사항을 자연어로 설명하세요"
                },
                {
                  number: "2", 
                  title: "AI 견적 계산",
                  description: "AI가 업계 기준과 경험을 바탕으로 정확한 견적을 계산합니다"
                },
                {
                  number: "3",
                  title: "상세 비용 분석",
                  description: "항목별 상세 비용 분석과 함께 개발 기간 예상을 확인하세요"
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-100 rounded-xl p-3 border-2 border-gray-300 hover:border-primary transition-all duration-200"
                  variants={animations.staggerItem}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, duration: 0.4 }}
                >
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-black font-bold text-sm shadow-lg">
                      {step.number}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">{step.title}</h4>
                      <p className="text-gray-600 leading-relaxed text-xs">{step.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* 계산기 시작 버튼 */}
              <motion.div
                className="pt-3"
                variants={animations.staggerItem}
              >
                <a
                  href="https://chatgpt.com/g/g-6837c0a4a6008191a85b188c43ba0f3f-webcrew-gyeonjeog-gyesangi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full"
                >
                  <Button
                    type="button"
                    className="w-full bg-primary hover:bg-primary/90 text-black px-4 py-3 rounded-xl font-bold shadow-xl border-2 border-gray-300 pulse-button text-sm"
                    style={{ animation: "pulse-shadow 2.5s infinite" }}
                  >
                    <MaterialIcon name="calculate" size="sm" className="mr-1" />
                    무료로 견적 계산하기
                    <motion.div
                      className="ml-1 flex items-center"
                      animate={{ x: [0, 5, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <MaterialIcon name="arrow_forward" size="sm" />
                    </motion.div>
                  </Button>
                </a>
              </motion.div>

              {/* 계산기 브랜드 */}
              <motion.div
                className="text-center text-gray-400 text-xs font-mono"
                variants={animations.staggerItem}
              >
                WebCrew Calculator Pro
              </motion.div>
            </motion.div>
          </motion.div>

          {/* 중간: 화살표 */}
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div
              className="bg-primary rounded-full p-4 shadow-lg w-16 h-16 flex items-center justify-center relative"
              style={{
                boxShadow: "rgba(246, 170, 32, 0.38) 0px 9.59114px 14.3867px -2.86371px, rgba(246, 170, 32, 0.282) 0px 3.86371px 5.86371px -1.93186px"
              }}
              animate={{ 
                boxShadow: [
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  "0 10px 15px -3px rgba(255, 176, 33, 0.4), 0 4px 6px -2px rgba(255, 176, 33, 0.3)",
                  "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                ]
              }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.2,
                ease: "easeInOut"
              }}
            >
              <motion.div
                className="absolute inset-0 bg-primary rounded-full"
                animate={{ 
                  scale: [1, 1.15, 1],
                  opacity: [0.8, 0.3, 0.8]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 1.2,
                  ease: "easeInOut"
                }}
              />
              
              <div className="relative z-10 flex items-center justify-center w-full h-full">
                {/* 데스크톱 화살표 */}
                <div className="hidden md:flex items-center justify-center w-full">
                  <MaterialIcon 
                    name="arrow_forward" 
                    size="xl" 
                    className="text-black" 
                  />
                </div>
                {/* 모바일 화살표 */}
                <div className="flex md:hidden items-center justify-center w-full">
                  <MaterialIcon 
                    name="arrow_downward" 
                    size="xl" 
                    className="text-black" 
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* 오른쪽: 견적서 - 영수증 디자인 */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white rounded-lg sm:shadow-2xl border border-gray-300 relative max-w-xs sm:max-w-md mx-auto h-auto sm:h-[600px] flex flex-col overflow-hidden">
              {/* 영수증 상단 톱니 효과 */}
              <div className="w-full h-6 bg-gray-100 relative flex-shrink-0">
                <div className="absolute top-2 left-0 w-full h-0 flex justify-center">
                  <div className="flex space-x-3">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="w-1.5 h-1.5 bg-white rounded-full border border-gray-300"
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 flex-1 flex flex-col justify-between">
                {/* 영수증 헤더 */}
                <div className="text-center border-b-2 border-dashed border-gray-300 pb-3 mb-3">
                  <h3 className="text-base font-bold text-gray-900 mb-1">WebCrew Development</h3>
                  <p className="text-xs text-gray-500">견적서 #WC2024-001</p>
                  <p className="text-xs text-gray-500">{new Date().toLocaleDateString('ko-KR')}</p>
                </div>

                {/* 영수증 항목들 */}
                <div className="space-y-2 mb-4 text-sm flex-1">
                  {[
                    { title: "프론트엔드 개발", original: "₩5,500,000", discounted: "₩5,200,000" },
                    { title: "백엔드 API 개발", original: "₩5,000,000", discounted: "₩4,800,000" },
                    { title: "데이터베이스 설계", original: "₩2,500,000", discounted: "₩1,800,000" },
                    { title: "서버 구축 및 배포", original: "₩1,300,000", discounted: "₩1,200,000" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex justify-between items-start border-b border-dashed border-gray-200 pb-2"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <div className="flex-1">
                        <div className="text-xs font-medium text-gray-800">{item.title}</div>
                        <div className="text-xs text-red-500 line-through">{item.original}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-gray-900">{item.discounted}</div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* 할인 정보 */}
                <div className="border-t-2 border-dashed border-gray-400 pt-3 mb-3">
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="text-gray-600">소계</span>
                    <span className="text-gray-900">₩14,300,000</span>
                  </div>
                  <div className="flex justify-between items-center text-sm mb-1">
                    <span className="text-red-600">AI 개발 할인</span>
                    <span className="text-red-600">-₩1,300,000</span>
                  </div>
                </div>

                {/* 총액 */}
                <motion.div
                  className="border-t-4 border-double border-gray-800 pt-3 bg-gray-50 -mx-4 px-4 py-3"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="flex justify-between items-center">
                    <span className="text-base font-bold text-gray-900">총 견적 금액</span>
                    <div className="text-right">
                      <div className="text-xl font-bold text-primary">
                        ₩13,000,000
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* 영수증 하단 정보 */}
                <motion.div
                  className="text-center mt-4 pt-3 border-t border-dashed border-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="text-xs text-gray-500 mb-0">━━━━━━━━━━━━━━━━━━━━━━━━━━━━</div>
                  <div className="text-xs text-emerald-600 font-bold mb-1">예상 개발 기간: 6-10주</div>
                  <div className="text-xs text-emerald-600 font-bold mb-2">
                    💰 AI 활용으로 약 23% 비용 절감!
                  </div>
                  <div className="text-xs text-gray-400">
                    WebCrew | contact@webcrew.co.kr
                  </div>
                </motion.div>
              </div>

              {/* 영수증 하단 톱니 효과 */}
              <div className="w-full h-6 bg-gray-100 relative flex-shrink-0">
                <div className="absolute top-2 left-0 w-full h-0 flex justify-center">
                  <div className="flex space-x-3">
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div 
                        key={i} 
                        className="w-1.5 h-1.5 bg-white rounded-full border border-gray-300"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </SectionContainer>
  )
}

export default PricingCalculatorSection 