class CreateCars < ActiveRecord::Migration[7.0]
  def change
    create_table :cars do |t|
      t.string :brand, null: false
      t.string :name, null: false
      t.date :release_date, null: false
      t.string :engine_type, null: false
      t.decimal :deposit, null: false, default: 0
      t.numrange :gas_consumption_range, null: false
      t.string :body_configuration, null: false
      t.decimal :price_in_eur, null: false

      t.timestamps
    end
  end
end
