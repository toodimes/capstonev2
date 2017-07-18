class RenameExperienceToTrainerProfileAndRemoveQualifications < ActiveRecord::Migration[5.0]
  def change
    rename_column :trainer_profiles, :experience, :bio
    remove_column :trainer_profiles, :qualifications, :text
  end
end
