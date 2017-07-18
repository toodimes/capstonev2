class CreateExperiences < ActiveRecord::Migration[5.0]
  def change
    create_table :experiences do |t|
      t.datetime :start_date
      t.datetime :end_date
      t.string :title
      t.text :description
      t.string :company

      t.timestamps
    end
  end
end
