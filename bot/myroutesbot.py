import logging
import os
from typing import Dict

from telegram import ReplyKeyboardMarkup, Update, ReplyKeyboardRemove
from telegram.ext import (
    Updater,
    CommandHandler,
    MessageHandler,
    Filters,
    ConversationHandler,
    CallbackContext,
)

import load

logging.basicConfig(
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s', level=logging.INFO
)

logger = logging.getLogger(__name__)

UPLOAD_FILE, GET_CATEGORY, GET_CITY, GET_COMPANION, GET_TRIP = range(5)


def start(update: Update, context: CallbackContext) -> int:
    # enable next
    update.message.reply_text(
        "Primero sube el fichero GPX"
    )
    return UPLOAD_FILE


def upload_gpx(update: Update, context: CallbackContext) -> int:
    # process
    gpx_file = update.message.document
    file_name = gpx_file.file_name
    gpx_file.get_file().download(file_name)
    logger.info(f"Uploaded {file_name}")

    # user data
    user_data = context.user_data
    user_data['file_name'] = file_name

    # enable next
    category_kb = [
            ['hiking', 'biking'],
            ['car', 'bus', 'train'],
            ['motorbike', 'flight', 'boat']
    ]
    category_markup = ReplyKeyboardMarkup(category_kb, one_time_keyboard=True)
    update.message.reply_text(
        '¿Qué tipo de actividad es?',
        reply_markup=category_markup,
    )
    return GET_CATEGORY


def get_category(update: Update, context: CallbackContext) -> int:
    # process
    category = update.message.text
    logger.info(f"Category {category}")

    # user data
    user_data = context.user_data
    user_data['category'] = category

    # enable next
    update.message.reply_text(
        "¿En qué ciudad?",
        reply_markup=ReplyKeyboardRemove(),
    )
    return GET_CITY


def get_city(update: Update, context: CallbackContext) -> int:
    # process
    city = update.message.text
    logger.info(f"City {city}")

    # user data
    user_data = context.user_data
    user_data['city'] = city

    # enable next
    update.message.reply_text(
        "¿Fuiste con alguien?\n"
        "/skip si no fuisteis con nadie más"
    )

    return GET_COMPANION


def get_companion(update: Update, context: CallbackContext) -> int:
    # process
    companion = update.message.text
    logger.info(f"Companion {companion}")

    # user data
    user_data = context.user_data
    user_data['companion'] = companion

    # enable next
    update.message.reply_text(
        "¿Era un viaje?\n"
        "/skip si no era en un viaje"
    )
    return GET_TRIP


def skip_companion(update: Update, context: CallbackContext) -> int:
    # process
    logger.info("No companion")

    # enble next
    update.message.reply_text(
        "¿Era un viaje?\n"
        "/skip si no era en un viaje"
    )
    return GET_TRIP


def get_trip(update: Update, context: CallbackContext) -> int:
    # process
    trip = update.message.text
    logger.info(f"Trip {trip}")

    # user data
    user_data = context.user_data
    user_data['trip'] = trip

    # end
    update.message.reply_text(
        "Vamos a procesar todo esto.\n"
    )
    # process the new route
    load.add_new_route(**user_data)
    update.message.reply_text(
        "¡Hecho!\n"
    )
    return ConversationHandler.END


def skip_trip(update: Update, context: CallbackContext) -> int:
    # process
    logger.info("No trip")

    # user data
    user_data = context.user_data

    # end
    update.message.reply_text(
        "Vamos a procesar todo esto.\n"
    )
    # process the new route
    load.add_new_route(**user_data)
    update.message.reply_text(
        "¡Hecho!\n"
    )
    return ConversationHandler.END


def cancel(update: Update, context: CallbackContext) -> int:
    user_data = context.user_data
    update.message.reply_text(
        "Cancelamos subida de GPX, pues"
    )
    logger.info("Cancel")

    user_data.clear()
    return ConversationHandler.END


def main() -> None:
    """Run the bot."""
    updater = Updater(os.getenv('TELEGRAM_TOKEN'))
    dispatcher = updater.dispatcher

    tlgrm_username = os.getenv("TELEGRAM_USERNAME")
    conv_handler = ConversationHandler(
        entry_points=[
            CommandHandler('start', start, filters=Filters.user(username=tlgrm_username))
        ],
        states={
            UPLOAD_FILE: [
                MessageHandler(Filters.document, upload_gpx),
            ],
            GET_CATEGORY: [
                MessageHandler(Filters.text, get_category),
            ],
            GET_CITY: [
                MessageHandler(Filters.text, get_city)
            ],
            GET_COMPANION: [
                MessageHandler(Filters.text & ~Filters.command, get_companion),
                CommandHandler('skip', skip_companion)
            ],
            GET_TRIP: [
                MessageHandler(Filters.text & ~Filters.command, get_trip),
                CommandHandler('skip', skip_trip)
            ]

        },
        fallbacks=[CommandHandler('cancel', cancel)],
    )

    dispatcher.add_handler(conv_handler)
    updater.start_polling()
    updater.idle()


if __name__ == '__main__':
    main()
