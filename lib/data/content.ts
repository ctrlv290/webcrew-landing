import { PortfolioItem, FeatureCard, UseCase, Review, ProcessStep, WhyUsFeature } from '@/lib/types'

// AI 기술 섹션 데이터
export const aiTechnologyFeatures: FeatureCard[] = [
  {
    icon: "/images/ai-1.jpg",
    title: "지능형 코드 생성",
    description: "자연어로 설명하면 AI가 자동으로 최적화된 코드를 생성합니다",
    features: ["자동 코드 작성", "버그 예방", "성능 최적화", "보안 강화"],
  },
  {
    icon: "/images/ai-2.jpg",
    title: "AI 디자인 어시스턴트",
    description: "사용자 경험을 분석하여 최적의 디자인을 제안합니다",
    features: ["UX/UI 분석", "색상 조합 제안", "레이아웃 최적화", "반응형 디자인"],
  },
  {
    icon: "/images/ai-3.jpg",
    title: "실시간 성능 모니터링",
    description: "AI가 웹사이트 성능을 실시간으로 모니터링하고 개선합니다",
    features: ["성능 분석", "자동 최적화", "사용자 행동 분석", "개선 제안"],
  },
]

// 사용 사례 데이터
export const useCases: UseCase[] = [
  {
    icon: "school",
    title: "학생/개인",
    desc: "전문적인 포트폴리오로 취업 경쟁력을 높이고 싶은 학생",
    detail: "개발자, 디자이너, 기획자를 꿈꾸는 학생들이 자신만의 개성있는 포트폴리오 웹사이트를 만들어 취업 시장에서 차별화된 경쟁력을 갖출 수 있도록 지원합니다.",
  },
  {
    icon: "person",
    title: "스타트업 창업자",
    desc: "빠르게 MVP를 출시하고 싶은 스타트업",
    detail: "제한된 예산과 시간 내에서 효과적인 웹사이트를 구축하여 비즈니스를 시작할 수 있도록 지원합니다.",
  },
  {
    icon: "business",
    title: "소상공인",
    desc: "온라인 진출을 원하는 오프라인 사업자",
    detail: "기존 오프라인 비즈니스를 온라인으로 확장하여 더 많은 고객에게 다가갈 수 있는 플랫폼을 제공합니다.",
  },
  {
    icon: "trending_up",
    title: "성장하는 기업",
    desc: "기존 웹사이트를 개선하고 싶은 기업",
    detail: "현재 웹사이트의 문제점을 분석하고 개선하여 더 나은 사용자 경험과 비즈니스 성과를 달성합니다.",
  },
]

// 외주 문제점 후기 데이터
export const outsourcingProblems: Review[] = [
  {
    title: "기대했던 일정을 놓치게 되었어요",
    content: "처음엔 빠른 개발을 약속했지만, 시간이 지날수록 일정을 계속 미뤄졌어요. 결국 개발팀이 아닌 하청업체가 작업을 맡게되어 상황 파악이 복잡해졌고, 프로젝트는 기한 없이 지연되었습니다.",
    author: "소상공인 대표님",
    type: "warning"
  },
  {
    title: "완성된 결과물이 쓸 수 없는 상태였습니다",
    content: "웹 개발이 끝났다고 통보받고 확인해보니, 결과물은 요구사항과 전혀 다른 미완성품이었어요. 외주업체가 중간에 바뀌어 처음부터 다시 설명해야 하는 상황이 반복되었습니다.",
    author: "초기 스타트업 대표님",
    type: "error"
  },
  {
    title: "이틀이 지나도 아무 소식이 없었습니다",
    content: "문의가 발생해 바로 수정이 필요했어요. 하지만 아무리 연락해도 답이 없었습니다. 나중에 알고보니 하청업체가 응답하지 않고 있었던 것 같아요. 개발사도 상황을 몰라 답변만 지연되었습니다.",
    author: "중소 무역회사 대표님",
    type: "warning"
  },
  {
    title: "생각지 못한 비용이 눈덩이처럼 불어났어요",
    content: "계약 당시엔 기본 포함되어 있는 기능들이 갑자기 개발 시점에서 추가 개발이 필요하다고 했어요. 하청으로 진행하다보니 하청업체에서 추가 견적을 제시했고, 계획했던 예산의 두 배가 되었습니다.",
    author: "금융 기업 대표님", 
    type: "error"
  }
]

// WebCrew 장점 데이터
export const whyUsFeatures: WhyUsFeature[] = [
  { 
    icon: "headset_mic", 
    title: "24/7 피드백", 
    desc: "언제든 답답한 기다림 없이 실시간 응대를 약속드립니다.",
  },
  { 
    icon: "block", 
    title: "추가금 ZERO", 
    desc: "계약 이후 추가 비용 없이 확정된 금액만 청구됩니다.",
  },
  { 
    icon: "flash_on", 
    title: "빠른 결과물", 
    desc: "효율적인 개발 프로세스로 신속한 결과물을 제공합니다.",
  },
  { 
    icon: "attach_money", 
    title: "가격실명제", 
    desc: "투명한 가격 정책으로 신뢰할 수 있는 견적을 제공합니다.",
  },
]

// 프로세스 단계 데이터
export const processSteps: ProcessStep[] = [
  { num: "1", title: "상담 신청", desc: "요구사항 분석 및 초기 상담\n소요시간: 1-2일" },
  { num: "2", title: "기획/디자인", desc: "와이어프레임 및 디자인 시안\n소요시간: 3-5일" },
  { num: "3", title: "개발/테스트", desc: "실제 개발 및 품질 테스트\n소요시간: 7-14일" },
  { num: "4", title: "배포 & 유지보수", desc: "서비스 런칭 및 지속 관리\n소요시간: 1-2일" },
]

// 포트폴리오 데이터
export const portfolioItems: PortfolioItem[] = [
  {
    title: "푸드테크 배달 앱",
    desc: "AI 기반 맛집 추천과 실시간 배달 현황 추적이 가능한 배달 서비스입니다. 주문 전환율이 45% 증가했습니다.",
    category: "푸드테크",
    image: "/images/pf-6.webp",
    tech: ["React Native", "Node.js", "GraphQL", "MongoDB", "Firebase"],
    duration: "4개월"
  },
  {
    title: "스마트팜 관리 시스템",
    desc: "IoT 기반의 스마트팜 관리 플랫폼입니다. 실시간 환경 모니터링과 자동 제어 시스템으로 작물 생산성이 50% 향상되었습니다.",
    category: "IoT 플랫폼",
    image: "/images/pf-1.webp",
    tech: ["React", "Node.js", "MongoDB", "IoT", "AWS"],
    duration: "3개월"
  },
  {
    title: "온라인 쇼핑몰 리뉴얼",
    desc: "모바일 최적화된 이커머스 플랫폼입니다. 사용자 경험 개선과 결제 시스템 고도화로 매출이 65% 증가했습니다.",
    category: "이커머스",
    image: "/images/pf-2.webp",
    tech: ["Next.js", "TypeScript", "Stripe", "PostgreSQL", "AWS"],
    duration: "2개월"
  },
  {
    title: "의료진 스케줄링 앱",
    desc: "병원 내 의료진 일정 관리와 업무 효율화를 위한 솔루션입니다. 스케줄 관리 시간이 80% 단축되었습니다.",
    category: "헬스케어",
    image: "/images/pf-3.webp",
    tech: ["Vue.js", "Express", "MySQL", "Docker", "PWA"],
    duration: "4개월"
  },
  {
    title: "교육 플랫폼 구축",
    desc: "실시간 화상 수업과 학습 관리가 가능한 온라인 교육 플랫폼입니다. 비대면 수업 만족도가 90%를 달성했습니다.",
    category: "교육",
    image: "/images/pf-4.webp",
    tech: ["React", "Django", "Redis", "WebRTC", "ElasticSearch"],
    duration: "5개월"
  },
  {
    title: "AI 부동산 매칭 서비스",
    desc: "AI 기반 부동산 매물 추천 시스템입니다. 빅데이터 분석으로 매물 매칭 정확도가 75% 향상되었습니다.",
    category: "부동산",
    image: "/images/pf-5.webp",
    tech: ["Angular", "Python", "TensorFlow", "PostgreSQL", "GCP"],
    duration: "6개월"
  }
]

// 계산기 프로세스 단계
export const calculatorSteps = [
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
]

// 견적서 항목 데이터
export const estimateItems = [
  { title: "프론트엔드 개발", original: "₩5,500,000", discounted: "₩5,200,000" },
  { title: "백엔드 API 개발", original: "₩5,000,000", discounted: "₩4,800,000" },
  { title: "데이터베이스 설계", original: "₩2,500,000", discounted: "₩1,800,000" },
  { title: "서버 구축 및 배포", original: "₩1,300,000", discounted: "₩1,200,000" }
] 