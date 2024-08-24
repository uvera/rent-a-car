class ApplicationController < ActionController::Base
  include Pagy::Backend
  default_form_builder CustomFormBuilder

  add_flash_types :error
  around_action :switch_locale

  def switch_locale(&action)
    locale = cookies[:locale]&.to_sym || I18n.default_locale
    return unless I18n.locale_available?(locale)

    I18n.with_locale(locale, &action)
  end

  def error_to_json(err)
    case err
    when ActiveRecord::RecordInvalid
      attributes = err.record.errors.attribute_names
      attributes.map do |attribute|
        {
          path: attribute.to_s,
          messages: err.record.errors.full_messages_for(attribute),
        }
      end
    when Dry::Validation::Result
      err_hash = err.errors(full: true).to_h
      err_hash.entries.map do |path, messages|
        { path: path.to_s, messages: messages }
      end
    end
  end
end
