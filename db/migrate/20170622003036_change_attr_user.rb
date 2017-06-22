class ChangeAttrUser < ActiveRecord::Migration[5.0]
  def change
    rename_column :users, :trainer, :is_trainer
  end
end
