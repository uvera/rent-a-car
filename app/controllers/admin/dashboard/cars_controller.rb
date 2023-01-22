module Admin
  module Dashboard
    class CarsController < DashboardController
      def index
        @scope = Car.friendly.with_discarded.order(:name)
        @scope = @scope.ransack(search_params[:q])

        @pagy, @cars = pagy_countless(@scope.result, items: 4)
        respond_to do |format|
          format.html
          format.turbo_stream
        end
      end

      def edit
        @car = Car.friendly.find(params[:id])
      end

      def new
        @car = Car.new
      end

      def create
        @car = create_new_car
        if @car.save
          redirect_success
        else
          form_respond_fail('new')
        end
      end

      def update
        @car = Car.friendly.find(params[:id])
        @car.assign_attributes(car_params)
        @car.release_date = Date.new(car_params[:release_date]&.to_i)

        if @car.save
          redirect_success
        else
          form_respond_fail('edit')
        end
      end

      def destroy
        @car = Car.friendly.find(params[:id])
        @car.discard
        respond_to do |format|
          format.turbo_stream do
            flash.now[:notice] = I18n.t('flash.update.discard')
          end
          format.html do
            flash[:notice] = I18n.t('flash.update.discard')
          end
        end
        render 'edit'
      end

      def undiscard
        @car = Car.friendly.find(params[:id])
        @car.undiscard
        respond_to do |format|
          format.turbo_stream do
            flash.now[:notice] = I18n.t('flash.update.restore')
          end
          format.html do
            flash[:notice] = I18n.t('flash.update.restore')
          end
        end
        render 'edit'
      end

      private

      def redirect_success
        redirect_to admin_dashboard_cars_path(format: :html), notice: I18n.t('flash.update.success')
      end

      def form_respond_fail(template)
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
                                                    :youtube_link, :transmission, :horsepower,
                                                    :format, :price_in_eur, :release_date,
                                                    :description_en, :description_ru, :description_rs,
                                                    gas_consumption_range: [], images: [])
      end

      def search_params
        params.permit(q: [:full_search, { brand_in: [], engine_type_in: [], body_configuration_in: [], transmission_in: [] }])
      end
    end
  end
end
