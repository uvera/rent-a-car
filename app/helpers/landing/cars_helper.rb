module Landing
  module CarsHelper
    def landing_cars_turbo_pagination_path(**options)
      additional_params = params.permit(
        q: [
          :full_search, { brand_in: [],
                          engine_type_in: [], body_configuration_in: [], transmission_in: [], s: [] }
        ]
      )

      cars_path(**options, **additional_params, format: :turbo_stream)
    end
  end
end
