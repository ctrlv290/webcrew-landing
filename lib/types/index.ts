// 공통 Props 타입
export interface CommonProps {
  id?: string
  className?: string
}

// 모달 Props 타입
export interface ModalProps {
  onOpenModal?: () => void
}

// 폼 데이터 타입
export interface FormData {
  name: string
  email: string
  phone: string
  message: string
}

// 컨텐츠 아이템 타입
export interface ContentItem {
  icon?: string
  title: string
  desc: string
}

// 프로세스 스텝 타입
export interface ProcessStep {
  num: string
  title: string
  desc: string
}

// 포트폴리오 아이템 타입
export interface PortfolioItem {
  title: string
  desc: string
  category: string
  image: string
  tech: string[]
  duration: string
}

// 사용 사례 타입
export interface UseCase extends ContentItem {
  detail: string
}

// 후기 타입
export interface Review {
  title: string
  content: string
  author: string
  type: 'warning' | 'error'
}

// 피쳐 카드 타입
export interface FeatureCard {
  icon: string
  title: string
  description: string
  features?: string[]
}

// 웹크루 장점 타입
export interface WhyUsFeature {
  icon: string
  title: string
  desc: string
} 