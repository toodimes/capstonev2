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
  has_many :experiences
  has_many :qualifications

  belongs_to :trainer, class_name: "User", optional: true
  has_many :users, foreign_key: "trainer_id"

  after_create :create_profile

  def create_profile
    if trainer_application
      TrainerProfile.create(name: "Name", gender: 1, bio: "bio", user_id: self.id)
    else
      UserProfile.create(name: "Name", gender: 1, user_id: self.id)
      self.update(trainer_id: 7)
    end
    Avatar.create(url: "https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg", user_id: self.id)
  end

end
