import dynamic from 'next/dynamic'

// 로딩 스피너 컴포넌트
const LoadingSpinner = () => (
  <div className="flex items-center justify-center py-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
)

// 지연 로딩 컴포넌트 생성 함수
const createLazyComponent = (importPath: string) => {
  return dynamic(() => import(importPath), {
    loading: () => <LoadingSpinner />,
    ssr: false // SSR을 비활성화하여 클라이언트 사이드에서만 렌더링
  })
}

// 지연 로딩 컴포넌트들
export const LazyPricingCalculatorSection = createLazyComponent('../sections/PricingCalculatorSection')
export const LazyPortfolioSection = createLazyComponent('../sections/PortfolioSection')
export const LazyProcessSection = createLazyComponent('../sections/ProcessSection')

// 인터섹션 옵저버를 활용한 지연 로딩 훅
export const useLazyLoading = () => {
  // 뷰포트에 들어올 때만 컴포넌트를 로드하는 로직을 여기에 구현할 수 있습니다
  // 현재는 기본 dynamic import를 사용하지만, 필요에 따라 확장 가능합니다
  return {
    LazyPricingCalculatorSection,
    LazyPortfolioSection,
    LazyProcessSection
  }
} 