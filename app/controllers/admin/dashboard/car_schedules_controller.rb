module Admin
  module Dashboard
    class CarSchedulesController < DashboardController
      def index
        @car = Car.friendly.find(params[:car_id])
      end

      def create
        return render status: :not_found unless car

        schedule = new_schedule_from_params

        if schedule.save
          render status: :created, json: { id: schedule.id,
                                           update_path: admin_dashboard_car_schedule_path(id: schedule.id) }
        else
          render status: :unprocessable_entity, json: { error: schedule.errors.first.full_message || I18n.t('cars.schedules.creation_error') }
        end
      end

      def update
        schedule = CarSchedule.find(schedule_params[:id])
        schedule.assign_attributes(schedule_params.slice(:comment, :start_date, :end_date))

        if schedule.save
          render status: :ok, json: schedule.slice(:id, :start_date, :end_date, :comment)
        else
          render status: :unprocessable_entity, json: { error: schedule.errors.first.full_message || I18n.t('cars.schedules.creation_error') }
        end

      end

      private

      def new_schedule_from_params
        CarSchedule.new(car:,
                        start_date: schedule_params[:start_date],
                        end_date: schedule_params[:end_date],
                        comment: schedule_params[:comment])
      end

      def car
        @car ||= Car.friendly.find(schedule_params[:car_id])
      end

      def schedule_params
        params.permit(:id, :car_id, :start_date, :end_date, :comment)
      end
    end
  end
end
