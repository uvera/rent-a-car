module Admin
  module Dashboard
    class CarInquiresController < DashboardController
      def index

        @scope = CarInquire.friendly.order(:id)

        @pagy, @inquires = pagy_countless(@scope, items: 5)
        respond_to do |format|
          format.html
          format.turbo_stream
        end

      end

      def refuse
        @inquire = CarInquire.friendly.find(params[:id])
        @inquire.update!(status: 'refused')
        turbo_reload_single_inquire
      end

      def approve
        @inquire = CarInquire.friendly.find(params[:id])
        @inquire.update!(status: 'approved')
        turbo_reload_single_inquire
      end

      private

      def turbo_reload_single_inquire
        respond_to do |format|
          format.turbo_stream do
            render 'reload_single_inquire'
          end
        end
      end
    end
  end
end
