module Admin::DashboardHelper
  def navbar_links
    [
      [I18n.t('navbar.links.cars'), admin_dashboard_cars_path],
      [I18n.t('navbar.links.configurations'), admin_dashboard_configurations_path]
    ]
  end
end
