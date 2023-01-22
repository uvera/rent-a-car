require "test_helper"

class CarTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

# == Schema Information
#
# Table name: cars
#
#  id                    :bigint           not null, primary key
#  body_configuration    :string           not null
#  brand                 :string           not null
#  deposit               :decimal(, )      default(0.0), not null
#  discarded_at          :datetime
#  engine_type           :string           not null
#  gas_consumption_range :numrange         not null
#  horsepower            :decimal(, )      default(0.0), not null
#  name                  :string           not null
#  price_in_eur          :decimal(, )      not null
#  release_date          :date             not null
#  slug                  :string
#  transmission          :string           default("manual"), not null
#  youtube_link          :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#
# Indexes
#
#  index_cars_on_discarded_at  (discarded_at)
#  index_cars_on_slug          (slug) UNIQUE
#
