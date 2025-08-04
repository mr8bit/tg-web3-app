# Fighter Bot Python

Telegram бот для Fighter App, написанный на Python с использованием современной библиотеки python-telegram-bot.

## Установка

1. Установите Python 3.8+
2. Установите зависимости:
```bash
pip install -r requirements.txt
```

3. Скопируйте файл конфигурации:
```bash
cp .env.example .env
```

4. Отредактируйте `.env` файл и добавьте ваш токен бота:
```
TELEGRAM_BOT_TOKEN=your_telegram_bot_token_here
WEB_APP_URL=https://your-nextjs-domain.com
```

## Запуск

```bash
python bot.py
```

## Функции

- 🚀 Современная архитектура с классами
- 📱 Поддержка Telegram Web App
- 🔄 Автоматическая обработка ошибок
- 📝 Подробное логирование
- ⚡ Асинхронная обработка сообщений

## Команды бота

- `/start` - Главное меню с кнопкой для открытия Web App
- `/help` - Справка по использованию
- Inline кнопки для "О боте" и "Помощь"

## Структура

- `bot.py` - Основной файл бота
- `requirements.txt` - Зависимости Python
- `.env.example` - Пример файла конфигурации
- `README.md` - Документация