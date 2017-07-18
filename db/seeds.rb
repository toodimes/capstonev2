trainers = User.where(is_trainer: true)
trainers.each do |trainer|
  trainer.trainer_profile.update(bio: Faker::StarWars.quote)
  trainer.experiences.each do |experience|
    experience.update(description: Faker::Hipster.paragraph(7))
  end
end
puts "Done!"
