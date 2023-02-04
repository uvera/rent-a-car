class AddSlugToCarInquires < ActiveRecord::Migration[7.0]
  def change
    add_column :car_inquires, :slug, :string
    add_index :car_inquires, :slug, unique: true
  end
end
