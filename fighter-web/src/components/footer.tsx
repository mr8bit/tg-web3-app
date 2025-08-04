import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 pb-16 md:pb-0">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center space-x-2 mb-3 sm:mb-4">
              <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-gradient-to-br from-red-500 to-red-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm md:text-base">F</span>
              </div>
              <span className="font-bold text-base sm:text-lg md:text-xl">FighterBot</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Ваш надежный помощник в мире смешанных единоборств
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm sm:text-base mb-2 sm:mb-3">Навигация</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link href="/" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Главная
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Новости
                </Link>
              </li>
              <li>
                <Link href="/fights" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Бои
                </Link>
              </li>
              <li>
                <Link href="/fighters" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Бойцы
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm sm:text-base mb-2 sm:mb-3">Сервисы</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link href="/betting" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Ставки
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Аналитика
                </Link>
              </li>
              <li>
                <Link href="/predictions" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Прогнозы
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-sm sm:text-base mb-2 sm:mb-3">Поддержка</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link href="/help" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Помощь
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Контакты
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Конфиденциальность
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t mt-4 sm:mt-6 md:mt-8 pt-4 sm:pt-6 md:pt-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-4">
            <p className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
              © 2024 FighterBot. Все права защищены.
            </p>
            <div className="flex items-center gap-3 sm:gap-4">
              <Link href="/terms" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                Условия использования
              </Link>
              <Link href="/privacy" className="text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors">
                Политика конфиденциальности
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}