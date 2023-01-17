class Configuration < ApplicationRecord
  serialize :value, ::JsonbSerializers

  validates_uniqueness_of :key
  validates_presence_of :value, allow_blank: true

  AVAILABLE_CONFIGURATION_VIEWS = {
    'car_brands' => 'default_form'
  }.freeze

  AVAILABLE_CONFIGURATIONS = AVAILABLE_CONFIGURATION_VIEWS.keys.freeze

  def self.value_for(key, default = nil)
    find_by(key:)&.value || default
  end

  def view_template
    AVAILABLE_CONFIGURATION_VIEWS[key] || 'default_form'
  end
end

# == Schema Information
#
# Table name: configurations
#
#  id         :bigint           not null, primary key
#  key        :string           not null
#  value      :jsonb            not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_configurations_on_key  (key) UNIQUE
#
