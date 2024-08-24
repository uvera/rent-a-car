# frozen_string_literal: true

module Admin
  module Dashboard
    class CarImagesController < ApplicationController
      schema(:index) { required(:car_id).filled(:integer) }
      def index
        car = Car.find(safe_params[:car_id])
        images =
          car.images.map do |attachment|
            {
              url: url_for(attachment),
              deletionUrl:
                admin_dashboard_car_image_path(
                  car_id: car.id,
                  id: attachment.id,
                ),
            }
          end

        render json: { images: }
      end

      schema(:create) do
        required(:car_id).filled(:integer)
        required(:file).filled(:any)
      end
      def create
        result = CreateImageAction.call(safe_params.to_h)
        if result.failure?
          return(
            render status: :unprocessable_entity,
                   json: {
                     errors: error_to_json(result.failure),
                   }
          )
        end

        render status: :ok, json: {}
      end

      schema(:destroy) do
        required(:car_id).filled(:integer)
        required(:id).filled(:integer)
      end
      def destroy
        car = Car.find(safe_params[:car_id])
        return render status: :not_found, json: {} unless car

        car.images.find(safe_params[:id])&.purge_later
        render status: :ok, json: {}
      end
    end
  end
end
