module Admin
  module DashboardHelper
    def admin_navbar_links
      [
        [I18n.t('navbar.links.cars'), admin_dashboard_cars_path],
        [I18n.t('navbar.links.car_inquires'), admin_dashboard_car_inquires_path],
        [I18n.t('navbar.links.configurations'), admin_dashboard_configurations_path]
      ]
    end

    def form_buttons(back_link: '')
      render partial: 'admin/dashboard/common/form_buttons', locals: { back_link: }
    end
  end
end
