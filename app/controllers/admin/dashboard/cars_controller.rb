module Admin
  module Dashboard
    class CarsController < DashboardController
      def index; end

      def edit
        @car = Car.find(params[:id])
      end

      def new
        @car = Car.new
      end

      def create
        @car = create_new_car
        if @car.save
          redirect_to admin_dashboard_cars_path, notice: I18n.t('flash.update.success')
        else
          flash[:error] = I18n.t('flash.update.error')
          render 'new'
        end
      end

      def update
        @car = Car.find_by(id: params[:id])
        @car.assign_attributes(car_params)
        @car.release_date = Date.new(car_params[:release_date]&.to_i)
        binding.pry

        if @car.save
          redirect_to admin_dashboard_cars_path, notice: I18n.t('flash.update.success')
        else
          flash[:error] = I18n.t('flash.update.error')
          render 'new'
        end
      end

      private

      def create_new_car
        Car.new(car_params).tap do |car|
          car.release_date = Date.new(car_params[:release_date]&.to_i)
        end
      end

      def car_params
        @car_params ||= params.require(:car).permit(:body_configuration, :brand, :deposit, :engine_type, :name,
                                                    :price_in_eur, :release_date, gas_consumption_range: [], images: [])
      end
    end
  end
end
