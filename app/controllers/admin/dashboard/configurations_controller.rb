module Admin
  module Dashboard
    class ConfigurationsController < DashboardController
      def index
        @configuration_keys = Admin::Dashboard::Configuration::AVAILABLE_CONFIGURATIONS
        @configuration_map = Admin::Dashboard::Configuration.all.index_by(&:key)
      end

      def edit
        @configuration ||= Admin::Dashboard::Configuration.find_by(key: params[:key])
      end

      def new
        @configuration = Admin::Dashboard::Configuration.new(key: params[:key])
      end

      def create
        @configuration = Admin::Dashboard::Configuration.new(entity_params)
        if @configuration.save
          redirect_to admin_dashboard_configurations_path, notice: I18n.t('flash.update.success')
        else
          flash[:error] = I18n.t('flash.update.error')
          render 'new'
        end
      end

      def update
        @configuration = Admin::Dashboard::Configuration.find_by(key: entity_params[:key])
        @configuration.assign_attributes(entity_params)
        if @configuration.save
          redirect_to admin_dashboard_configurations_path, notice: I18n.t('flash.update.success')
        else
          flash[:error] = I18n.t('flash.update.error')
          redirect_to edit_admin_dashboard_configuration_path(entity_params[:key])
        end
      end

      private

      def entity_params
        @entity_params ||= params.require(:admin_dashboard_configuration).permit(:key, :value, value: {}, value: [])
      end
    end
  end
end
