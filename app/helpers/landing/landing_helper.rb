module Landing
  module LandingHelper
    def landing_navbar_links
      [
        [I18n.t('navbar.links.cars'), cars_path],
        [I18n.t('navbar.links.terms'), terms_path],
        [I18n.t('navbar.links.contacts'), contacts_path]
      ]
    end
  end
end
