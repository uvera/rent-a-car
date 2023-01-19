require "test_helper"

class ConfigurationTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
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
