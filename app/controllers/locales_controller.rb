class LocalesController < ApplicationController
  def set_locale
    param_locale = params[:locale]
    if param_locale.present? && I18n.locale_available?(locale)
      cookies.permanent[:locale] = param_locale
      redirect_back_or_to '/'
    end
  end
end