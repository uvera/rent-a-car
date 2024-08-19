# frozen_string_literal: true

module Admin
  module Dashboard
    class CarImagesController < ApplicationController

      schema(:index) do
        required(:car_id).filled(:integer)
      end
      def index
        car = Car.find(safe_params[:car_id])
        images = car.images.map do |attachment|
          { url: url_for(attachment), deletionUrl: admin_dashboard_car_image_path(car_id: car.id, id: attachment.id) }
        end

        render json: { images: }
      end

      schema(:create) do
        required(:car_id).filled(:integer)
        required(:file).filled(:any)
      end
      def create
        car = Car.find(safe_params[:car_id])
        return render status: :not_found, json: {} unless car

        car.images.attach safe_params[:file]
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
