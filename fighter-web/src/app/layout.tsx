import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BottomNavigation } from '@/components/bottom-navigation'

const inter = Inter({ subsets: ['latin', 'cyrillic'] })

export const metadata: Metadata = {
  title: 'FighterBot - Мир единоборств',
  description: 'Ваш надежный помощник в мире смешанных единоборств',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 pb-16 md:pb-0">
            {children}
          </main>
          <BottomNavigation />
        </div>
      </body>
    </html>
  )
}
