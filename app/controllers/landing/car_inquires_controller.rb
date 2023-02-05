module Landing
  class CarInquiresController < LandingController
    include FormResponses

    def create
      @inquire = CarInquire.new(create_params)
      @car = Car.friendly.find(params[:car_id])
      @inquire.car = @car
      if @inquire.save
        NotifyInquireCreatedService.new(@inquire).perform
        redirect_success
      else
        form_respond_fail('new')
      end
    end

    def new
      @inquire = CarInquire.new
      @car = Car.friendly.find(params[:car_id])
    end

    def show
      @inquire = CarInquire.friendly.find(params[:id])
    end

    private

    def create_params
      @create_params ||= params.require(:car_inquire).permit(
        :car_id, :arrival_flight_at, :arrival_flight_number,
        :driver_license_number, :passport_number, :phone_number,
        :whatsapp_phone_number, :viber_phone_number, :telegram_phone_number,
        :pickup_at, :pickup_lat, :pickup_long,
        :return_at, :return_lat, :return_long
      )
    end

    def redirect_success
      redirect_to car_inquire_path(id: @inquire.friendly_id)
    end
  end
end
