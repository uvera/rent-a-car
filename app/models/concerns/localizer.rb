# frozen_string_literal: true

module Localizer
  extend ActiveSupport::Concern

  module ClassMethods
    def localize_column(attribute)
      define_method(attribute) do
        method_name = "#{attribute}_#{I18n.locale}"

        if respond_to?(method_name) && (value = send(method_name))
          value
        elsif (first_found_locale = I18n.available_locales.find do |locale|
          respond_to?("#{attribute}_#{locale}?") &&
            respond_to?("#{attribute}_#{locale}") &&
            send("#{attribute}_#{locale}?")
        end)
          send("#{attribute}_#{first_found_locale}")
        end
      end

      define_method("#{attribute}?") do
        send(attribute).presence
      end
    end
  end
end
