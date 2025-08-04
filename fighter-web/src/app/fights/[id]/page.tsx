'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Clock, Trophy, TrendingUp, DollarSign, Users, Target } from 'lucide-react';

// Данные боя (в реальном приложении будут загружаться по ID)
const fightData = {
  id: 1,
  fighter1: {
    name: 'Исраэль Адесанья',
    nickname: 'The Last Stylebender',
    record: '24-3-0',
    country: 'Нигерия',
    age: 34,
    height: '193 см',
    reach: '203 см'
  },
  fighter2: {
    name: 'Дрикус дю Плесси',
    nickname: 'Stillknocks',
    record: '21-2-0',
    country: 'ЮАР',
    age: 30,
    height: '185 см',
    reach: '190 см'
  },
  event: 'UFC 305',
  date: '2024-01-20',
  time: '22:00',
  location: 'Перт, Австралия',
  venue: 'RAC Arena',
  league: 'UFC',
  status: 'upcoming',
  title: 'Чемпионский бой',
  weightClass: 'Средний вес',
  rounds: 5
};

const bettingOdds = [
  { bookmaker: 'Bet365', fighter1: 1.85, fighter2: 1.95 },
  { bookmaker: 'William Hill', fighter1: 1.80, fighter2: 2.00 },
  { bookmaker: 'Pinnacle', fighter1: 1.88, fighter2: 1.92 },
  { bookmaker: 'Betway', fighter1: 1.83, fighter2: 1.97 }
];

const whereToWatch = [
  { platform: 'UFC Fight Pass', price: 'Подписка', quality: '4K' },
  { platform: 'ESPN+', price: '$79.99', quality: 'HD' },
  { platform: 'BT Sport', price: 'Подписка', quality: 'HD' },
  { platform: 'Match TV', price: 'Бесплатно', quality: 'HD' }
];

const fightPredictions = [
  { expert: 'Джо Роган', prediction: 'Адесанья по очкам', confidence: '70%' },
  { expert: 'Даниэль Кормье', prediction: 'Дю Плесси КО', confidence: '60%' },
  { expert: 'Чаэль Соннен', prediction: 'Адесанья КО', confidence: '80%' },
  { expert: 'Доминик Круз', prediction: 'Адесанья по очкам', confidence: '65%' }
];

export default function FightDetailPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-800 p-4">
        <div className="container mx-auto flex items-center">
          <Link href="/fights" className="mr-4">
            <ArrowLeft size={24} className="text-white" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{fightData.event}</h1>
            <p className="text-red-100 text-sm">{fightData.title}</p>
          </div>
        </div>
      </header>

      {/* Fight Main Card */}
      <section className="p-4">
        <div className="container mx-auto">
          <div className="bg-gray-900 rounded-lg overflow-hidden mb-6">
            {/* Fight Header */}
            <div className="bg-gradient-to-r from-red-600 to-red-800 p-6 text-center">
              <div className="flex items-center justify-center mb-2">
                <Trophy size={20} className="text-yellow-500 mr-2" />
                <span className="text-yellow-500 font-semibold">{fightData.title}</span>
              </div>
              <h2 className="text-2xl font-bold mb-2">{fightData.weightClass}</h2>
              <p className="text-red-100">{fightData.rounds} раундов</p>
            </div>

            {/* Fighters */}
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Fighter 1 */}
                <div className="text-center md:text-right">
                  <div className="mb-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto md:ml-auto md:mr-0 mb-3">
                      <span className="text-3xl">🥊</span>
                    </div>
                    <h3 className="text-xl font-bold">{fightData.fighter1.name}</h3>
                    <p className="text-blue-400 text-sm">"{fightData.fighter1.nickname}"</p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between md:flex-row-reverse">
                      <span className="text-gray-400">Рекорд:</span>
                      <span className="font-semibold text-green-400">{fightData.fighter1.record}</span>
                    </div>
                    <div className="flex justify-between md:flex-row-reverse">
                      <span className="text-gray-400">Страна:</span>
                      <span>{fightData.fighter1.country}</span>
                    </div>
                    <div className="flex justify-between md:flex-row-reverse">
                      <span className="text-gray-400">Возраст:</span>
                      <span>{fightData.fighter1.age}</span>
                    </div>
                    <div className="flex justify-between md:flex-row-reverse">
                      <span className="text-gray-400">Рост:</span>
                      <span>{fightData.fighter1.height}</span>
                    </div>
                    <div className="flex justify-between md:flex-row-reverse">
                      <span className="text-gray-400">Размах:</span>
                      <span>{fightData.fighter1.reach}</span>
                    </div>
                  </div>
                </div>

                {/* VS */}
                <div className="text-center">
                  <div className="text-4xl font-bold text-red-500 mb-2">VS</div>
                  <div className="text-gray-400 text-sm">
                    <div className="flex items-center justify-center mb-1">
                      <Calendar size={14} className="mr-1" />
                      {new Date(fightData.date).toLocaleDateString('ru-RU')}
                    </div>
                    <div className="flex items-center justify-center mb-1">
                      <Clock size={14} className="mr-1" />
                      {fightData.time}
                    </div>
                    <div className="flex items-center justify-center">
                      <MapPin size={14} className="mr-1" />
                      {fightData.location}
                    </div>
                  </div>
                </div>

                {/* Fighter 2 */}
                <div className="text-center md:text-left">
                  <div className="mb-4">
                    <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mx-auto md:mr-auto md:ml-0 mb-3">
                      <span className="text-3xl">🥊</span>
                    </div>
                    <h3 className="text-xl font-bold">{fightData.fighter2.name}</h3>
                    <p className="text-red-400 text-sm">"{fightData.fighter2.nickname}"</p>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Рекорд:</span>
                      <span className="font-semibold text-green-400">{fightData.fighter2.record}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Страна:</span>
                      <span>{fightData.fighter2.country}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Возраст:</span>
                      <span>{fightData.fighter2.age}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Рост:</span>
                      <span>{fightData.fighter2.height}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Размах:</span>
                      <span>{fightData.fighter2.reach}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="p-4">
        <div className="container mx-auto">
          <div className="flex space-x-1 bg-gray-900 rounded-lg p-1 mb-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-shrink-0 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'overview' 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Обзор
            </button>
            <button
              onClick={() => setActiveTab('betting')}
              className={`flex-shrink-0 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'betting' 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Ставки
            </button>
            <button
              onClick={() => setActiveTab('watch')}
              className={`flex-shrink-0 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'watch' 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Где смотреть
            </button>
            <button
              onClick={() => setActiveTab('predictions')}
              className={`flex-shrink-0 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'predictions' 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Прогнозы
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Event Details */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <MapPin size={20} className="text-red-500 mr-2" />
                  Детали события
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Событие:</span>
                      <span className="font-semibold">{fightData.event}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Дата:</span>
                      <span className="font-semibold">{new Date(fightData.date).toLocaleDateString('ru-RU')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Время:</span>
                      <span className="font-semibold">{fightData.time}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Место:</span>
                      <span className="font-semibold">{fightData.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Арена:</span>
                      <span className="font-semibold">{fightData.venue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Лига:</span>
                      <span className="font-semibold text-red-500">{fightData.league}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Stats Comparison */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Target size={20} className="text-green-500 mr-2" />
                  Сравнение бойцов
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400 font-semibold">{fightData.fighter1.age}</span>
                    <span className="text-gray-400 text-sm">Возраст</span>
                    <span className="text-red-400 font-semibold">{fightData.fighter2.age}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400 font-semibold">{fightData.fighter1.height}</span>
                    <span className="text-gray-400 text-sm">Рост</span>
                    <span className="text-red-400 font-semibold">{fightData.fighter2.height}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400 font-semibold">{fightData.fighter1.reach}</span>
                    <span className="text-gray-400 text-sm">Размах рук</span>
                    <span className="text-red-400 font-semibold">{fightData.fighter2.reach}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'betting' && (
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <DollarSign size={20} className="text-green-500 mr-2" />
                  Коэффициенты букмекеров
                </h3>
                <div className="space-y-4">
                  {bettingOdds.map((odds, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">{odds.bookmaker}</span>
                        <div className="flex space-x-6">
                          <div className="text-center">
                            <p className="text-xs text-gray-400 mb-1">{fightData.fighter1.name}</p>
                            <p className="font-bold text-blue-400">{odds.fighter1}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-gray-400 mb-1">{fightData.fighter2.name}</p>
                            <p className="font-bold text-red-400">{odds.fighter2}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'watch' && (
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Users size={20} className="text-blue-500 mr-2" />
                  Где смотреть бой
                </h3>
                <div className="space-y-4">
                  {whereToWatch.map((platform, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{platform.platform}</h4>
                          <p className="text-sm text-gray-400">Качество: {platform.quality}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-400">{platform.price}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'predictions' && (
            <div className="space-y-6">
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <TrendingUp size={20} className="text-yellow-500 mr-2" />
                  Прогнозы экспертов
                </h3>
                <div className="space-y-4">
                  {fightPredictions.map((prediction, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{prediction.expert}</h4>
                          <p className="text-sm text-gray-400">{prediction.prediction}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-yellow-400">{prediction.confidence}</p>
                          <p className="text-xs text-gray-400">уверенность</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-red-600">
        <div className="flex justify-around items-center py-3">
          <Link href="/news" className="flex flex-col items-center space-y-1 text-gray-400 hover:text-red-500 transition-colors">
            <span className="text-xs">Новости</span>
          </Link>
          <Link href="/fights" className="flex flex-col items-center space-y-1 text-red-500">
            <span className="text-xs">Бои</span>
          </Link>
          <Link href="/fighters" className="flex flex-col items-center space-y-1 text-gray-400 hover:text-red-500 transition-colors">
            <span className="text-xs">Бойцы</span>
          </Link>
          <Link href="/betting" className="flex flex-col items-center space-y-1 text-gray-400 hover:text-red-500 transition-colors">
            <span className="text-xs">Ставки</span>
          </Link>
        </div>
      </nav>
    </div>
  );
}