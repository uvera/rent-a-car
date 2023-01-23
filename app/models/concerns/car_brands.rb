module CarBrands
  extend ActiveSupport::Concern

  AVAILABLE_CAR_BRANDS = %i[audi bmw tesla mazda volkswagen skoda seat
                            peugeot renault mercedes toyota hyundai porsche chevrolet nissan kia gmc
                            ford volvo opel citroen suzuki dacia fiat jeep chrysler mini
                            land_rover lexus dodge polestar
].freeze
  AVAILABLE_CAR_BRANDS_ENUM_HASH = AVAILABLE_CAR_BRANDS.index_by(&:itself).transform_values(&:to_s)
end
