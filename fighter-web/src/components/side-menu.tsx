'use client'

import { useState } from 'react'
import { X, User, CreditCard, Settings, LogOut, Menu } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface SideMenuProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  {
    icon: User,
    label: 'Профиль',
    href: '/profile'
  },
  {
    icon: CreditCard,
    label: 'Подписка',
    href: '/subscription'
  },
  {
    icon: Settings,
    label: 'Настройки',
    href: '/settings'
  }
]

export function SideMenu({ isOpen, onClose }: SideMenuProps) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[9998] md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Side Menu */}
      <div className={cn(
        'fixed left-0 top-0 h-full bg-white shadow-lg z-[9999] transition-transform duration-300 ease-in-out',
        'w-72 sm:w-80 md:w-64',
        isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
        'md:relative md:shadow-none md:z-auto'
      )}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 md:p-6 border-b">
            <h2 className="text-lg font-semibold">Меню</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onClose}
              className="md:hidden h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          
          {/* User Info */}
          <div className="p-4 md:p-6">
            <div className="flex items-center space-x-3">
              <Avatar className="w-12 h-12 md:w-14 md:h-14">
                <AvatarImage src="/api/placeholder/56/56" alt="User" />
                <AvatarFallback>ИП</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-sm md:text-base truncate">Иван Петров</p>
                <p className="text-xs md:text-sm text-muted-foreground truncate">ivan.petrov@email.com</p>
              </div>
            </div>
          </div>
          
          <Separator />
          
          {/* Menu Items */}
          <div className="flex-1 p-2 md:p-4">
            <nav className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <Button
                    key={item.href}
                    variant="ghost"
                    className="w-full justify-start h-10 md:h-12 px-3 md:px-4 text-sm md:text-base"
                    onClick={onClose}
                  >
                    <Icon className="w-4 h-4 md:w-5 md:h-5 mr-3 flex-shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </Button>
                )
              })}
            </nav>
          </div>
          
          <Separator />
          
          {/* Logout */}
          <div className="p-2 md:p-4">
            <Button 
              variant="ghost" 
              className="w-full justify-start h-10 md:h-12 px-3 md:px-4 text-sm md:text-base text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={onClose}
            >
              <LogOut className="w-4 h-4 md:w-5 md:h-5 mr-3 flex-shrink-0" />
              <span>Выйти</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export function SideMenuTrigger({ onClick }: { onClick: () => void }) {
  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={onClick}
      className="h-8 w-8 md:h-10 md:w-10 p-0"
    >
      <Menu className="w-4 h-4 md:w-5 md:h-5" />
    </Button>
  )
}