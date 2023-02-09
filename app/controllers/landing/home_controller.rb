# frozen_string_literal: true

module Landing
  class HomeController < LandingController
    def index
      @cars = Car.kept.friendly.order(Arel.sql('RANDOM()')).take(6)
    end
  end
end
