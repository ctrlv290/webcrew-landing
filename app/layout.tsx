import type { Metadata, Viewport } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'
import { Toaster } from 'sonner'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'WebCrew - 비전문가도 이해할 수 있는 웹 제작',
  description: '상담부터 제작, 유지보수까지 원스톱으로 제공하는 웹 제작 서비스',
  keywords: '웹사이트 제작, 웹 개발, 랜딩페이지, SEO, 유지보수',
  authors: [{ name: 'WebCrew' }],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={notoSansKR.className}>
      <head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Toaster position="top-right" richColors />
        <Analytics />
      </body>
    </html>
  )
}
