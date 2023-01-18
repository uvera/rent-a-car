# frozen_string_literal: true

module CarBodyConfigurations
  extend ActiveSupport::Concern

  AVAILABLE_CAR_BODY_CONF = %i[hatchback sedan convertible suv minivan coupe].freeze
  AVAILABLE_CAR_BODY_CONF_ENUM_HASH = AVAILABLE_CAR_BODY_CONF.index_by(&:itself).transform_values(&:to_s)
end
