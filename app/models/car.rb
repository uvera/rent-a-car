class Car < ApplicationRecord
  include PgSearch::Model

  include CarBrands
  include CarEngineTypes
  include CarBodyConfigurations

  has_many_attached :images

  before_save :convert_gas_consumption_range

  validates :body_configuration, presence: true
  validates :brand, presence: true
  validates :deposit, presence: true
  validates :engine_type, presence: true
  validates :gas_consumption_range, presence: true
  validates :name, presence: true
  validates :price_in_eur, presence: true
  validates :release_date, presence: true

  enum :brand, AVAILABLE_CAR_BRANDS_ENUM_HASH
  enum :engine_type, CAR_ENGINE_TYPES_ENUM_HASH
  enum :body_configuration, AVAILABLE_CAR_BODY_CONF_ENUM_HASH

  pg_search_scope :full_search, against: [:brand, :name], using: {
    dmetaphone: {},
    trigram: {},
    tsearch: { prefix: true }
  }

  private

  def convert_gas_consumption_range
    return unless gas_consumption_range.is_a?(Array)

    start_number, end_number = gas_consumption_range.map(&:to_i)

    return unless start_number.is_a?(Integer)
    return unless end_number.is_a?(Integer)

    self.gas_consumption_range = start_number..end_number
  end

end

# == Schema Information
#
# Table name: cars
#
#  id                    :bigint           not null, primary key
#  body_configuration    :string           not null
#  brand                 :string           not null
#  deposit               :decimal(, )      default(0.0), not null
#  engine_type           :string           not null
#  gas_consumption_range :numrange         not null
#  name                  :string           not null
#  price_in_eur          :decimal(, )      not null
#  release_date          :date             not null
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#
