'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Newspaper, Zap, Users, TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigationItems = [
  {
    name: 'Главная',
    href: '/',
    icon: Home
  },
  {
    name: 'Новости',
    href: '/news',
    icon: Newspaper
  },
  {
    name: 'Бои',
    href: '/fights',
    icon: Zap
  },
  {
    name: 'Бойцы',
    href: '/fighters',
    icon: Users
  },
  {
    name: 'Ставки',
    href: '/betting',
    icon: TrendingUp
  }
]

export function BottomNavigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t z-[100] md:hidden">
      <div className="flex items-center justify-around py-1 sm:py-2">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center px-2 py-1 sm:px-3 sm:py-2 rounded-lg transition-all duration-200',
                'min-w-0 flex-1 max-w-[80px]',
                isActive 
                  ? 'text-red-600 bg-red-50' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              <Icon className={cn(
                'transition-all duration-200',
                isActive 
                  ? 'w-5 h-5 sm:w-6 sm:h-6' 
                  : 'w-4 h-4 sm:w-5 sm:h-5'
              )} />
              <span className={cn(
                'text-xs mt-0.5 sm:mt-1 font-medium truncate transition-all duration-200',
                isActive 
                  ? 'text-red-600' 
                  : 'text-muted-foreground'
              )}>
                {item.name}
              </span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}