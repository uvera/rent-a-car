class ChangeConfigurationValueDefault < ActiveRecord::Migration[7.0]
  def change
    change_column_null :configurations, :value, true
    change_column_default :configurations, :value, nil
  end
end
