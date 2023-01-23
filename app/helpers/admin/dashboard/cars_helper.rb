module Admin
  module Dashboard
    module CarsHelper
      # param [Car] car
      def car_images_upload_input(car)
        react_component 'Common.Forms.ImagesInput', props: {
          previousImages: previous_images_for_car(car),
          objectName: 'car',
          fieldName: 'images',
          uploadUrl: car.new_record? ? nil : admin_dashboard_car_images_path(car.id),
          uploadParam: 'file',
          refreshUrl: car.new_record? ? nil : admin_dashboard_car_images_path(car.id),
          addOnly: car.new_record?
        }
      end

      def admin_dashboard_cars_turbo_pagination_path(**options)
        additional_params = params.permit(
          q: [
            :full_search, { brand_in: [],
                            engine_type_in: [], body_configuration_in: [], transmission_in: [] }
          ]
        )

        admin_dashboard_cars_path(**options, **additional_params, format: :turbo_stream)
      end

      private

      # param [Car] car
      def previous_images_for_car(car)
        car.images.map do |attachment|
          {
            url: url_for(attachment),
            deletionUrl: car.id? ? admin_dashboard_car_image_path(car_id: car.id, id: attachment.id) : nil
          }
        end
      end
    end
  end
end
