class CreateConfigurations < ActiveRecord::Migration[7.0]
  def change
    create_table :configurations do |t|
      t.string :key, null: false, index: { unique: true }
      t.jsonb :value, null: false, default: {}

      t.timestamps
    end
  end
end
