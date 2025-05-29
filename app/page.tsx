"use client"

import React, { useEffect, useRef } from "react"
import dynamic from 'next/dynamic'
import { useScrollOptimization } from "@/hooks/useScrollOptimization"
import { useModalState } from "@/hooks/useModalState"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

// 즉시 로딩 섹션들
import HeroSection from "@/components/sections/HeroSection"
import AITechnologySection from "@/components/sections/AITechnologySection"
import UseCasesSection from "@/components/sections/UseCasesSection"
import OutsourcingProblemsSection from "@/components/sections/OutsourcingProblemsSection"
import WhyUsSection from "@/components/sections/WhyUsSection"

// 지연 로딩 섹션들
const PricingCalculatorSection = dynamic(() => import('@/components/sections/PricingCalculatorSection'), {
  ssr: false,
  loading: () => <div className="h-96 flex items-center justify-center">Loading...</div>
})
const PortfolioSection = dynamic(() => import('@/components/sections/PortfolioSection'), {
  ssr: false,
  loading: () => <div className="h-96 flex items-center justify-center">Loading...</div>
})
const ProcessSection = dynamic(() => import('@/components/sections/ProcessSection'), {
  ssr: false,
  loading: () => <div className="h-96 flex items-center justify-center">Loading...</div>
})

export default function WebCrewLanding() {
  const { isHeaderVisible, isAtTop, scrollToSection } = useScrollOptimization()
  const { formData, updateFormData, resetForm } = useModalState()

  return (
    <div className="min-h-screen bg-white">
      <Header
        isAtTop={isAtTop}
        isHeaderVisible={isHeaderVisible}
        onScrollToSection={scrollToSection}
      />

      <main>
        <HeroSection onScrollToSection={scrollToSection} />
        <AITechnologySection />
        <PricingCalculatorSection />
        <UseCasesSection />
        <OutsourcingProblemsSection />
        <WhyUsSection />
        <PortfolioSection />

        <div>
          <ProcessSection 
            formData={formData}
            updateFormData={updateFormData}
            resetForm={resetForm}
          />
          <Footer />
        </div>
      </main>
    </div>
  )
}
