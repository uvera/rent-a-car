module Landing
  class CarsController < LandingController
    def index
      @scope = Car.kept
      @scope = @scope.ransack(search_params[:q])

      @pagy, @cars = pagy_countless(@scope.result, items: 4)
      respond_to do |format|
        format.html
        format.turbo_stream
      end
    end

    def show; end

    private

    def search_params
      params.permit(q: [:full_search, { brand_in: [], engine_type_in: [], body_configuration_in: [], transmission_in: [] }])
    end
  end
end
