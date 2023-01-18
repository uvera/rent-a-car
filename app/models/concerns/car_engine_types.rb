module CarEngineTypes
  extend ActiveSupport::Concern

  AVAILABLE_CAR_ENGINE_TYPES = %i[gas diesel electric hybrid].freeze
  CAR_ENGINE_TYPES_ENUM_HASH = AVAILABLE_CAR_ENGINE_TYPES.index_by(&:itself).transform_values(&:to_s)

end
