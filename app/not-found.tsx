export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="mt-6 text-3xl font-bold text-gray-900">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="mt-2 text-sm text-gray-600">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <div className="mt-5">
          <a
            href="/"
            className="text-primary hover:text-primary/80 font-medium"
          >
            홈으로 돌아가기
          </a>
        </div>
      </div>
    </div>
  )
} 