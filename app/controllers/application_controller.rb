class ApplicationController < ActionController::Base
  include Pagy::Backend
  default_form_builder CustomFormBuilder

  add_flash_types :error
  around_action :switch_locale

  rescue_from ActiveRecord::RecordNotFound, with: :render_exception
  rescue_from StandardError, with: :render_exception

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

  protected

  def render_exception(exception)
    @exception = exception
    @status_code =
      @exception.try(:status_code) ||
        ActionDispatch::ExceptionWrapper.new(
          request.env,
          @exception,
        ).status_code
    render template: "errors/#{view_for_code(@status_code)}",
           status: @status_code
  end

  def view_for_code(code)
    supported_error_codes.fetch(code, "404")
  end

  def supported_error_codes
    { 403 => "403", 404 => "404", 500 => "500" }
  end
end
