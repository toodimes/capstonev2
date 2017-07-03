class Program < ApplicationRecord
  belongs_to :user
  has_many :program_preps
  has_many :exercises, through: :program_preps
  has_many :notes
end
