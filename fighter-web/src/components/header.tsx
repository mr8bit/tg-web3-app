'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SideMenu, SideMenuTrigger } from './side-menu'

export function Header() {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-12 sm:h-14 md:h-16 items-center justify-between px-3 sm:px-4 md:px-6">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <SideMenuTrigger onClick={() => setIsSideMenuOpen(true)} />
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm md:text-base">F</span>
              </div>
              <span className="font-bold text-base sm:text-lg md:text-xl">FighterBot</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center text-xs sm:text-sm text-muted-foreground">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5 sm:mr-2"></span>
              <span className="hidden md:inline">Онлайн</span>
              <span className="md:hidden">●</span>
            </div>
          </div>
        </div>
      </header>
      
      <SideMenu 
        isOpen={isSideMenuOpen} 
        onClose={() => setIsSideMenuOpen(false)} 
      />
    </>
  )
}