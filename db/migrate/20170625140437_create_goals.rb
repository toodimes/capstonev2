class CreateGoals < ActiveRecord::Migration[5.0]
  def change
    create_table :goals do |t|
      t.string :name
      t.integer :user_id
      t.boolean :completed, default: false

      t.timestamps
    end
  end
end
