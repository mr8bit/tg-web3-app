'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { Calendar, MapPin, Clock, Filter, Trophy, Search, Star, Users, Zap, Crown, Ticket, Play, ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'

export default function FightsPage() {
  const [selectedLeague, setSelectedLeague] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set())

  const toggleDateExpansion = (date: string) => {
    const newExpanded = new Set(expandedDates)
    if (newExpanded.has(date)) {
      newExpanded.delete(date)
    } else {
      newExpanded.add(date)
    }
    setExpandedDates(newExpanded)
  }

  const leagues = [
    { value: 'all', label: 'Все лиги' },
    { value: 'ufc', label: 'UFC' },
    { value: 'bellator', label: 'Bellator' },
    { value: 'one', label: 'ONE Championship' },
    { value: 'pfl', label: 'PFL' }
  ]

  const statuses = [
    { value: 'all', label: 'Все статусы' },
    { value: 'upcoming', label: 'Предстоящие' },
    { value: 'live', label: 'В эфире' },
    { value: 'completed', label: 'Завершенные' }
  ]

  const fights = [
    {
      id: 1,
      event: 'UFC 310',
      date: '2024-12-07',
      time: '22:00',
      location: 'T-Mobile Arena, Las Vegas',
      league: 'ufc',
      status: 'upcoming',
      mainCard: [
        {
          fighter1: {
            name: 'Белал Мухаммад',
            nickname: 'Remember The Name',
            record: '24-3-0',
            country: 'USA',
            image: '/api/placeholder/100/100',
            ranking: '#1'
          },
          fighter2: {
            name: 'Шавкат Рахмонов',
            nickname: 'Nomad',
            record: '18-0-0',
            country: 'KAZ',
            image: '/api/placeholder/100/100',
            ranking: '#3'
          },
          weightClass: 'Полусредний вес',
          title: 'Титульный бой',
          isMainEvent: true,
          odds: { fighter1: '-150', fighter2: '+130' }
        },
        {
          fighter1: {
            name: 'Шон Стрикленд',
            nickname: 'Tarzan',
            record: '28-6-0',
            country: 'USA',
            image: '/api/placeholder/100/100',
            ranking: '#2'
          },
          fighter2: {
            name: 'Дрикус дю Плесси',
            nickname: 'Stillknocks',
            record: '21-2-0',
            country: 'RSA',
            image: '/api/placeholder/100/100',
            ranking: '#4'
          },
          weightClass: 'Средний вес',
          title: 'Основной кард',
          isMainEvent: false,
          odds: { fighter1: '+110', fighter2: '-130' }
        }
      ]
    },
    {
      id: 2,
      event: 'Bellator 309',
      date: '2024-12-14',
      time: '21:00',
      location: 'Mohegan Sun Arena, Connecticut',
      league: 'bellator',
      status: 'upcoming',
      mainCard: [
        {
          fighter1: {
            name: 'Патрисио Фрейре',
            nickname: 'Pitbull',
            record: '35-6-0',
            country: 'BRA',
            image: '/api/placeholder/100/100',
            ranking: 'C'
          },
          fighter2: {
            name: 'Джереми Кеннеди',
            nickname: 'JK',
            record: '17-3-0',
            country: 'CAN',
            image: '/api/placeholder/100/100',
            ranking: '#1'
          },
          weightClass: 'Легкий вес',
          title: 'Титульный бой',
          isMainEvent: true,
          odds: { fighter1: '-200', fighter2: '+170' }
        }
      ]
    },
    {
      id: 3,
      event: 'ONE Championship 165',
      date: '2024-11-30',
      time: '14:00',
      location: 'Singapore Indoor Stadium',
      league: 'one',
      status: 'completed',
      mainCard: [
        {
          fighter1: {
            name: 'Анатолий Малыхин',
            nickname: 'Sladkiy',
            record: '14-0-0',
            country: 'RUS',
            image: '/api/placeholder/100/100',
            ranking: 'C'
          },
          fighter2: {
            name: 'Рейнир де Риддер',
            nickname: 'The Dutch Knight',
            record: '16-2-0',
            country: 'NLD',
            image: '/api/placeholder/100/100',
            ranking: '#1'
          },
          weightClass: 'Тяжелый вес',
          title: 'Титульный бой',
          isMainEvent: true,
          result: 'Малыхин победил ТКО (1 раунд)',
          winner: 'fighter1'
        }
      ]
    },
    {
      id: 4,
      event: 'UFC 311',
      date: '2024-12-07',
      time: '19:00',
      location: 'MGM Grand Garden Arena, Las Vegas',
      league: 'ufc',
      status: 'upcoming',
      mainCard: [
        {
          fighter1: {
            name: 'Джон Джонс',
            nickname: 'Bones',
            record: '27-1-0',
            country: 'USA',
            image: '/api/placeholder/100/100',
            ranking: 'C'
          },
          fighter2: {
            name: 'Том Аспинолл',
            nickname: '',
            record: '15-3-0',
            country: 'GBR',
            image: '/api/placeholder/100/100',
            ranking: '#1'
          },
          weightClass: 'Тяжелый вес',
          title: 'Титульный бой',
          isMainEvent: true,
          odds: { fighter1: '-120', fighter2: '+100' }
        }
      ]
    }
  ]

  // Группировка боев по датам
  const groupedFights = useMemo(() => {
    const filtered = fights.filter(fight => {
      const leagueMatch = selectedLeague === 'all' || fight.league === selectedLeague
      const statusMatch = selectedStatus === 'all' || fight.status === selectedStatus
      return leagueMatch && statusMatch
    })

    const grouped = filtered.reduce((acc, fight) => {
      const date = fight.date
      if (!acc[date]) {
        acc[date] = []
      }
      acc[date].push(fight)
      return acc
    }, {} as Record<string, typeof fights>)

    // Сортировка дат
    const sortedDates = Object.keys(grouped).sort((a, b) => new Date(a).getTime() - new Date(b).getTime())
    
    return sortedDates.map(date => ({
      date,
      fights: grouped[date].sort((a, b) => a.time.localeCompare(b.time))
    }))
  }, [fights, selectedLeague, selectedStatus])

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <Badge variant="outline" className="text-blue-600 border-blue-600 bg-blue-50">Предстоящий</Badge>
      case 'live':
        return <Badge className="bg-red-600 hover:bg-red-700 animate-pulse">🔴 В эфире</Badge>
      case 'completed':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Завершен</Badge>
      default:
        return null
    }
  }

  const getLeagueBadge = (league: string) => {
    const styles = {
      ufc: 'bg-red-600 text-white',
      bellator: 'bg-orange-600 text-white',
      one: 'bg-blue-600 text-white',
      pfl: 'bg-green-600 text-white'
    }
    return (
      <Badge className={styles[league as keyof typeof styles] || 'bg-gray-600 text-white'}>
        {league.toUpperCase()}
      </Badge>
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    
    const isToday = date.toDateString() === today.toDateString()
    const isTomorrow = date.toDateString() === tomorrow.toDateString()
    
    if (isToday) return 'Сегодня'
    if (isTomorrow) return 'Завтра'
    
    const dayNames = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
    const monthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']
    
    const dayName = dayNames[date.getDay()]
    const day = date.getDate()
    const monthName = monthNames[date.getMonth()]
    
    // Добавляем окончание к числу
    let dayWithSuffix
    if (day === 1 || day === 21 || day === 31) {
      dayWithSuffix = `${day}-го`
    } else if (day === 2 || day === 22) {
      dayWithSuffix = `${day}-го`
    } else if (day === 3 || day === 23) {
      dayWithSuffix = `${day}-го`
    } else {
      dayWithSuffix = `${day}-го`
    }
    
    return `${dayName} ${dayWithSuffix} ${monthName}`
  }

  const FightCard = ({ fight }: { fight: any }) => (
    <div className="w-full max-w-full overflow-hidden pb-4 mb-4 border-b border-border lg:border lg:rounded-lg lg:p-4 lg:mb-0 lg:pb-0 lg:bg-card lg:shadow-sm">
      <div className="pb-4 lg:pb-3 w-full max-w-full overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2 sm:gap-0 w-full max-w-full">
          <div className="flex items-center gap-2 flex-wrap min-w-0 max-w-full overflow-hidden">
            {getLeagueBadge(fight.league)}
            {getStatusBadge(fight.status)}
          </div>
          <div className="text-sm md:text-base text-muted-foreground flex-shrink-0 whitespace-nowrap">
            {fight.time}
          </div>
        </div>
        <h2 className="text-lg md:text-xl lg:text-2xl font-bold mb-2 truncate w-full max-w-full overflow-hidden">{fight.event}</h2>
        <div className="flex items-center gap-2 text-sm md:text-base text-muted-foreground min-w-0 w-full max-w-full overflow-hidden">
          <MapPin className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" />
          <span className="truncate min-w-0 max-w-full overflow-hidden flex-1">{fight.location}</span>
        </div>
      </div>
      
      <div className="space-y-4 md:space-y-6 w-full max-w-full overflow-hidden">
        {fight.mainCard.map((bout: any, index: number) => (
          <div key={index} className="w-full max-w-full overflow-hidden">
            <div className="flex items-center justify-between min-w-0 w-full max-w-full overflow-hidden">
              <div className="flex-1 text-center flex flex-col items-center min-w-0 px-1 max-w-[40%] overflow-hidden">
                <div className="flex items-center justify-center gap-1 mb-1 md:mb-2 w-full max-w-full overflow-hidden">
                  {bout.fighter1.ranking && (
                    <Badge variant="destructive" className="text-xs md:text-sm flex-shrink-0 whitespace-nowrap">
                      {bout.fighter1.ranking}
                    </Badge>
                  )}
                </div>
                <h3 className="font-medium text-xs md:text-sm lg:text-base truncate w-full max-w-full overflow-hidden text-center">{bout.fighter1.name}</h3>
              </div>
              
              <div className="px-1 md:px-2 lg:px-3 flex items-center flex-shrink-0">
                <div className="w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-primary-foreground font-bold text-xs md:text-xs lg:text-sm">VS</span>
                </div>
              </div>
              
              <div className="flex-1 text-center flex flex-col items-center min-w-0 px-1 max-w-[40%] overflow-hidden">
                <div className="flex items-center justify-center gap-1 mb-1 md:mb-2 w-full max-w-full overflow-hidden">
                  {bout.fighter2.ranking && (
                    <Badge variant="destructive" className="text-xs md:text-sm flex-shrink-0 whitespace-nowrap">
                      {bout.fighter2.ranking}
                    </Badge>
                  )}
                </div>
                <h3 className="font-medium text-xs md:text-sm lg:text-base truncate w-full max-w-full overflow-hidden text-center">{bout.fighter2.name}</h3>
              </div>
            </div>
            {bout.result && (
              <div className="mt-3 md:mt-4 text-center w-full max-w-full overflow-hidden">
                <p className="text-xs md:text-sm bg-muted p-2 md:p-3 rounded inline-block max-w-full break-words overflow-hidden">
                  {bout.result}
                </p>
              </div>
            )}
            
          </div>
        ))}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background overflow-x-hidden w-full max-w-full">
      {/* Header - responsive */}
      <section className="py-3 px-4 md:py-6 md:px-6 lg:px-8 border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10 w-full max-w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto w-full max-w-full overflow-hidden">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold truncate w-full max-w-full overflow-hidden">Календарь боев</h1>
        </div>
      </section>

      {/* Filters - responsive */}
      <section className="p-3 md:p-6 lg:p-8 border-b bg-muted/30 w-full max-w-full overflow-x-hidden">
        <div className="max-w-7xl mx-auto w-full max-w-full overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:flex lg:gap-4 gap-2 md:gap-4 w-full max-w-full overflow-hidden">
            <Select value={selectedLeague} onValueChange={setSelectedLeague}>
              <SelectTrigger className="h-9 md:h-10 text-sm md:text-base lg:w-48 w-full max-w-full">
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

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="h-9 md:h-10 text-sm md:text-base lg:w-48 w-full max-w-full">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status.value} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Calendar View - responsive */}
      <section className="p-3 md:p-6 lg:p-8 overflow-x-hidden w-full max-w-full">
        <div className="max-w-7xl mx-auto w-full max-w-full overflow-hidden">
          {groupedFights.length > 0 ? (
            <div className="space-y-6 md:space-y-8 w-full max-w-full overflow-hidden">
              {groupedFights.map((dateGroup) => (
                <div key={dateGroup.date} className="w-full max-w-full overflow-hidden">
                  {/* Date Header - responsive */}
                  <div className="sticky top-16 md:top-20 lg:top-24 z-10 bg-background/95 backdrop-blur-sm py-3 md:py-4 mb-6 w-full max-w-full overflow-x-hidden">
                    <div className="pb-4 border-b border-border w-full max-w-full overflow-hidden">
                      <div className="flex items-center justify-between w-full max-w-full overflow-hidden">
                        <div className="min-w-0 flex-1 max-w-full overflow-hidden">
                          <h2 className="text-sm md:text-base lg:text-lg font-bold truncate w-full max-w-full overflow-hidden">{formatDate(dateGroup.date)}</h2>
                        </div>
                        <Badge variant="outline" className="text-xs md:text-sm flex-shrink-0 ml-2 whitespace-nowrap">
                          {dateGroup.fights.length} {dateGroup.fights.length === 1 ? 'событие' : 'события'}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Fights for this date - responsive grid */}
                  <div className="grid gap-3 md:gap-4 lg:gap-6 lg:grid-cols-2 xl:grid-cols-3 w-full max-w-full overflow-hidden">
                    {dateGroup.fights.map((fight) => (
                      <FightCard key={fight.id} fight={fight} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 md:py-16 lg:py-20 w-full max-w-full overflow-hidden">
              <Calendar className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-2">Нет боев</h3>
              <p className="text-muted-foreground text-sm md:text-base">
                Нет боев, соответствующих выбранным фильтрам
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}