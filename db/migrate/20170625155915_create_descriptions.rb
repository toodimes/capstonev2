class CreateDescriptions < ActiveRecord::Migration[5.0]
  def change
    create_table :descriptions do |t|
      t.string :note
      t.integer :exercise_id

      t.timestamps
    end
  end
end
