# frozen_string_literal: true

require 'telegram/bot'

class SendTelegramBotMessageJob < ApplicationJob
  def perform(payload)
    text = payload[:message]
    chat_id = payload[:chat_id]
    token = ENV.fetch('TELEGRAM_BOT_TOKEN', nil)
    ::Telegram::Bot::Client.run(token) do |bot|
      bot.api.send_message(chat_id:, text:, parse_mode: 'markdown')
    end
  end
end
