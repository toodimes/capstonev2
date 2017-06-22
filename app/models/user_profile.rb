class UserProfile < ApplicationRecord
  belongs_to :user
  validates :name, :gender, presence: true

  enum gender: { male: 1, female: 2 }


end
