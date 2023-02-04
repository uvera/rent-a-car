require "test_helper"

class CarInquireTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

# == Schema Information
#
# Table name: car_inquires
#
#  id                    :bigint           not null, primary key
#  arrival_flight_at     :datetime         not null
#  arrival_flight_number :string           not null
#  driver_license_number :string           not null
#  passport_number       :string           not null
#  phone_number          :string           not null
#  pickup_at             :datetime         not null
#  pickup_lat            :decimal(16, 10)  not null
#  pickup_long           :decimal(16, 10)  not null
#  return_at             :datetime         not null
#  return_lat            :decimal(16, 10)  not null
#  return_long           :decimal(16, 10)  not null
#  slug                  :string
#  status                :string           default("pending"), not null
#  telegram_phone_number :string
#  viber_phone_number    :string
#  whatsapp_phone_number :string
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  car_id                :bigint           not null
#
# Indexes
#
#  index_car_inquires_on_car_id  (car_id)
#  index_car_inquires_on_slug    (slug) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (car_id => cars.id)
#
