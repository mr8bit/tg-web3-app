'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Search, Filter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function FightersPage() {
  const [selectedWeightClass, setSelectedWeightClass] = useState('all')
  const [selectedLeague, setSelectedLeague] = useState('all')

  const weightClasses = [
    { value: 'all', label: 'Все весовые категории' },
    { value: 'heavyweight', label: 'Тяжелый вес' },
    { value: 'light-heavyweight', label: 'Полутяжелый вес' },
    { value: 'middleweight', label: 'Средний вес' },
    { value: 'welterweight', label: 'Полусредний вес' },
    { value: 'lightweight', label: 'Легкий вес' },
    { value: 'featherweight', label: 'Легчайший вес' },
    { value: 'bantamweight', label: 'Наилегчайший вес' },
    { value: 'flyweight', label: 'Минимальный вес' }
  ]

  const leagues = [
    { value: 'all', label: 'Все лиги' },
    { value: 'ufc', label: 'UFC' },
    { value: 'bellator', label: 'Bellator' },
    { value: 'one', label: 'ONE Championship' },
    { value: 'pfl', label: 'PFL' }
  ]

  const fighters = [
    {
      id: 1,
      name: 'Ислам Махачев',
      nickname: 'The Dagestani Destroyer',
      weightClass: 'lightweight',
      league: 'ufc',
      record: '25-1-0',
      ranking: 1,
      country: 'RUS',
      age: 32,
      height: '180 см',
      reach: '183 см',
      status: 'champion',
      image: '/api/placeholder/150/150',
      lastFight: '2024-10-26',
      nextFight: '2024-12-15'
    },
    {
      id: 2,
      name: 'Джон Джонс',
      nickname: 'Bones',
      weightClass: 'heavyweight',
      league: 'ufc',
      record: '27-1-0',
      ranking: 1,
      country: 'USA',
      age: 37,
      height: '193 см',
      reach: '215 см',
      status: 'champion',
      image: '/api/placeholder/150/150',
      lastFight: '2024-11-16',
      nextFight: null
    },
    {
      id: 3,
      name: 'Александр Волкановски',
      nickname: 'The Great',
      weightClass: 'featherweight',
      league: 'ufc',
      record: '26-3-0',
      ranking: 1,
      country: 'AUS',
      age: 35,
      height: '168 см',
      reach: '183 см',
      status: 'champion',
      image: '/api/placeholder/150/150',
      lastFight: '2024-09-14',
      nextFight: '2024-12-21'
    },
    {
      id: 4,
      name: 'Хабиб Нурмагомедов',
      nickname: 'The Eagle',
      weightClass: 'lightweight',
      league: 'ufc',
      record: '29-0-0',
      ranking: null,
      country: 'RUS',
      age: 36,
      height: '178 см',
      reach: '178 см',
      status: 'retired',
      image: '/api/placeholder/150/150',
      lastFight: '2020-10-24',
      nextFight: null
    },
    {
      id: 5,
      name: 'Патрисио Фрейре',
      nickname: 'Pitbull',
      weightClass: 'featherweight',
      league: 'bellator',
      record: '35-6-0',
      ranking: 1,
      country: 'BRA',
      age: 37,
      height: '173 см',
      reach: '173 см',
      status: 'champion',
      image: '/api/placeholder/150/150',
      lastFight: '2024-10-19',
      nextFight: '2024-12-14'
    },
    {
      id: 6,
      name: 'Анатолий Малыхин',
      nickname: 'Sladkiy',
      weightClass: 'heavyweight',
      league: 'one',
      record: '14-0-0',
      ranking: 1,
      country: 'RUS',
      age: 36,
      height: '191 см',
      reach: '196 см',
      status: 'champion',
      image: '/api/placeholder/150/150',
      lastFight: '2024-11-30',
      nextFight: null
    }
  ]

  const filteredFighters = fighters.filter(fighter => {
    const weightMatch = selectedWeightClass === 'all' || fighter.weightClass === selectedWeightClass
    const leagueMatch = selectedLeague === 'all' || fighter.league === selectedLeague
    return weightMatch && leagueMatch
  })

  const activeFighters = filteredFighters.filter(f => f.status !== 'retired')
  const retiredFighters = filteredFighters.filter(f => f.status === 'retired')
  const champions = filteredFighters.filter(f => f.status === 'champion')

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'champion':
        return <Badge className="bg-yellow-600 hover:bg-yellow-700">Чемпион</Badge>
      case 'contender':
        return <Badge variant="outline">Претендент</Badge>
      case 'retired':
        return <Badge variant="secondary">На пенсии</Badge>
      default:
        return <Badge variant="outline">Активный</Badge>
    }
  }

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

  const getRankingDisplay = (ranking: number | null) => {
    if (!ranking) return null
    return <Badge variant="outline">#{ranking}</Badge>
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="py-8 bg-gradient-to-b from-muted/50 to-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">Бойцы</h1>
            <p className="text-xl text-muted-foreground">
              Лучшие бойцы мира единоборств
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
            
            <Select value={selectedWeightClass} onValueChange={setSelectedWeightClass}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Весовая категория" />
              </SelectTrigger>
              <SelectContent>
                {weightClasses.map((weightClass) => (
                  <SelectItem key={weightClass.value} value={weightClass.value}>
                    {weightClass.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

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

            <Button variant="outline" size="sm" className="ml-auto">
              <Search className="w-4 h-4 mr-2" />
              Поиск
            </Button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">
                Активные ({activeFighters.length})
              </TabsTrigger>
              <TabsTrigger value="champions">
                Чемпионы ({champions.length})
              </TabsTrigger>
              <TabsTrigger value="retired">
                На пенсии ({retiredFighters.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {activeFighters.map((fighter) => (
                  <Card key={fighter.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={fighter.image} alt={fighter.name} />
                            <AvatarFallback>{fighter.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{fighter.name}</CardTitle>
                            <CardDescription>"{fighter.nickname}"</CardDescription>
                            <div className="flex items-center gap-2 mt-2">
                              {getLeagueBadge(fighter.league)}
                              {getStatusBadge(fighter.status)}
                              {getRankingDisplay(fighter.ranking)}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/fighters/${fighter.id}`}>
                            Профиль
                          </Link>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Рекорд</p>
                          <p className="font-semibold">{fighter.record}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Возраст</p>
                          <p className="font-semibold">{fighter.age} лет</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Рост</p>
                          <p className="font-semibold">{fighter.height}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Размах рук</p>
                          <p className="font-semibold">{fighter.reach}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Страна</p>
                          <Badge variant="outline">{fighter.country}</Badge>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Весовая</p>
                          <p className="font-semibold text-xs">
                            {weightClasses.find(w => w.value === fighter.weightClass)?.label}
                          </p>
                        </div>
                      </div>
                      {fighter.nextFight && (
                        <div className="mt-4 p-3 bg-muted rounded-lg">
                          <p className="text-sm text-muted-foreground">Следующий бой</p>
                          <p className="font-semibold">
                            {new Date(fighter.nextFight).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="champions" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {champions.map((fighter) => (
                  <Card key={fighter.id} className="border-yellow-200 hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={fighter.image} alt={fighter.name} />
                            <AvatarFallback>{fighter.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{fighter.name}</CardTitle>
                            <CardDescription>"{fighter.nickname}"</CardDescription>
                            <div className="flex items-center gap-2 mt-2">
                              {getLeagueBadge(fighter.league)}
                              {getStatusBadge(fighter.status)}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/fighters/${fighter.id}`}>
                            Профиль
                          </Link>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Рекорд</p>
                          <p className="font-semibold">{fighter.record}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Возраст</p>
                          <p className="font-semibold">{fighter.age} лет</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Рост</p>
                          <p className="font-semibold">{fighter.height}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Размах рук</p>
                          <p className="font-semibold">{fighter.reach}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Страна</p>
                          <Badge variant="outline">{fighter.country}</Badge>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Весовая</p>
                          <p className="font-semibold text-xs">
                            {weightClasses.find(w => w.value === fighter.weightClass)?.label}
                          </p>
                        </div>
                      </div>
                      {fighter.nextFight && (
                        <div className="mt-4 p-3 bg-muted rounded-lg">
                          <p className="text-sm text-muted-foreground">Следующий бой</p>
                          <p className="font-semibold">
                            {new Date(fighter.nextFight).toLocaleDateString('ru-RU')}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="retired" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {retiredFighters.map((fighter) => (
                  <Card key={fighter.id} className="opacity-75 hover:opacity-100 hover:shadow-lg transition-all">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-16 h-16">
                            <AvatarImage src={fighter.image} alt={fighter.name} />
                            <AvatarFallback>{fighter.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <CardTitle className="text-lg">{fighter.name}</CardTitle>
                            <CardDescription>"{fighter.nickname}"</CardDescription>
                            <div className="flex items-center gap-2 mt-2">
                              {getLeagueBadge(fighter.league)}
                              {getStatusBadge(fighter.status)}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/fighters/${fighter.id}`}>
                            Профиль
                          </Link>
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Рекорд</p>
                          <p className="font-semibold">{fighter.record}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Возраст</p>
                          <p className="font-semibold">{fighter.age} лет</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Рост</p>
                          <p className="font-semibold">{fighter.height}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Размах рук</p>
                          <p className="font-semibold">{fighter.reach}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Страна</p>
                          <Badge variant="outline">{fighter.country}</Badge>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Весовая</p>
                          <p className="font-semibold text-xs">
                            {weightClasses.find(w => w.value === fighter.weightClass)?.label}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 p-3 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">Последний бой</p>
                        <p className="font-semibold">
                          {new Date(fighter.lastFight).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </div>
  )
}