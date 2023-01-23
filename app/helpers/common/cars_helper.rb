module Common
  module CarsHelper
    def car_brands_for_select
      Car::AVAILABLE_CAR_BRANDS.map do |brand|
        [I18n.t("cars.brands.#{brand}"), brand.to_s]
      end
    end

    def car_engine_types_for_select
      Car::AVAILABLE_CAR_ENGINE_TYPES.map do |engine|
        [I18n.t("cars.engine_types.#{engine}"), engine.to_s]
      end
    end

    def car_transmission_types_for_select
      Car::AVAILABLE_CAR_TRANSM_TYPES.map do |engine|
        [I18n.t("cars.transmission_types.#{engine}"), engine.to_s]
      end
    end

    def car_body_configuration_types_for_select
      Car::AVAILABLE_CAR_BODY_CONF.map do |body|
        [I18n.t("cars.body_types.#{body}"), body.to_s]
      end
    end

    def car_sortables_for_select
      %i[price_in_eur release_date name deposit].map do |field|
        %i[asc desc].map do |order|
          ["#{I18n.t("forms.cars.sorting.fields.#{field}")} #{I18n.t("forms.cars.sorting.#{order}")}",
           "#{field} #{order}"]
        end
      end.flatten(1)
    end
  end
end
