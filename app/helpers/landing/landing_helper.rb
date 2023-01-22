module Landing
  module LandingHelper
    def landing_navbar_links
      [
        [I18n.t('navbar.links.cars'), landing_cars_path]
      ]
    end
  end
end
