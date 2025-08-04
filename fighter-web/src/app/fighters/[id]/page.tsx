'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trophy, Target, Calendar, MapPin, Clock, TrendingUp, User } from 'lucide-react';

// Данные бойца (в реальном приложении будут загружаться по ID)
const fighterData = {
  id: 1,
  name: 'Хабиб Нурмагомедов',
  nickname: 'The Eagle',
  record: '29-0-0',
  weightClass: 'Легкий вес',
  league: 'UFC',
  country: 'Россия',
  age: 35,
  height: '178 см',
  reach: '178 см',
  status: 'Чемпион (на пенсии)',
  wins: { ko: 8, submission: 11, decision: 10 },
  ranking: 1,
  bio: 'Хабиб Нурмагомедов - российский боец смешанных единоборств, бывший чемпион UFC в легком весе. Известен своим непобедимым рекордом и доминирующим стилем борьбы.',
  achievements: [
    'Чемпион UFC в легком весе (2018-2020)',
    'Самая длинная серия побед в легком весе UFC (13)',
    'Боец года по версии ESPN (2020)',
    'Зал славы UFC (2022)'
  ]
};

const fighterNews = [
  {
    id: 1,
    title: 'Хабиб рассказал о возможном возвращении',
    date: '2024-01-15',
    summary: 'Экс-чемпион UFC прокомментировал слухи о своем возвращении в октагон'
  },
  {
    id: 2,
    title: 'Тренировочный лагерь команды Хабиба',
    date: '2024-01-10',
    summary: 'Репортаж из тренировочного лагеря в Дагестане'
  }
];

const fightHistory = [
  {
    id: 1,
    opponent: 'Джастин Гэтжи',
    event: 'UFC 254',
    date: '2020-10-24',
    result: 'Победа',
    method: 'Удушение (треугольник)',
    round: 2,
    time: '1:34'
  },
  {
    id: 2,
    opponent: 'Дастин Порье',
    event: 'UFC 242',
    date: '2019-09-07',
    result: 'Победа',
    method: 'Удушение (сзади)',
    round: 3,
    time: '2:06'
  },
  {
    id: 3,
    opponent: 'Конор МакГрегор',
    event: 'UFC 229',
    date: '2018-10-06',
    result: 'Победа',
    method: 'Удушение (сзади)',
    round: 4,
    time: '3:03'
  },
  {
    id: 4,
    opponent: 'Эл Яквинта',
    event: 'UFC 223',
    date: '2018-04-07',
    result: 'Победа',
    method: 'Решение судей',
    round: 5,
    time: '5:00'
  }
];

export default function FighterDetailPage() {
  const [activeTab, setActiveTab] = useState('stats');

  return (
    <div className="min-h-screen bg-black text-white pb-20">
      {/* Header */}
      <header className="bg-gradient-to-r from-red-600 to-red-800 p-4">
        <div className="container mx-auto flex items-center">
          <Link href="/fighters" className="mr-4">
            <ArrowLeft size={24} className="text-white" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{fighterData.name}</h1>
            <p className="text-red-100 text-sm">"{fighterData.nickname}"</p>
          </div>
        </div>
      </header>

      {/* Fighter Profile */}
      <section className="p-4">
        <div className="container mx-auto">
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            {/* Fighter Image and Basic Info */}
            <div className="md:flex">
              <div className="md:w-1/3">
                <div className="h-64 md:h-80 bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center relative">
                  <span className="text-8xl">🥊</span>
                  {fighterData.ranking === 1 && (
                    <div className="absolute top-4 left-4">
                      <Trophy size={24} className="text-yellow-500" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded text-sm font-semibold">
                      {fighterData.league}
                    </span>
                  </div>
                </div>
              </div>

              <div className="md:w-2/3 p-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">{fighterData.record}</div>
                    <div className="text-gray-400 text-sm">Рекорд</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-500">{fighterData.age}</div>
                    <div className="text-gray-400 text-sm">Возраст</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-500">#{fighterData.ranking}</div>
                    <div className="text-gray-400 text-sm">Рейтинг</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Весовая категория:</span>
                    <span className="text-white font-semibold">{fighterData.weightClass}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Страна:</span>
                    <span className="text-white font-semibold">{fighterData.country}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Рост:</span>
                    <span className="text-white font-semibold">{fighterData.height}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Размах рук:</span>
                    <span className="text-white font-semibold">{fighterData.reach}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Статус:</span>
                    <span className="text-yellow-500 font-semibold">{fighterData.status}</span>
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
          <div className="flex space-x-1 bg-gray-900 rounded-lg p-1 mb-6">
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'stats' 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Статистика
            </button>
            <button
              onClick={() => setActiveTab('fights')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'fights' 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Бои
            </button>
            <button
              onClick={() => setActiveTab('news')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'news' 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Новости
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'stats' && (
            <div className="space-y-6">
              {/* Bio */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <User size={20} className="text-red-500 mr-2" />
                  Биография
                </h3>
                <p className="text-gray-300 leading-relaxed">{fighterData.bio}</p>
              </div>

              {/* Win Statistics */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Target size={20} className="text-green-500 mr-2" />
                  Статистика побед
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-red-500">{fighterData.wins.ko}</div>
                    <div className="text-gray-400 text-sm">Нокауты</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-blue-500">{fighterData.wins.submission}</div>
                    <div className="text-gray-400 text-sm">Сабмишены</div>
                  </div>
                  <div className="text-center p-4 bg-gray-800 rounded-lg">
                    <div className="text-2xl font-bold text-yellow-500">{fighterData.wins.decision}</div>
                    <div className="text-gray-400 text-sm">Решения</div>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-gray-900 rounded-lg p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Trophy size={20} className="text-yellow-500 mr-2" />
                  Достижения
                </h3>
                <ul className="space-y-2">
                  {fighterData.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <span className="w-2 h-2 bg-red-500 rounded-full mr-3"></span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'fights' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4">История боев</h3>
              {fightHistory.map(fight => (
                <div key={fight.id} className="bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold">vs {fight.opponent}</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      fight.result === 'Победа' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                    }`}>
                      {fight.result}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center">
                      <Calendar size={14} className="text-red-500 mr-2" />
                      <span>{new Date(fight.date).toLocaleDateString('ru-RU')}</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin size={14} className="text-red-500 mr-2" />
                      <span>{fight.event}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock size={14} className="text-red-500 mr-2" />
                      <span>Раунд {fight.round}, {fight.time}</span>
                    </div>
                    <div className="flex items-center">
                      <Target size={14} className="text-red-500 mr-2" />
                      <span>{fight.method}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'news' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold mb-4">Новости о бойце</h3>
              {fighterNews.map(news => (
                <Link key={news.id} href={`/news/${news.id}`}>
                  <article className="bg-gray-900 rounded-lg p-4 hover:border-red-600 border border-gray-800 transition-colors cursor-pointer">
                    <div className="flex items-center mb-2">
                      <Calendar size={14} className="text-red-500 mr-2" />
                      <span className="text-gray-400 text-sm">
                        {new Date(news.date).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    <h4 className="text-lg font-semibold mb-2 hover:text-red-500 transition-colors">
                      {news.title}
                    </h4>
                    <p className="text-gray-300">{news.summary}</p>
                  </article>
                </Link>
              ))}
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
          <Link href="/fights" className="flex flex-col items-center space-y-1 text-gray-400 hover:text-red-500 transition-colors">
            <span className="text-xs">Бои</span>
          </Link>
          <Link href="/fighters" className="flex flex-col items-center space-y-1 text-red-500">
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