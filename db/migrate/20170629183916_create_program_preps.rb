class CreateProgramPreps < ActiveRecord::Migration[5.0]
  def change
    create_table :program_preps do |t|
      t.integer :user_id
      t.integer :quantity
      t.integer :exercise_id
      t.string :status, default: "stored"
      t.integer :program_id

      t.timestamps
    end
  end
end
