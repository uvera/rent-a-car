class AddMoreFieldsToCars < ActiveRecord::Migration[7.0]
  def change
    add_column :cars, :transmission, :string, default: 'manual', null: false
    add_column :cars, :horsepower, :decimal, default: 0, null: false
  end
end
