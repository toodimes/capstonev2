class CreateMessages < ActiveRecord::Migration[5.0]
  def change
    create_table :messages do |t|
      t.integer :user_id
      t.integer :recipient_id
      t.boolean :read, default: false
      t.text :content

      t.timestamps
    end
  end
end
