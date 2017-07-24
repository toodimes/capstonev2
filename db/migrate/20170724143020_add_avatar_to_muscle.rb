class AddAvatarToMuscle < ActiveRecord::Migration[5.0]
  def change
    add_column :muscles, :avatar, :string
  end
end
