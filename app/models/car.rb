class Car < ApplicationRecord
  extend FriendlyId
  friendly_id :name, use: :slugged

  include Discard::Model
  include PgSearch::Model
  include Localizer

  include CarBrands
  include CarEngineTypes
  include CarBodyConfigurations
  include CarTransmissionTypes

  GAS_CONSUMPTION_RANGE_VALID = 1..60

  has_many_attached :images
  has_many :car_schedules

  before_validation :convert_gas_consumption_range, on: %i[create update]

  validates :body_configuration, presence: true
  validates :brand, presence: true
  validates :deposit, presence: true, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 1_000_000 }
  validates :engine_type, presence: true
  validates :gas_consumption_range, presence: true
  validates :name, presence: true, format: /\A[A-Za-z0-9\ \-_.,'"]+\z/, length: { maximum: 35 }
  validates :price_in_eur, presence: true,
                           numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 1_000_000 }
  validates :release_date, presence: true
  validates :horsepower, presence: true, numericality: { greater_than: 0, less_than_or_equal_to: 5000 }
  validates :youtube_link, url: { host: /youtube\.com|youtu\.be/ }
  validate :gas_consumption_range_inclusion

  enum :brand, AVAILABLE_CAR_BRANDS_ENUM_HASH
  enum :engine_type, CAR_ENGINE_TYPES_ENUM_HASH
  enum :body_configuration, AVAILABLE_CAR_BODY_CONF_ENUM_HASH
  enum :transmission, AVAILABLE_CAR_TRANSM_TYPES_ENUM_HASH

  pg_search_scope :full_search, against: %i[brand name], using: {
    tsearch: { prefix: true }
  }

  localize_column :description

  def self.ransackable_scopes(_auth_object = nil)
    [:full_search]
  end

  def self.ransackable_attributes(_auth_object = nil)
    %w[brand engine_type body_configuration transmission]
  end

  def self.ransackable_associations(_auth_object = nil)
    []
  end

  def full_name
    "#{I18n.t("cars.brands.#{brand}")} #{name}"
  end

  private

  def convert_gas_consumption_range
    return unless gas_consumption_range.is_a?(Array)

    start_number, end_number = gas_consumption_range.map(&:to_i)

    return unless start_number.is_a?(Integer)
    return unless end_number.is_a?(Integer)

    start_number = end_number if start_number > end_number

    self.gas_consumption_range = start_number..end_number
  end

  def gas_consumption_range_inclusion
    errors.add(:gas_consumption_range, :inclusion) unless GAS_CONSUMPTION_RANGE_VALID.include?(gas_consumption_range)

    return unless gas_consumption_range.begin.negative? || gas_consumption_range.end.negative?

    errors.add(:gas_consumption_range, :greater_than)
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
#  description_en        :string
#  description_rs        :string
#  description_ru        :string
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
