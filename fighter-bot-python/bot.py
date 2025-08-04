import os
import logging
from telegram import Update, InlineKeyboardButton, InlineKeyboardMarkup, WebAppInfo
from telegram.ext import Application, CommandHandler, CallbackQueryHandler, MessageHandler, filters, ContextTypes
from dotenv import load_dotenv

# Загружаем переменные окружения
load_dotenv()

# Настройка логирования
logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    level=logging.INFO
)
logger = logging.getLogger(__name__)

class FighterBot:
    def __init__(self):
        self.token = os.getenv('TELEGRAM_BOT_TOKEN')
        self.web_app_url = os.getenv('WEB_APP_URL', 'https://your-domain.com')
        
        if not self.token:
            logger.error('❌ TELEGRAM_BOT_TOKEN не найден в .env файле')
            raise ValueError('TELEGRAM_BOT_TOKEN не найден')
        
        # Создаем приложение
        self.application = Application.builder().token(self.token).build()
        
        # Регистрируем обработчики
        self._register_handlers()
    
    def _register_handlers(self):
        """Регистрация всех обработчиков команд и сообщений"""
        
        # Команды
        self.application.add_handler(CommandHandler("start", self.start_command))
        self.application.add_handler(CommandHandler("help", self.help_command))
        
        # Callback кнопки
        self.application.add_handler(CallbackQueryHandler(self.button_callback))
        
        # Обработчик всех остальных сообщений
        self.application.add_handler(MessageHandler(filters.TEXT & ~filters.COMMAND, self.handle_message))
    
    async def start_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Обработчик команды /start"""
        user = update.effective_user
        first_name = user.first_name or 'Боец'
        
        welcome_message = f"""
🥊 Добро пожаловать в Fighter Bot, {first_name}!

Здесь вы можете получить самую актуальную информацию о:
• 📰 Последние новости боев
• 🗓 Предстоящие бои
• 🏆 Турниры
• 👤 Информация о бойцах

Нажмите кнопку ниже, чтобы открыть приложение:
        """
        
        # Создаем клавиатуру с кнопками
        keyboard = [
            [InlineKeyboardButton("🚀 Открыть Fighter App", web_app=WebAppInfo(url=self.web_app_url))],
            [
                InlineKeyboardButton("📱 О боте", callback_data='about'),
                InlineKeyboardButton("⚙️ Помощь", callback_data='help')
            ]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(welcome_message, reply_markup=reply_markup)
    
    async def help_command(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Обработчик команды /help"""
        help_message = """
🆘 Помощь по Fighter Bot

Доступные команды:
/start - Главное меню
/help - Эта справка

Для полного доступа к функциям используйте Web App через кнопку "Открыть Fighter App".
        """
        await update.message.reply_text(help_message)
    
    async def button_callback(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Обработчик нажатий на inline кнопки"""
        query = update.callback_query
        await query.answer()
        
        if query.data == 'about':
            about_message = """
🥊 Fighter Bot v2.0

Современное приложение для любителей боевых искусств:
• Актуальные новости из мира боев
• Расписание предстоящих событий
• Информация о турнирах
• Профили известных бойцов

Создано с использованием современных технологий для лучшего пользовательского опыта.
            """
            await query.edit_message_text(about_message)
            
        elif query.data == 'help':
            help_message = """
❓ Как пользоваться ботом:

1. Нажмите "🚀 Открыть Fighter App" для доступа к полному функционалу
2. В приложении вы найдете все разделы с информацией о боях
3. Используйте /start для возврата в главное меню

💡 Совет: Добавьте бота в избранное для быстрого доступа!
            """
            await query.edit_message_text(help_message)
    
    async def handle_message(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Обработчик всех остальных сообщений"""
        message = """
👋 Привет! Я Fighter Bot.

Используйте /start для доступа к главному меню или нажмите кнопку ниже:
        """
        
        keyboard = [
            [InlineKeyboardButton("🚀 Открыть Fighter App", web_app=WebAppInfo(url=self.web_app_url))]
        ]
        reply_markup = InlineKeyboardMarkup(keyboard)
        
        await update.message.reply_text(message, reply_markup=reply_markup)
    
    async def error_handler(self, update: Update, context: ContextTypes.DEFAULT_TYPE):
        """Обработчик ошибок"""
        logger.error(f'❌ Ошибка при обработке обновления {update}: {context.error}')
    
    def run(self):
        """Запуск бота"""
        logger.info('🚀 Запуск Fighter Bot...')
        
        # Добавляем обработчик ошибок
        self.application.add_error_handler(self.error_handler)
        
        # Запускаем бота
        self.application.run_polling(
            allowed_updates=Update.ALL_TYPES,
            drop_pending_updates=True
        )

if __name__ == '__main__':
    try:
        bot = FighterBot()
        bot.run()
    except KeyboardInterrupt:
        logger.info('🛑 Бот остановлен пользователем')
    except Exception as e:
        logger.error(f'❌ Критическая ошибка: {e}')