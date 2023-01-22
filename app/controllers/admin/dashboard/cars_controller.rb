module Admin
  module Dashboard
    class CarsController < DashboardController
      def index
        @scope = Car.all
        @scope = @scope.ransack(search_params[:q])

        @pagy, @cars = pagy_countless(@scope.result, items: 4)
        respond_to do |format|
          format.html
          format.turbo_stream
        end
      end

      def edit
        @car = Car.find(params[:id])
      end

      def new
        @car = Car.new
      end

      def create
        @car = create_new_car
        if @car.save
          redirect_success
        else
          form_respond('new')
        end
      end

      def update
        @car = Car.find_by(id: params[:id])
        @car.assign_attributes(car_params)
        @car.release_date = Date.new(car_params[:release_date]&.to_i)

        if @car.save
          redirect_success
        else
          form_respond('edit')
        end
      end

      private

      def redirect_success
        redirect_to admin_dashboard_cars_path(format: :html), notice: I18n.t('flash.update.success')
      end

      def form_respond(template)
        respond_to do |format|
          format.html do
            flash[:error] = I18n.t('flash.update.error')
            render template
          end
          format.turbo_stream do
            flash.now[:error] = I18n.t('flash.update.error')
            render template
          end
        end
      end

      def create_new_car
        Car.new(car_params).tap do |car|
          car.release_date = Date.new(car_params[:release_date]&.to_i)
        end
      end

      def car_params
        @car_params ||= params.require(:car).permit(:body_configuration, :brand, :deposit, :engine_type, :name,
                                                    :transmission, :horsepower,
                                                    :format, :price_in_eur, :release_date,
                                                    gas_consumption_range: [], images: [])
      end

      def search_params
        params.permit(q: [:full_search, { brand_in: [], engine_type_in: [], body_configuration_in: [], transmission_in: [] }])
      end
    end
  end
end
