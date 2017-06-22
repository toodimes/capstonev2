class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_one :trainer_profile
  has_one :user_profile
  has_many :avatars
  has_many :program_preps
  has_many :programs
  has_many :goals

  belongs_to :trainer, class_name: "User", optional: true

  after_create :create_profile

  def create_profile
    if trainer_application
      TrainerProfile.create(name: "Name", gender: 1, experience: "Experience", qualifications: "Qualifications", user_id: self.id)
    else
      UserProfile.create(name: "Name", gender: 1, user_id: self.id)
      self.update(trainer_id: 7)
    end
    Avatar.create(url: "default_avatar.png", user_id: self.id)
  end

end
