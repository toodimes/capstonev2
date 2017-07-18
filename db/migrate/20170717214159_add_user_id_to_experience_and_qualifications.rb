class AddUserIdToExperienceAndQualifications < ActiveRecord::Migration[5.0]
  def change
    add_column :experiences, :user_id, :integer 
    add_column :qualifications, :user_id, :integer 
  end
end
