class CreateExerciseImages < ActiveRecord::Migration[5.0]
  def change
    create_table :exercise_images do |t|
      t.string :url, default: "https://media.giphy.com/media/1w3MyWVVj2giA/giphy.gif"
      t.integer :exercise_id

      t.timestamps
    end
  end
end
