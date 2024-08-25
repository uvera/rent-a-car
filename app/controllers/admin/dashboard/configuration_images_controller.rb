# frozen_string_literal: true

module Admin
  module Dashboard
    class ConfigurationImagesController < ApplicationController
      def index
        configuration = ::Configuration.find_by!(id: params[:configuration_id])
        images =
          configuration.image_files.map do |attachment|
            {
              url: url_for(attachment),
              deletionUrl:
                admin_dashboard_configuration_image_path(
                  configuration_id: configuration.id,
                  id: attachment.id,
                ),
            }
          end

        render json: { images: }
      end

      def create
        configuration = ::Configuration.find_by(id: params[:configuration_id])
        return render status: :not_found, json: {} unless configuration

        configuration.files.attach params[:file]
      end

      def destroy
        configuration = ::Configuration.find_by(id: params[:configuration_id])
        return render status: :not_found, json: {} unless configuration

        configuration.files.find(params[:id])&.purge_later
        render status: :ok, json: {}
      end
    end
  end
end
