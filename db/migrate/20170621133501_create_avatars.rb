class CreateAvatars < ActiveRecord::Migration[5.0]
  def change
    create_table :avatars do |t|
      t.string :url
      t.integer :user_id

      t.timestamps
    end
  end
end
