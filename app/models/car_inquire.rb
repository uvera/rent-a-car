class CarInquire < ApplicationRecord
  extend FriendlyId

  friendly_id :urlsafe_base64, use: :slugged

  enum :status, pending: "pending", approved: "approved", refused: "refused"

  belongs_to :car

  validates :arrival_flight_at, presence: true
  validates :arrival_flight_number, presence: true
  validates :driver_license_number, presence: true
  validates :passport_number, presence: true
  validates :phone_number, presence: true
  validates :pickup_at, presence: true
  validates :pickup_lat, presence: true
  validates :pickup_long, presence: true
  validates :return_at, presence: true
  validates :return_lat, presence: true
  validates :return_long, presence: true

  validates :phone_number, phone: { allow_blank: false, possible: true }
  validates :telegram_phone_number, phone: { allow_blank: true, possible: true }
  validates :viber_phone_number, phone: { allow_blank: true, possible: true }
  validates :whatsapp_phone_number, phone: { allow_blank: true, possible: true }

  def should_generate_new_friendly_id?
    slug.blank?
  end

  def friendly_id_sanitized
    friendly_id.gsub('_', '\\_')
  end

  private

  def urlsafe_base64
    SecureRandom.urlsafe_base64(28)
  end

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
