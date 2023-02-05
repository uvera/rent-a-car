# frozen_string_literal: true

class NotifyInquireCreatedService
  attr_reader :inquire

  def initialize(inquire)
    # @type [CarInquire]
    @inquire = inquire
  end

  def perform
    return unless owner_chat_id

    SendTelegramBotMessageJob.perform_later(payload)
  end

  def payload
    scope = 'landing.car_inquires.labels'
    locale = :ru
    chat_id = owner_chat_id
    message = <<~STRING
      *Inquire*:\n
      *#{I18n.t('id', scope:, locale:)}*: #{inquire.friendly_id}\n
      *#{I18n.t('arrival_flight_at', scope:, locale:)}*: #{I18n.l(inquire.arrival_flight_at)}
      *#{I18n.t('arrival_flight_number', scope:, locale:)}*: #{inquire.arrival_flight_at}
      *#{I18n.t('driver_license_number', scope:, locale:)}*: #{inquire.driver_license_number}
      *#{I18n.t('passport_number', scope:, locale:)}*: #{inquire.passport_number}
      *#{I18n.t('phone_number', scope:, locale:)}*: #{inquire.phone_number}
    STRING

    if inquire.telegram_phone_number?
      message += "*#{I18n.t('telegram_phone_number', scope:, locale:)}*: #{inquire.telegram_phone_number}\n"
    end

    if inquire.viber_phone_number?
      message += "*#{I18n.t('viber_phone_number', scope:, locale:)}*: #{inquire.viber_phone_number}\n"
    end

    if inquire.whatsapp_phone_number?
      message += "*#{I18n.t('whatsapp_phone_number', scope:, locale:)}*: #{inquire.whatsapp_phone_number}\n"
    end

    message += <<~STRING
      *#{I18n.t('pickup_at', scope:, locale:)}*: #{I18n.l(inquire.pickup_at)}
      *#{I18n.t('return_at', scope:, locale:)}*: #{I18n.l(inquire.return_at)}
    STRING

    { chat_id:, message: }
  end

  def owner_chat_id
    @owner_chat_id ||= Configuration.value_for('telegram_bot_owner_chat_id')
  end
end
