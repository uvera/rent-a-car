module Landing
  class CarsController < LandingController
    def index
      @scope = Car.friendly.kept
      @scope = @scope.ransack(search_params[:q])
      @scope.sorts = 'name asc' if @scope.sorts.empty?

      @pagy, @cars = pagy_countless(@scope.result(distinct: true), items: 20)
      respond_to do |format|
        format.html
        format.turbo_stream
      end
    end

    def show
      @car = Car.kept.friendly.find(params[:id])
    end

    private

    def search_params
      params.permit(q: [:full_search, :s,
                        { brand_in: [],
                          engine_type_in: [],
                          body_configuration_in: [],
                          transmission_in: [],
                          s: [] }])
    end
  end
end
