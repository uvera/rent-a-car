class AddDiscardedAtToCars < ActiveRecord::Migration[7.0]
  def change
    add_column :cars, :discarded_at, :datetime
    add_index :cars, :discarded_at
  end
end
