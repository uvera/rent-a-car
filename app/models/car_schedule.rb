class CarSchedule < ApplicationRecord
  belongs_to :car, optional: false

  scope :overlaps, lambda { |start_date, end_date|
    where "((start_date < ?) and (end_date > ?))", end_date, start_date
  }

  def overlaps?
    overlaps.exists?
  end

  def overlaps
    siblings.overlaps start_date, end_date
  end

  validate :not_overlap

  def not_overlap
    does_overlap = overlaps?
    errors.add(:start_date, :overlaps) if does_overlap
    errors.add(:end_date, :overlaps) if does_overlap
  end

  def siblings
    self.class.where('id != ?', id || -1).where(car_id:)
  end

  def all_day?
    (start_date - start_date.beginning_of_day).seconds < 30.seconds && (end_date - end_date.end_of_day).seconds < 30.seconds
  end
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
