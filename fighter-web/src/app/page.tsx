'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Heart, MessageCircle, Repeat2, Share, MoreHorizontal, Clock, MapPin, Trophy, Star, Play, Eye, Calendar, RefreshCw, ArrowUp, Bell } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'

// Типы данных
interface Author {
  name: string
  username: string
  avatar: string
  verified: boolean
}

interface Stats {
  likes: number
  comments: number
  reposts: number
  views: number
}

interface Fighter {
  name: string
  record: string
  avatar: string
  flag: string
}

interface NewsItem {
  id: number
  type: 'news'
  author: Author
  time: string
  content: string
  image?: string
  stats: Stats
}

interface FightPromoItem {
  id: number
  type: 'fight_promo'
  title: string
  subtitle: string
  date: string
  location: string
  fighters: Fighter[]
}

type FeedItem = NewsItem | FightPromoItem

// Данные для ленты новостей
const initialNewsItems: FeedItem[] = [
  {
    id: 1,
    type: 'news',
    author: {
      name: 'UFC Russia',
      username: '@ufc_russia',
      avatar: '/api/placeholder/40/40',
      verified: true
    },
    time: '2ч',
    content: 'Джон Джонс успешно защитил титул чемпиона тяжелого веса UFC, победив Стипе Миочича техническим нокаутом в третьем раунде на UFC 309! 🥊',
    image: 'https://sportburo.kz/storage/photos/article/6/main/01JDW52M0HQFEXX4SZRC7BPQZ9.jpg',
    stats: {
      likes: 1247,
      comments: 89,
      reposts: 156,
      views: 12500
    }
  },
  {
    id: 2,
    type: 'fight_promo',
    title: 'UFC 310',
    subtitle: 'Белал Мухаммад vs Шавкат Рахмонов',
    date: '7 декабря 2024',
    location: 'T-Mobile Arena, Лас-Вегас',
    fighters: [
      {
        name: 'Белал Мухаммад',
        record: '24-3-0',
        avatar: '/api/placeholder/60/60',
        flag: '🇺🇸'
      },
      {
        name: 'Шавкат Рахмонов',
        record: '18-0-0',
        avatar: '/api/placeholder/60/60',
        flag: '🇰🇿'
      }
    ]
  },
  {
    id: 3,
    type: 'news',
    author: {
      name: 'MMA Junkie',
      username: '@mmajunkie',
      avatar: '/api/placeholder/40/40',
      verified: true
    },
    time: '4ч',
    content: 'Ислам Махачев заявил, что готов драться с любым претендентом в легком весе. "Я чемпион и готов защищать свой пояс против любого", - сказал дагестанец.',
    stats: {
      likes: 892,
      comments: 67,
      reposts: 134,
      views: 8900
    }
  },
  {
    id: 4,
    type: 'news',
    author: {
      name: 'ESPN MMA',
      username: '@espnmma',
      avatar: '/api/placeholder/40/40',
      verified: true
    },
    time: '6ч',
    content: 'Александр Волкановски планирует вернуться в октагон в начале 2025 года. Экс-чемпион полулегкого веса восстанавливается после поражения от Ильи Топурии.',
    image: 'https://fight.ru/wp-content/uploads/2023/10/volkanovskiafterfightwithmakhachev-768x512.webp',
    stats: {
      likes: 654,
      comments: 45,
      reposts: 89,
      views: 6700
    }
  },
  {
    id: 5,
    type: 'fight_promo',
    title: 'ONE Championship 169',
    subtitle: 'Анатолий Малыхин vs Рейнир де Риддер',
    date: '15 декабря 2024',
    location: 'Сингапур',
    fighters: [
      {
        name: 'Анатолий Малыхин',
        record: '13-0-0',
        avatar: '/api/placeholder/60/60',
        flag: '🇷🇺'
      },
      {
        name: 'Рейнир де Риддер',
        record: '16-2-0',
        avatar: '/api/placeholder/60/60',
        flag: '🇳🇱'
      }
    ]
  },
  {
    id: 6,
    type: 'news',
    author: {
      name: 'Sherdog',
      username: '@sherdogdotcom',
      avatar: '/api/placeholder/40/40',
      verified: true
    },
    time: '8ч',
    content: 'Петр Ян объявил о возвращении в полулегкий вес. Бывший чемпион бантамвеса планирует дебютировать в новой весовой категории уже в 2025 году.',
    stats: {
      likes: 1156,
      comments: 123,
      reposts: 267,
      views: 15600
    }
  }
]

// Дополнительные новости для обновления
const newNewsItems: FeedItem[] = [
  {
    id: 7,
    type: 'news',
    author: {
      name: 'MMA News',
      username: '@mmanews',
      avatar: '/api/placeholder/40/40',
      verified: true
    },
    time: 'только что',
    content: 'СРОЧНО: Хабиб Нурмагомедов объявил о возвращении в UFC! Легенда дагестанского MMA готова к бою за титул в 2025 году! 🔥',
    image: 'https://s-cdn.sportbox.ru/images/styles/1920_1080/fp_fotos/7e/14/7eba04bd6fa0a27adba763d8b19119165d767470a3d15142216538.jpg',
    stats: {
      likes: 2847,
      comments: 234,
      reposts: 567,
      views: 28900
    }
  },
  {
    id: 8,
    type: 'fight_promo',
    title: 'UFC 311',
    subtitle: 'Конор МакГрегор vs Майкл Чендлер',
    date: '25 января 2025',
    location: 'Madison Square Garden, Нью-Йорк',
    fighters: [
      {
        name: 'Конор МакГрегор',
        record: '22-6-0',
        avatar: '/api/placeholder/60/60',
        flag: '🇮🇪'
      },
      {
        name: 'Майкл Чендлер',
        record: '23-8-0',
        avatar: '/api/placeholder/60/60',
        flag: '🇺🇸'
      }
    ]
  },
  {
    id: 9,
    type: 'news',
    author: {
      name: 'Fight News',
      username: '@fightnews',
      avatar: '/api/placeholder/40/40',
      verified: true
    },
    time: '1 мин',
    content: 'Александр Емельяненко подписал контракт с новой организацией! Первый бой запланирован на февраль 2025 года.',
    stats: {
      likes: 892,
      comments: 156,
      reposts: 234,
      views: 8900
    }
  }
]

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

function NewsPost({ item }: { item: NewsItem }) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition-colors cursor-pointer">
      <div className="px-4 py-3">
        {/* Header - логотип, название и время в одну строку */}
        <div className="flex items-center space-x-3 mb-3">
          {/* Avatar */}
          <div className="w-10 h-10 flex-shrink-0 rounded-full overflow-hidden bg-gray-200">
            <LazyImage 
              src={item.author.avatar} 
              alt={item.author.name}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Author info */}
          <div className="flex items-center space-x-1 flex-1 min-w-0">
            <span className="font-bold text-[15px] text-black hover:underline cursor-pointer truncate">
              {item.author.name}
            </span>
            {item.author.verified && (
              <svg className="w-4 h-4 text-blue-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.27 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.46 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"/>
              </svg>
            )}
            <span className="text-gray-500 text-[14px] truncate">@{item.author.username}</span>
            <span className="text-gray-500 text-[14px]">·</span>
            <span className="text-gray-500 text-[14px] hover:underline cursor-pointer flex-shrink-0">{item.time}</span>
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
          <p className="text-[15px] leading-5 text-black whitespace-pre-wrap break-words">
            {item.content}
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
        </div>
        
        {/* Actions */}
        <div className="flex items-center justify-between max-w-xs">
          {/* Like */}
          <button className="group flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors">
            <div className="w-8 h-8 rounded-full group-hover:bg-red-50 dark:group-hover:bg-red-900/20 flex items-center justify-center transition-colors">
              <Heart className="w-5 h-5" />
            </div>
            <span className="text-[13px] group-hover:text-red-500 min-w-0">{item.stats.likes}</span>
          </button>
          
          {/* Views */}
          <button className="group flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors">
            <div className="w-8 h-8 rounded-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 flex items-center justify-center transition-colors">
              <Eye className="w-5 h-5" />
            </div>
            <span className="text-[13px] group-hover:text-blue-500 min-w-0">{item.stats.views}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

function FightPromo({ item }: { item: FightPromoItem }) {
  return (
    <div className="border-b bg-gradient-to-r from-red-50 to-blue-50 dark:from-red-950/20 dark:to-blue-950/20">
      <div className="p-4 sm:p-6">
        <div className="space-y-3 sm:space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-black">{item.title}</h3>
              <p className="text-gray-600 text-sm sm:text-base">{item.subtitle}</p>
            </div>
            <Badge variant="destructive" className="animate-pulse flex-shrink-0 text-xs">
              LIVE
            </Badge>
          </div>
          
          {/* Fighters in vertical format */}
          <div className="text-center space-y-4">
            {/* Fighter 1 */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 border-2 border-red-500 rounded-full overflow-hidden">
                <LazyImage 
                  src={item.fighters[0].avatar} 
                  alt={item.fighters[0].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <p className="font-bold text-lg text-black">{item.fighters[0].name}</p>
                <p className="text-gray-600 text-sm">{item.fighters[0].record}</p>
                <span className="text-2xl">{item.fighters[0].flag}</span>
              </div>
            </div>
            
            {/* VS */}
            <div className="py-2">
              <div className="text-3xl font-bold text-primary">VS</div>
            </div>
            
            {/* Fighter 2 */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 border-2 border-blue-500 rounded-full overflow-hidden">
                <LazyImage 
                  src={item.fighters[1].avatar} 
                  alt={item.fighters[1].name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center">
                <p className="font-bold text-lg text-black">{item.fighters[1].name}</p>
                <p className="text-gray-600 text-sm">{item.fighters[1].record}</p>
                <span className="text-2xl">{item.fighters[1].flag}</span>
              </div>
            </div>
          </div>
          
          {/* Notification Button */}
          <div className="text-center pt-4">
            <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded-full transition-all duration-200">
              <Bell className="w-4 h-4 mr-2 inline" />
              Добавить в оповещения
            </button>
          </div>
          
          {/* Event Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 pt-4 border-t">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Calendar className="w-4 h-4 flex-shrink-0" />
              <span>{item.date}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="w-4 h-4 flex-shrink-0" />
              <span>{item.location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HomePage() {
  const [newsItems, setNewsItems] = useState<FeedItem[]>(initialNewsItems)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [isPulling, setIsPulling] = useState(false)
  const [showNewPostsButton, setShowNewPostsButton] = useState(false)
  const [newPostsCount, setNewPostsCount] = useState(0)
  const [touchStartY, setTouchStartY] = useState(0)

  // Симуляция получения новых постов
  const fetchNewPosts = useCallback(async () => {
    setIsRefreshing(true)
    
    // Симуляция задержки API
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Добавляем новые посты в начало ленты
    const shuffledNews = [...newNewsItems].sort(() => Math.random() - 0.5).slice(0, 2)
    const updatedNews: FeedItem[] = shuffledNews.map(item => ({
      ...item,
      id: Date.now() + Math.random(),
      time: 'только что'
    }))
    
    setNewsItems(prev => [...updatedNews, ...prev])
    setIsRefreshing(false)
    setShowNewPostsButton(false)
    setNewPostsCount(0)
  }, [])

  // Симуляция автоматического появления новых постов
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isRefreshing && Math.random() > 0.7) {
        setNewPostsCount(prev => prev + 1)
        setShowNewPostsButton(true)
      }
    }, 10000) // Каждые 10 секунд

    return () => clearInterval(interval)
  }, [isRefreshing])

  // Pull-to-refresh для мобильных устройств
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const scrollContainer = e.currentTarget as HTMLElement
    const touch = e.touches[0]
    
    // Запоминаем начальную позицию касания
    setTouchStartY(touch.clientY)
    
    // Начинаем pull-to-refresh только если находимся в самом верху
    if (scrollContainer.scrollTop === 0) {
      setIsPulling(true)
    }
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (isPulling) {
      const scrollContainer = e.currentTarget as HTMLElement
      const touch = e.touches[0]
      const currentY = touch.clientY
      
      // Проверяем, что мы все еще в верху и движемся вниз
      if (scrollContainer.scrollTop === 0 && currentY > touchStartY) {
        const distance = Math.max(0, currentY - touchStartY)
        setPullDistance(Math.min(distance, 100))
      } else {
        // Если скроллим вверх или не в верху - отменяем pull-to-refresh
        setIsPulling(false)
        setPullDistance(0)
      }
    }
  }, [isPulling, touchStartY])

  const handleTouchEnd = useCallback(() => {
    if (isPulling) {
      if (pullDistance > 60) {
        fetchNewPosts()
      }
      setIsPulling(false)
      setPullDistance(0)
    }
    // Сбрасываем начальную позицию касания
    setTouchStartY(0)
  }, [isPulling, pullDistance, fetchNewPosts])

  // Загрузка дополнительных постов
  const loadMorePosts = async () => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const morePosts: FeedItem[] = [...initialNewsItems].map(item => ({
      ...item,
      id: Date.now() + Math.random(),
      time: Math.floor(Math.random() * 12) + 1 + 'ч'
    })).slice(0, 3)
    
    setNewsItems(prev => [...prev, ...morePosts])
    setIsLoading(false)
  }

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Fixed content area with scroll */}
      <div 
        className="flex-1 overflow-y-auto pt-12 sm:pt-14 md:pt-16"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Pull to refresh indicator - только при активном потягивании */}
        {isPulling && pullDistance > 0 && (
          <div 
            className="flex items-center justify-center bg-background/95 backdrop-blur-sm transition-all duration-200 border-b"
            style={{ height: `${Math.min(pullDistance, 80)}px` }}
          >
            <div className="flex items-center space-x-2 text-primary">
              <RefreshCw 
                className={`w-5 h-5 ${pullDistance > 60 ? 'animate-spin' : ''}`} 
              />
              <span className="text-sm font-medium">
                {pullDistance > 60 ? 'Отпустите для обновления' : 'Потяните для обновления'}
              </span>
            </div>
          </div>
        )}

        {/* Refresh indicator - только во время загрузки */}
        {isRefreshing && (
          <div className="bg-primary text-primary-foreground py-3 border-b">
            <div className="flex items-center justify-center space-x-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span className="text-sm font-medium">Обновление ленты...</span>
            </div>
          </div>
        )}

        {/* New posts notification - только когда есть новые посты */}
        {showNewPostsButton && !isRefreshing && !isPulling && (
          <div className="p-3 bg-background/95 backdrop-blur-sm border-b">
            <div className="flex justify-center">
              <button
                onClick={fetchNewPosts}
                className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium rounded-full shadow-lg animate-bounce transition-all duration-200"
              >
                <ArrowUp className="w-4 h-4 mr-2 inline" />
                {newPostsCount} новых поста
              </button>
            </div>
          </div>
        )}

        {/* News Feed - всегда занимает доступное пространство */}
        <div className="w-full">
          {newsItems.map((item, index) => (
            <div key={item.id} className="animate-in fade-in-0 slide-in-from-top-2 duration-300">
              {item.type === 'news' ? (
                <NewsPost item={item as NewsItem} />
              ) : (
                <FightPromo item={item as FightPromoItem} />
              )}
            </div>
          ))}

          {/* Load More Button */}
          <div className="p-4 text-center border-b border-border/50">
            <button 
              onClick={loadMorePosts}
              disabled={isLoading}
              className="px-6 py-2 text-sm font-medium text-primary hover:bg-primary/5 rounded-full border border-border/30 hover:border-primary/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin inline" />
                  Загрузка...
                </>
              ) : (
                'Загрузить ещё'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
