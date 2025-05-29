# WebCrew Landing 성능 최적화 가이드

## 🚀 적용된 최적화 사항

### 1. 컴포넌트 메모이제이션 및 분리
- **헤더 컴포넌트 분리**: `components/layout/Header.tsx`
- **네비게이션 컴포넌트 분리**: `components/layout/Navigation.tsx`  
- **모달 컴포넌트 분리**: `components/modals/ConsultationModal.tsx`
- **React.memo()** 적용으로 불필요한 리렌더링 방지

### 2. 커스텀 훅을 통한 상태 관리 최적화
- **스크롤 최적화**: `hooks/useScrollOptimization.ts`
  - Throttle 기능으로 스크롤 이벤트 최적화 (16ms 간격, 60fps)
  - Passive 이벤트 리스너 사용
  - `useCallback`으로 함수 메모이제이션

- **모달 상태 관리**: `hooks/useModalState.ts`
  - 상태 업데이트 최적화
  - `useCallback`으로 이벤트 핸들러 메모이제이션

### 3. 지연 로딩 (Lazy Loading)
- **동적 임포트**: `components/common/LazyComponents.tsx`
  - 모달 컴포넌트 지연 로딩 (SSR 비활성화)
  - 복잡한 섹션들 지연 로딩
  - 로딩 스피너 제공

- **인터섹션 옵저버**: `hooks/useIntersectionObserver.tsx`
  - 뷰포트 진입시에만 컴포넌트 로드
  - 메모리 효율성 증대

### 4. 성능 모니터링 시스템
- **성능 측정 도구**: `lib/utils/performance.ts`
  - 컴포넌트 렌더링 시간 측정
  - 지연 로딩 성능 추적
  - 메모리 사용량 모니터링
  - FPS 측정 도구

### 5. Next.js 설정 최적화
- **번들 분할**: vendor와 common 청크 분리
- **이미지 최적화**: AVIF, WebP 지원
- **압축 활성화**: gzip 압축
- **보안 헤더** 추가

## 📊 성능 개선 효과

### Before vs After
1. **초기 로딩 시간**: 30-40% 감소 예상
2. **메모리 사용량**: 20-30% 감소 예상  
3. **스크롤 성능**: 60fps 유지
4. **번들 크기**: 벤더 청크 분리로 캐싱 효율성 증대

### 주요 최적화 포인트
- ✅ 컴포넌트 메모이제이션
- ✅ 이벤트 핸들러 최적화
- ✅ 스크롤 이벤트 throttling
- ✅ 지연 로딩 구현
- ✅ 번들 분할 최적화
- ✅ 성능 모니터링 도구

## 🛠️ 사용법

### 성능 모니터링
```typescript
import { PerformanceMonitor } from '@/lib/utils/performance'

const monitor = PerformanceMonitor.getInstance()

// 성능 측정 시작
monitor.startMeasure('component-render')

// 성능 측정 종료
monitor.endMeasure('component-render')

// 결과 확인
const metrics = monitor.getAllMetrics()
```

### 지연 로딩 컴포넌트
```typescript
import { LazyComponent } from '@/hooks/useIntersectionObserver'

<LazyComponent fallback={<LoadingSpinner />}>
  <ExpensiveComponent />
</LazyComponent>
```

### 커스텀 훅 사용
```typescript
import { useScrollOptimization } from '@/hooks/useScrollOptimization'
import { useModalState } from '@/hooks/useModalState'

const {
  isHeaderVisible,
  isAtTop, 
  scrollToSection
} = useScrollOptimization()

const {
  isModalOpen,
  openModal,
  closeModal
} = useModalState()
```

## 🔍 추가 최적화 가능 영역

1. **이미지 최적화**
   - WebP/AVIF 형식 사용
   - 반응형 이미지 구현
   - 이미지 지연 로딩

2. **폰트 최적화**
   - 폰트 preload
   - font-display: swap

3. **API 최적화**
   - React Query/SWR 도입
   - 요청 중복 제거
   - 캐싱 전략

4. **코드 스플리팅**
   - 라우트 기반 분할
   - 특정 기능별 분할

## 📈 모니터링 대시보드

개발 환경에서 콘솔을 통해 다음을 확인할 수 있습니다:

- 🚀 컴포넌트 렌더링 시간
- 🧠 메모리 사용량  
- 📊 FPS 수치
- ⚡ 지연 로딩 성능

## 🎯 성능 목표

- **First Contentful Paint**: < 1.5초
- **Largest Contentful Paint**: < 2.5초  
- **First Input Delay**: < 100ms
- **Cumulative Layout Shift**: < 0.1

---

*이 최적화는 지속적으로 개선되어야 하며, 정기적인 성능 감사를 통해 추가 최적화 기회를 찾아 적용해야 합니다.* 