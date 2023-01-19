module CarTransmissionTypes
  extend ActiveSupport::Concern

  AVAILABLE_CAR_TRANSM_TYPES = %i[manual automatic].freeze
  AVAILABLE_CAR_TRANSM_TYPES_ENUM_HASH = AVAILABLE_CAR_TRANSM_TYPES.index_by(&:itself).transform_values(&:to_s)

end
