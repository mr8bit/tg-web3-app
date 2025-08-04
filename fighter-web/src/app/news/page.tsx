'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Heart, Eye, MoreHorizontal, Filter, Search, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Компонент для lazy loading изображений с skeleton loader
function LazyImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)
  const [imageSrc, setImageSrc] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    setHasError(false)
    setImageSrc(null)

    const img = new Image()
    img.onload = () => {
      setImageSrc(src)
      setIsLoading(false)
    }
    img.onerror = () => {
      setIsLoading(false)
      setHasError(true)
    }
    img.src = src
  }, [src])

  return (
    <div className="relative">
      {/* Skeleton loader */}
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-2xl flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Actual image */}
      {imageSrc && !hasError && (
        <img
          src={imageSrc}
          alt={alt}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
          loading="lazy"
        />
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="flex items-center justify-center h-64 bg-gray-100 dark:bg-gray-800 rounded-2xl">
          <div className="text-center text-gray-500">
            <div className="w-12 h-12 mx-auto mb-2 text-gray-400">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm">Не удалось загрузить изображение</p>
          </div>
        </div>
      )}
    </div>
  )
}

// Twitter-стиль компонент новости
function TwitterNewsPost({ item, categories }: { item: any; categories: any[] }) {
  // Генерируем статические значения на основе ID новости
  const likes = 100 + (item.id * 47) % 900
  const views = 1000 + (item.id * 123) % 9000

  return (
    <div className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer">
      <div className="px-4 py-3">
        {/* Header - логотип, название и время в одну строку */}
        <div className="flex items-center space-x-3 mb-3">
          {/* Avatar */}
          <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-200">
            <LazyImage 
              src="/api/placeholder/40/40"
              alt={item.author}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Author info */}
          <div className="flex items-center space-x-1 flex-1 min-w-0">
            <span className="font-bold text-[15px] text-black hover:underline cursor-pointer truncate">
              {item.author}
            </span>
            <svg className="w-4 h-4 text-blue-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"/>
            </svg>
            <span className="text-gray-500 text-[14px] truncate">@{item.league}</span>
            <span className="text-gray-500 text-[14px]">·</span>
            <span className="text-gray-500 text-[14px] hover:underline cursor-pointer flex-shrink-0">{item.publishedAt}</span>
          </div>
          
          {/* More button */}
          <div className="flex-shrink-0">
            <button className="w-8 h-8 rounded-full hover:bg-blue-50 dark:hover:bg-gray-800 flex items-center justify-center group transition-colors">
              <MoreHorizontal className="w-5 h-5 text-gray-500 group-hover:text-blue-500" />
            </button>
          </div>
        </div>
        
        {/* Content - на всю ширину */}
        <div className="mb-3">
          <h3 className="text-[15px] leading-5 text-black font-bold mb-2 whitespace-pre-wrap break-words">
            {item.title}
          </h3>
          <p className="text-[15px] leading-5 text-black whitespace-pre-wrap break-words">
            {item.excerpt}
          </p>
          
          {item.image && (
            <div className="mt-3 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
              <LazyImage 
                src={item.image} 
                alt="News image" 
                className="w-full max-h-[512px] object-cover"
              />
            </div>
          )}
          
          {/* Category badge */}
          <div className="mt-3">
            <Badge variant="outline" className="text-xs">
              {categories.find(c => c.value === item.category)?.label}
            </Badge>
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex items-center justify-between max-w-xs">
          {/* Like */}
          <button className="group flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
            <div className="w-8 h-8 rounded-full group-hover:bg-red-50 dark:group-hover:bg-red-900/20 flex items-center justify-center transition-colors">
              <Heart className="w-5 h-5" />
            </div>
            <span className="text-[13px] group-hover:text-red-500 min-w-0">{likes}</span>
          </button>
          
          {/* Views */}
          <button className="group flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
            <div className="w-8 h-8 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 flex items-center justify-center transition-colors">
              <Eye className="w-5 h-5" />
            </div>
            <span className="text-[13px] group-hover:text-blue-500 min-w-0">{views}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedLeague, setSelectedLeague] = useState('all')

  const categories = [
    { value: 'all', label: 'Все категории' },
    { value: 'fights', label: 'Бои' },
    { value: 'transfers', label: 'Трансферы' },
    { value: 'rankings', label: 'Рейтинги' },
    { value: 'interviews', label: 'Интервью' },
    { value: 'analysis', label: 'Аналитика' }
  ]

  const leagues = [
    { value: 'all', label: 'Все лиги' },
    { value: 'ufc', label: 'UFC' },
    { value: 'bellator', label: 'Bellator' },
    { value: 'one', label: 'ONE Championship' },
    { value: 'pfl', label: 'PFL' }
  ]

  const news = [
    {
      id: 1,
      title: 'Джон Джонс защитил титул чемпиона в тяжелом весе',
      excerpt: 'Легендарный боец одержал победу над Стипе Миочичем техническим нокаутом в третьем раунде на UFC 309.',
      category: 'fights',
      league: 'ufc',
      author: 'UFC Russia',
      publishedAt: '2ч',
      readTime: '3 мин',
      image: 'https://sportburo.kz/storage/photos/article/6/main/01JDW52M0HQFEXX4SZRC7BPQZ9.jpg',
      featured: true
    },
    {
      id: 2,
      title: 'Обновленный рейтинг P4P после UFC 309',
      excerpt: 'Ислам Махачев сохраняет первое место в рейтинге лучших бойцов независимо от весовой категории.',
      category: 'rankings',
      league: 'ufc',
      author: 'MMA Junkie',
      publishedAt: '4ч',
      readTime: '5 мин',
      image: '/api/placeholder/400/250'
    },
    {
      id: 3,
      title: 'Белал Мухаммад готовится к защите титула против Шавката Рахмонова',
      excerpt: 'Чемпион в полусреднем весе проводит тренировочный лагерь в Лас-Вегасе перед боем на UFC 310.',
      category: 'fights',
      league: 'ufc',
      author: 'ESPN MMA',
      publishedAt: '6ч',
      readTime: '4 мин',
      image: '/api/placeholder/400/250'
    },
    {
      id: 4,
      title: 'ONE Championship анонсировал турнир в Сингапуре',
      excerpt: 'Азиатская организация проведет масштабное событие с участием лучших бойцов региона.',
      category: 'fights',
      league: 'one',
      author: 'ONE Championship',
      publishedAt: '8ч',
      readTime: '3 мин',
      image: '/api/placeholder/400/250'
    },
    {
      id: 5,
      title: 'Интервью с Алексом Перейрой о планах на 2025 год',
      excerpt: 'Бразильский чемпион рассказал о своих амбициях и предстоящих вызовах в новом году.',
      category: 'interviews',
      league: 'ufc',
      author: 'Sherdog',
      publishedAt: '12ч',
      readTime: '7 мин',
      image: '/api/placeholder/400/250'
    },
    {
      id: 6,
      title: 'PFL объявила о новом сезоне турнира миллионеров',
      excerpt: 'Организация представила обновленный формат соревнований с увеличенными призовыми.',
      category: 'transfers',
      league: 'pfl',
      author: 'PFL MMA',
      publishedAt: '1д',
      readTime: '6 мин',
      image: '/api/placeholder/400/250'
    }
  ]

  const filteredNews = news.filter(item => {
    const categoryMatch = selectedCategory === 'all' || item.category === selectedCategory
    const leagueMatch = selectedLeague === 'all' || item.league === selectedLeague
    return categoryMatch && leagueMatch
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Fixed Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-black">Новости</h1>
            <Button variant="outline" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Поиск
            </Button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-2xl mx-auto border-b border-gray-200 dark:border-gray-800">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm text-gray-500">Фильтры:</span>
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[140px] h-8 text-sm">
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLeague} onValueChange={setSelectedLeague}>
              <SelectTrigger className="w-[120px] h-8 text-sm">
                <SelectValue placeholder="Лига" />
              </SelectTrigger>
              <SelectContent>
                {leagues.map((league) => (
                  <SelectItem key={league.value} value={league.value}>
                    {league.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* News Feed */}
      <div className="max-w-2xl mx-auto">
        {filteredNews.length > 0 ? (
          filteredNews.map((item) => (
            <TwitterNewsPost key={item.id} item={item} categories={categories} />
          ))
        ) : (
          <div className="p-12 text-center border-b border-gray-200 dark:border-gray-800">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold mb-2 text-black">Новости не найдены</h3>
            <p className="text-gray-500 mb-4">
              Попробуйте изменить фильтры или выберите другую категорию
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedCategory('all')
                setSelectedLeague('all')
              }}
            >
              Сбросить фильтры
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}