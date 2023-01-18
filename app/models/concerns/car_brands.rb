module CarBrands
  extend ActiveSupport::Concern

  AVAILABLE_CAR_BRANDS = %i[audi bmw].freeze
  AVAILABLE_CAR_BRANDS_ENUM_HASH = AVAILABLE_CAR_BRANDS.index_by(&:itself).transform_values(&:to_s)
end
