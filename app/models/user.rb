class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :omniauthable, :omniauth_providers => [:facebook]

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
  def self.from_omniauth(auth)
    where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
      user.email = auth.info.email
      user.password = Devise.friendly_token[0,20]
      # user.user_profile.name = auth.info.name   # assuming the user model has a name
      # user.image = auth.info.image # assuming the user model has an image
      # If you are using confirmable and the provider(s) you use validate emails, 
      # uncomment the line below to skip the confirmation emails.
      # user.skip_confirmation!
    end
  end

  # def self.new_with_session(params, session)
  #   super.tap do |user|
  #     if data = session["devise.facebook_data"] && session["devise.facebook_data"]["extra"]["raw_info"]
  #       user.email = data["email"] if user.email.blank?
  #     end
  #   end
  # end

  def create_profile
    if trainer_application
      TrainerProfile.create(name: "Name", gender: 1, bio: "bio", user_id: self.id)
    else
      UserProfile.create(name: "Name", gender: 1, user_id: self.id)
      self.update(trainer_id: 33)
    end
    Avatar.create(url: "https://thesocietypages.org/socimages/files/2009/05/vimeo.jpg", user_id: self.id)
  end

end
