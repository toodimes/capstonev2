class ChangeAttributeOfExperience < ActiveRecord::Migration[5.0]
  def change
    change_column :experiences, :start_date, :string
    change_column :experiences, :end_date, :string
  end
end
