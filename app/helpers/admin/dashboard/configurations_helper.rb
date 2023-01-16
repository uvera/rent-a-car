module Admin
  module Dashboard
    module ConfigurationsHelper
      def configuration_view_template(configuration)
        "admin/dashboard/configurations/key_templates/#{configuration.view_template}"
      end
    end
  end
end
