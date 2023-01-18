# frozen_string_literal: true

module Admin
  module Dashboard
    class CarImagesController < ActionController::API
      def destroy
        car = Car.find_by(id: params[:car_id])
        return render status: :not_found, json: {} unless car
        car.images.find(params[:id])&.purge_later
        render status: :ok, json: {}
      end
    end
  end
end
