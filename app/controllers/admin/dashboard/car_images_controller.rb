# frozen_string_literal: true

module Admin
  module Dashboard
    class CarImagesController < ApplicationController
      def index
        car = Car.find_by(id: params[:car_id])
        images = car.images.map do |attachment|
          { url: url_for(attachment), deletionUrl: admin_dashboard_car_image_path(car_id: car.id, id: attachment.id) }
        end

        render json: { images: }
      end

      def create
        car = Car.find_by(id: params[:car_id])
        return render status: :not_found, json: {} unless car

        car.images.attach params[:file]
      end

      def destroy
        car = Car.find_by(id: params[:car_id])
        return render status: :not_found, json: {} unless car

        car.images.find(params[:id])&.purge_later
        render status: :ok, json: {}
      end
    end
  end
end
