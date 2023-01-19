class ApplicationController < ActionController::Base
  include Pagy::Backend

  add_flash_types :error
  around_action :switch_locale

  def switch_locale(&action)
    locale = cookies[:locale]&.to_sym || I18n.default_locale
    return unless I18n.locale_available?(locale)

    I18n.with_locale(locale, &action)
  end
end
