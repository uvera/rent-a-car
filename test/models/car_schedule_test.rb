require "test_helper"

class CarScheduleTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end

# == Schema Information
#
# Table name: car_schedules
#
#  id         :bigint           not null, primary key
#  comment    :string
#  end_date   :datetime         not null
#  start_date :datetime         not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  car_id     :bigint           not null
#
# Indexes
#
#  index_car_schedules_on_car_id  (car_id)
#
# Foreign Keys
#
#  fk_rails_...  (car_id => cars.id)
#
