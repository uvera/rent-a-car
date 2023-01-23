class Configuration < ApplicationRecord
  serialize :value, ::JsonbSerializers
  has_many_attached :files

  validates :key, uniqueness: true
  validates :value, presence: { allow_blank: true }

  AVAILABLE_CONFIGURATION_VIEWS = {
    'main_banner' => 'multi_locale_tiptap',
    'site_name' => 'multi_locale_text',
    'terms_and_conditions' => 'multi_locale_tiptap',
    'contact_page' => 'multi_locale_tiptap'
  }.freeze

  AVAILABLE_CONFIGURATIONS = %w[toast_timeout] + AVAILABLE_CONFIGURATION_VIEWS.keys.freeze

  AVAILABLE_CONFIGURATIONS.each do |configuration|
    define_singleton_method("value_#{configuration}") do
      value_for(configuration, nil)
    end
  end

  def self.value_for(key, default = nil)
    find_by(key:)&.value || default
  end

  def self.localized_value_for(key, default = nil)
    value = value_for(key, nil)
    value.try(:[], I18n.locale) || default
  end

  def view_template
    AVAILABLE_CONFIGURATION_VIEWS[key] || 'default_form'
  end

  def image_files
    files.filter do |file|
      !(file.content_type =~ /image/).nil?
    end
  end
end

# == Schema Information
#
# Table name: configurations
#
#  id         :bigint           not null, primary key
#  key        :string           not null
#  value      :jsonb
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_configurations_on_key  (key) UNIQUE
#
