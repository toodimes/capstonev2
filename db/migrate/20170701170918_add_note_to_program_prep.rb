class AddNoteToProgramPrep < ActiveRecord::Migration[5.0]
  def change
    add_column :program_preps, :note, :string, default: ""
  end
end
