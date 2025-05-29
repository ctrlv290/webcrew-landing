"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { MaterialIcon } from "@/components/ui/material-icon"
import SectionContainer from "@/components/common/SectionContainer"
import { animations, viewportSettings } from "@/lib/animations"
import { FormData } from "@/lib/types"
import { processSteps } from "@/lib/data/content"
import { saveToNotion } from "@/lib/actions/notion"
import { toast } from "sonner"
import { useState } from "react"

interface ProcessSectionProps {
  formData: FormData
  updateFormData: (field: keyof FormData, value: string) => void
  resetForm: () => void
}

const PROCESS_ICONS = ["chat", "palette", "code", "launch"]

export default function ProcessSection({ 
  formData, 
  updateFormData,
  resetForm
}: ProcessSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isSubmitting) return
    
    try {
      setIsSubmitting(true)
      
      // 폼 데이터 유효성 검사
      if (!formData.name || !formData.email || !formData.phone || !formData.message) {
        toast.error("모든 필드를 입력해주세요.")
        return
      }

      // 이메일 형식 검사
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        toast.error("올바른 이메일 형식을 입력해주세요.")
        return
      }

      // 전화번호 형식 검사
      const phoneRegex = /^[0-9]{2,3}-?[0-9]{3,4}-?[0-9]{4}$/
      if (!phoneRegex.test(formData.phone.replace(/-/g, ''))) {
        toast.error("올바른 전화번호 형식을 입력해주세요.")
        return
      }

      const result = await saveToNotion(formData)
      
      if (result.success) {
        toast.success("상담 신청이 완료되었습니다.")
        resetForm()
      } else {
        toast.error(result.error || "상담 신청 중 오류가 발생했습니다.")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      toast.error("상담 신청 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <SectionContainer id="contact" backgroundColor="#F9FAFB" className="py-20 relative" isFullScreen={false}>
      <div className="max-w-5xl mx-auto relative">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          서비스 진행 프로세스
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-4 gap-6 mb-16"
          variants={animations.staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={viewportSettings}
        >
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              className="text-center relative"
              variants={animations.staggerItem}
            >
              <motion.div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4">
                <MaterialIcon name={PROCESS_ICONS[index]} size="lg" className="text-white" />
              </motion.div>
              <h4 className="font-semibold mb-2">{step.title}</h4>
              <p className="text-gray-600 whitespace-pre-line text-sm leading-relaxed">{step.desc}</p>
              
              {index < processSteps.length - 1 && (
                <motion.div
                  className="hidden md:block absolute top-6 -right-3 transform translate-x-1/2"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 * (index + 1) }}
                >
                  <MaterialIcon name="arrow_forward" size="lg" className="text-primary" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="text-center mb-12">
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            지금 바로 상담을 시작해보세요
          </h3>
          <p className="text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
            웨이팅 리스트에 등록하시면 출시 소식을 가장 먼저 알려드립니다
          </p>
        </motion.div>

        <motion.div
          className="max-w-md mx-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="p-6 shadow-xl bg-white border-2 border-primary">
            <CardContent className="p-0">
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { field: 'name' as const, type: 'text', placeholder: '이름을 입력해주세요' },
                  { field: 'email' as const, type: 'email', placeholder: '이메일을 입력해주세요' },
                  { field: 'phone' as const, type: 'tel', placeholder: '전화번호를 입력해주세요' }
                ].map(({ field, type, placeholder }) => (
                  <motion.div
                    key={field}
                    whileFocus={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Input
                      type={type}
                      placeholder={placeholder}
                      value={formData[field]}
                      onChange={(e) => updateFormData(field, e.target.value)}
                      className="w-full py-3 border-2 border-gray-200 focus:border-primary"
                      required
                    />
                  </motion.div>
                ))}

                <motion.div
                  whileFocus={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <Textarea
                    placeholder="상담 내용을 입력해주세요"
                    value={formData.message}
                    onChange={(e) => updateFormData('message', e.target.value)}
                    className="w-full border-2 border-gray-200 focus:border-primary"
                    required
                  />
                </motion.div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white py-3 font-semibold rounded-xl shadow-lg"
                    disabled={isSubmitting || !formData.name || !formData.email || !formData.phone || !formData.message}
                  >
                    {isSubmitting ? "처리 중..." : "문의하기"}
                  </Button>
                </motion.div>
              </form>

              <motion.p
                className="mt-4 text-xs text-center text-gray-500"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                제출하신 정보는 문의 답변 목적으로만 사용됩니다
              </motion.p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </SectionContainer>
  )
} 