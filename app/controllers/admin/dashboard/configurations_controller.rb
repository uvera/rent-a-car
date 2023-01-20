module Admin
  module Dashboard
    class ConfigurationsController < DashboardController
      def index
        @configuration_keys = ::Configuration::AVAILABLE_CONFIGURATIONS
        @configuration_map = ::Configuration.all.index_by(&:key)
      end

      def edit
        @configuration = ::Configuration.find_by(id: params[:id])
      end

      def new
        @configuration = ::Configuration.new(key: params[:key])
      end

      def create
        @configuration = ::Configuration.new(entity_params)
        if @configuration.save
          redirect_to admin_dashboard_configurations_path, notice: I18n.t('flash.update.success')
        else
          flash[:error] = I18n.t('flash.update.error')
          render 'new'
        end
      end

      def update
        @configuration = ::Configuration.find_by(key: entity_params[:key])
        @configuration.assign_attributes(entity_params)
        if @configuration.save
          redirect_to admin_dashboard_configurations_path, notice: I18n.t('flash.update.success')
        else
          flash[:error] = I18n.t('flash.update.error')
          render 'edit'
        end
      end

      private

      def entity_params
        @entity_params ||= params.require(:configuration).permit(:key, :value, value: [], files: [])
      end
    end
  end
end
