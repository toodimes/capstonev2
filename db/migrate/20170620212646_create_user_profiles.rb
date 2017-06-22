class CreateUserProfiles < ActiveRecord::Migration[5.0]
  def change
    create_table :user_profiles do |t|
      t.string :name
      t.integer :gender
      t.boolean :equipment, default: false
      t.boolean :paid, default: false
      t.integer :user_id

      t.timestamps
    end
  end
end
