# 🐳 Запуск Fighter Bot с Docker

## Быстрый старт

### 1. Настройка переменных окружения

Скопируйте файл с примером переменных окружения:
```bash
cp .env.example .env
```

Отредактируйте `.env` файл и укажите ваши данные:
```env
# Telegram Bot Token (получите от @BotFather)
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here

# Web App URL (для локального запуска)
WEB_APP_URL=http://localhost:3000

# Port for web server
PORT=3000
```

### 2. Запуск с Docker Compose

```bash
# Сборка и запуск всех сервисов
docker-compose up --build

# Запуск в фоновом режиме
docker-compose up -d --build

# Просмотр логов
docker-compose logs -f

# Остановка сервисов
docker-compose down
```

### 3. Доступ к приложению

- **Веб-приложение**: http://localhost:3000
- **Telegram бот**: Найдите вашего бота в Telegram и отправьте `/start`

## Структура проекта

```
fighter-bot/
├── docker-compose.yml          # Конфигурация Docker Compose
├── .env                        # Переменные окружения
├── fighter-web/                # Next.js веб-приложение
│   ├── Dockerfile
│   └── ...
└── fighter-bot-python/         # Python Telegram бот
    ├── Dockerfile
    ├── bot.py
    └── requirements.txt
```

## Полезные команды

### Пересборка конкретного сервиса
```bash
# Пересборка только веб-приложения
docker-compose build fighter-web

# Пересборка только бота
docker-compose build fighter-bot
```

### Просмотр логов конкретного сервиса
```bash
# Логи веб-приложения
docker-compose logs -f fighter-web

# Логи бота
docker-compose logs -f fighter-bot
```

### Выполнение команд внутри контейнера
```bash
# Зайти в контейнер веб-приложения
docker-compose exec fighter-web sh

# Зайти в контейнер бота
docker-compose exec fighter-bot bash
```

### Очистка
```bash
# Остановка и удаление контейнеров
docker-compose down

# Удаление контейнеров, сетей и volumes
docker-compose down -v

# Удаление образов
docker-compose down --rmi all
```

## Разработка

Для разработки вы можете монтировать локальные директории:

```bash
# Запуск с монтированием исходного кода (уже настроено в docker-compose.yml)
docker-compose up --build
```

Изменения в коде будут автоматически отражаться в контейнерах.

## Производственный запуск

Для продакшена рекомендуется:

1. Использовать отдельный `.env` файл с продакшен настройками
2. Настроить reverse proxy (nginx)
3. Использовать HTTPS
4. Настроить мониторинг и логирование

```bash
# Запуск в продакшене
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Устранение неполадок

### Проблемы с портами
Если порт 3000 занят, измените его в `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Изменить на свободный порт
```

### Проблемы с токеном бота
Убедитесь, что:
1. Токен правильно указан в `.env` файле
2. Бот создан через @BotFather
3. Нет лишних пробелов в токене

### Проблемы с сетью
```bash
# Пересоздание сети
docker-compose down
docker network prune
docker-compose up --build
```