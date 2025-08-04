'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TrendingUp, Trophy, Clock, Filter, DollarSign, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'

export default function BettingPage() {
  const [selectedLeague, setSelectedLeague] = useState('all')
  const [selectedTimeframe, setSelectedTimeframe] = useState('all')

  const leagues = [
    { value: 'all', label: 'Все лиги' },
    { value: 'ufc', label: 'UFC' },
    { value: 'bellator', label: 'Bellator' },
    { value: 'one', label: 'ONE Championship' },
    { value: 'pfl', label: 'PFL' }
  ]

  const timeframes = [
    { value: 'all', label: 'Все события' },
    { value: 'today', label: 'Сегодня' },
    { value: 'week', label: 'На неделе' },
    { value: 'month', label: 'В этом месяце' }
  ]

  const upcomingFights = [
    {
      id: 1,
      event: 'UFC 300',
      date: '2024-12-15',
      time: '22:00',
      league: 'ufc',
      mainCard: true,
      fighter1: {
        name: 'Ислам Махачев',
        country: 'RUS',
        record: '25-1-0',
        image: '/api/placeholder/80/80'
      },
      fighter2: {
        name: 'Чарльз Оливейра',
        country: 'BRA',
        record: '34-10-0',
        image: '/api/placeholder/80/80'
      },
      weightClass: 'Легкий вес',
      title: 'Титульный бой',
      odds: {
        fighter1: 1.65,
        fighter2: 2.25,
        draw: 15.0
      },
      bookmakers: [
        { name: 'Bet365', fighter1: 1.65, fighter2: 2.25 },
        { name: 'William Hill', fighter1: 1.70, fighter2: 2.20 },
        { name: 'Pinnacle', fighter1: 1.68, fighter2: 2.18 }
      ]
    },
    {
      id: 2,
      event: 'Bellator 310',
      date: '2024-12-21',
      time: '20:00',
      league: 'bellator',
      mainCard: true,
      fighter1: {
        name: 'Патрисио Фрейре',
        country: 'BRA',
        record: '35-6-0',
        image: '/api/placeholder/80/80'
      },
      fighter2: {
        name: 'Джереми Кеннеди',
        country: 'USA',
        record: '17-3-0',
        image: '/api/placeholder/80/80'
      },
      weightClass: 'Легчайший вес',
      title: 'Титульный бой',
      odds: {
        fighter1: 1.45,
        fighter2: 2.75,
        draw: 18.0
      },
      bookmakers: [
        { name: 'Bet365', fighter1: 1.45, fighter2: 2.75 },
        { name: 'William Hill', fighter1: 1.48, fighter2: 2.70 },
        { name: 'Pinnacle', fighter1: 1.47, fighter2: 2.72 }
      ]
    },
    {
      id: 3,
      event: 'ONE Championship 165',
      date: '2024-12-28',
      time: '14:00',
      league: 'one',
      mainCard: false,
      fighter1: {
        name: 'Анатолий Малыхин',
        country: 'RUS',
        record: '14-0-0',
        image: '/api/placeholder/80/80'
      },
      fighter2: {
        name: 'Рейнир де Риддер',
        country: 'NLD',
        record: '16-2-0',
        image: '/api/placeholder/80/80'
      },
      weightClass: 'Тяжелый вес',
      title: 'Титульный бой',
      odds: {
        fighter1: 1.85,
        fighter2: 1.95,
        draw: 12.0
      },
      bookmakers: [
        { name: 'Bet365', fighter1: 1.85, fighter2: 1.95 },
        { name: 'William Hill', fighter1: 1.88, fighter2: 1.92 },
        { name: 'Pinnacle', fighter1: 1.87, fighter2: 1.93 }
      ]
    }
  ]

  const popularBets = [
    {
      id: 1,
      type: 'Способ победы',
      description: 'Ислам Махачев победит нокаутом',
      odds: 3.50,
      popularity: 85
    },
    {
      id: 2,
      type: 'Общий тотал',
      description: 'Бой продлится больше 2.5 раундов',
      odds: 1.75,
      popularity: 72
    },
    {
      id: 3,
      type: 'Точный счет',
      description: 'Махачев победит единогласным решением',
      odds: 2.80,
      popularity: 68
    },
    {
      id: 4,
      type: 'Первый раунд',
      description: 'Первый раунд закончится досрочно',
      odds: 4.20,
      popularity: 45
    }
  ]

  const filteredFights = upcomingFights.filter(fight => {
    const leagueMatch = selectedLeague === 'all' || fight.league === selectedLeague
    return leagueMatch
  })

  const getLeagueBadge = (league: string) => {
    const colors = {
      ufc: 'bg-red-600 hover:bg-red-700',
      bellator: 'bg-orange-600 hover:bg-orange-700',
      one: 'bg-blue-600 hover:bg-blue-700',
      pfl: 'bg-green-600 hover:bg-green-700'
    }
    return (
      <Badge className={colors[league as keyof typeof colors] || 'bg-gray-600 hover:bg-gray-700'}>
        {league.toUpperCase()}
      </Badge>
    )
  }

  const getOddsColor = (odds: number) => {
    if (odds < 1.5) return 'text-green-600'
    if (odds < 2.0) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-8 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <h1 className="text-4xl font-bold tracking-tight">Ставки</h1>
              <Badge variant="outline" className="text-green-600 border-green-600">
                <DollarSign className="w-3 h-3 mr-1" />
                Live
              </Badge>
            </div>
            <p className="text-xl text-muted-foreground">
              Коэффициенты и прогнозы на бои
            </p>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Фильтры:</span>
            </div>
            
            <Select value={selectedLeague} onValueChange={setSelectedLeague}>
              <SelectTrigger className="w-[150px]">
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

            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Период" />
              </SelectTrigger>
              <SelectContent>
                {timeframes.map((timeframe) => (
                  <SelectItem key={timeframe.value} value={timeframe.value}>
                    {timeframe.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming">
                Предстоящие ({filteredFights.length})
              </TabsTrigger>
              <TabsTrigger value="popular">
                Популярные ставки
              </TabsTrigger>
              <TabsTrigger value="live">
                Live ставки
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="mt-6">
              <div className="space-y-6">
                {filteredFights.map((fight) => (
                  <Card key={fight.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col items-center">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {new Date(fight.date).toLocaleDateString('ru-RU')}
                            </span>
                            <span className="text-xs font-semibold">{fight.time}</span>
                          </div>
                          <div>
                            <CardTitle className="text-lg">{fight.event}</CardTitle>
                            <CardDescription>{fight.weightClass} • {fight.title}</CardDescription>
                            <div className="flex items-center gap-2 mt-2">
                              {getLeagueBadge(fight.league)}
                              {fight.mainCard && <Badge variant="outline">Main Card</Badge>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {/* Fighters */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        {/* Fighter 1 */}
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={fight.fighter1.image} alt={fight.fighter1.name} />
                            <AvatarFallback>{fight.fighter1.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold">{fight.fighter1.name}</p>
                            <p className="text-sm text-muted-foreground">{fight.fighter1.record}</p>
                            <Badge variant="outline" className="text-xs">{fight.fighter1.country}</Badge>
                          </div>
                        </div>

                        {/* VS */}
                        <div className="flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mb-2">
                              <span className="text-sm font-bold">VS</span>
                            </div>
                            <p className="text-xs text-muted-foreground">против</p>
                          </div>
                        </div>

                        {/* Fighter 2 */}
                        <div className="flex items-center gap-3 md:flex-row-reverse">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={fight.fighter2.image} alt={fight.fighter2.name} />
                            <AvatarFallback>{fight.fighter2.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div className="md:text-right">
                            <p className="font-semibold">{fight.fighter2.name}</p>
                            <p className="text-sm text-muted-foreground">{fight.fighter2.record}</p>
                            <Badge variant="outline" className="text-xs">{fight.fighter2.country}</Badge>
                          </div>
                        </div>
                      </div>

                      {/* Odds */}
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <Button variant="outline" className="h-auto p-4 flex flex-col">
                          <span className="text-sm text-muted-foreground mb-1">Победа {fight.fighter1.name.split(' ')[0]}</span>
                          <span className={`text-lg font-bold ${getOddsColor(fight.odds.fighter1)}`}>
                            {fight.odds.fighter1.toFixed(2)}
                          </span>
                        </Button>
                        <Button variant="outline" className="h-auto p-4 flex flex-col">
                          <span className="text-sm text-muted-foreground mb-1">Ничья</span>
                          <span className={`text-lg font-bold ${getOddsColor(fight.odds.draw)}`}>
                            {fight.odds.draw.toFixed(2)}
                          </span>
                        </Button>
                        <Button variant="outline" className="h-auto p-4 flex flex-col">
                          <span className="text-sm text-muted-foreground mb-1">Победа {fight.fighter2.name.split(' ')[0]}</span>
                          <span className={`text-lg font-bold ${getOddsColor(fight.odds.fighter2)}`}>
                            {fight.odds.fighter2.toFixed(2)}
                          </span>
                        </Button>
                      </div>

                      {/* Bookmakers */}
                      <div className="border-t pt-4">
                        <p className="text-sm font-semibold mb-3">Сравнение букмекеров:</p>
                        <div className="space-y-2">
                          {fight.bookmakers.map((bookmaker, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                              <span className="font-medium">{bookmaker.name}</span>
                              <div className="flex gap-4">
                                <span className={getOddsColor(bookmaker.fighter1)}>
                                  {bookmaker.fighter1.toFixed(2)}
                                </span>
                                <span className={getOddsColor(bookmaker.fighter2)}>
                                  {bookmaker.fighter2.toFixed(2)}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="popular" className="mt-6">
              <div className="grid gap-4 md:grid-cols-2">
                {popularBets.map((bet) => (
                  <Card key={bet.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">{bet.type}</CardTitle>
                          <CardDescription>{bet.description}</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className={`text-2xl font-bold ${getOddsColor(bet.odds)}`}>
                            {bet.odds.toFixed(2)}
                          </div>
                          <Badge variant="outline" className="text-xs">
                            <Target className="w-3 h-3 mr-1" />
                            {bet.popularity}%
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Популярность</span>
                          <span>{bet.popularity}%</span>
                        </div>
                        <Progress value={bet.popularity} className="h-2" />
                      </div>
                      <Button className="w-full mt-4">
                        Сделать ставку
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="live" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                    Live ставки
                  </CardTitle>
                  <CardDescription>
                    В данный момент нет активных боев для live ставок
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Следите за расписанием предстоящих боев
                    </p>
                    <Button variant="outline" className="mt-4" asChild>
                      <Link href="/fights">
                        Посмотреть расписание
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}