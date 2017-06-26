class Exercise < ApplicationRecord
  belongs_to :muscle
  has_many :exercise_images
  has_many :descriptions

  after_create :assign_addons

  def assign_addons
    ExerciseImage.create(exercise_id: self.id)
    Description.create(note: "Description of exercise still needs to be added.", exercise_id: self.id)
  end


end
