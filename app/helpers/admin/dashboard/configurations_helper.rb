module Admin
  module Dashboard
    module ConfigurationsHelper
      def configuration_view_template(configuration)
        "admin/dashboard/configurations/key_templates/#{configuration.view_template}"
      end

      def configuration_images_upload_input(configuration)
        react_component 'Common.Forms.ImagesInput', props: {
          previousImages: previous_images_for_configuration(configuration),
          objectName: 'configuration',
          fieldName: 'files',
          uploadUrl: configuration.new_record? ? nil : admin_dashboard_configuration_images_path(configuration.id),
          uploadParam: 'file',
          refreshUrl: configuration.new_record? ? nil : admin_dashboard_configuration_images_path(configuration.id),
          addOnly: configuration.new_record?
        }
      end

      def previous_images_for_configuration(configuration)
        configuration.image_files.map do |attachment|
          {
            url: url_for(attachment),
            deletionUrl: if configuration.id?
                           admin_dashboard_configuration_image_path(
                             configuration_id: configuration.id, id: attachment.id
                           )
                         end
          }
        end
      end
    end
  end
end
