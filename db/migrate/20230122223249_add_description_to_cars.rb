class AddDescriptionToCars < ActiveRecord::Migration[7.0]
  def change
    add_column :cars, :description_en, :string
    add_column :cars, :description_ru, :string
    add_column :cars, :description_rs, :string
  end
end
