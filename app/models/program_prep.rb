class ProgramPrep < ApplicationRecord
  belongs_to :user
  belongs_to :exercise
  belongs_to :program, optional: true
end
