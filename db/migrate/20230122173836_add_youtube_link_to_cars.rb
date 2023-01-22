class AddYoutubeLinkToCars < ActiveRecord::Migration[7.0]
  def change
    add_column :cars, :youtube_link, :string
  end
end
