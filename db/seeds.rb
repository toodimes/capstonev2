# array = [true, false]
# array2 = [1,2]
users = User.where(is_trainer: false)
trainers = User.where(is_trainer: true)
# users.each do |user|
#   user.user_profile.update(name: Faker::StarWars.character, gender: array2.sample, equipment: array.sample)
#   5.times do 
#     Goal.create(name: Faker::HarryPotter.quote, completed: array.sample, user_id: user.id)
#   end
# end
# trainers.each do |trainer|
#   trainer.trainer_profile.update(name: Faker::HarryPotter.character, gender: array2.sample, bio: Faker::StarWars.quote)
#   3.times do 
#     Experience.create(user_id: trainer.id, start_date: "present", end_date: "present", title: Faker::StarWars.droid, description: Faker::Hipster.paragraph, company: Faker::StarWars.specie)
#   end
#   2.times do 
#     Qualification.create(user_id: trainer.id, name: Faker::StarWars.vehicle)
#   end
# end
# users.each do |user|
#   user.update(trainer_id: trainers.sample.id)
# end
# Muscle.destroy
# muscles = ['shoulders', 'biceps', 'triceps', 'abs', 'chest', 'back', 'legs', 'buttocks']
# # muscles.each do |muscle|
# #   Muscle.create(name: muscle.capitalize)
# # end
# shoulders = ['Posterioir Deltoids', 'Transverse Platter', 'Lateral Raises', 'Front Raises', 'Driving', 'Dumbbell Shoulder Press']
# biceps = ['Concentration Curls', 'Hammer Curls', 'Regular Curls']
# triceps = ['Overhead Triceps', 'Tricep Kickbacks', 'Dips']
# abs = ['Leg Pumps', 'Leg Raises', 'Cross Crunches', 'Crunches', 'Russian Twist']
# chest = ['Push Ups', 'Push Up On Knees', 'Dumbbell Flyes', 'Dumbbell Chest Press']
# back = ['One Arm Dumbbell Rows', 'Bent Over Rows', 'Bridging']
# legs = ['Lunges', 'Deadlift', 'Squat With Lateral Raise', 'Regular Squats', 'Side Leg Extension']
# buttocks = ['Glute Pump', 'Back Leg Extensions']
# shoulders.each do |exercise|
#   Exercise.create(name: exercise, muscle_id: 9)
# end
# biceps.each do |exercise|
#   Exercise.create(name: exercise, muscle_id: 10)
# end
# triceps.each do |exercise|
#   Exercise.create(name: exercise, muscle_id: 11)
# end
# abs.each do |exercise|
#   Exercise.create(name: exercise, muscle_id: 12)
# end
# chest.each do |exercise|
#   Exercise.create(name: exercise, muscle_id: 13)
# end
# back.each do |exercise|
#   Exercise.create(name: exercise, muscle_id: 14)
# end
# legs.each do |exercise|
#   Exercise.create(name: exercise, muscle_id: 15)
# end
# buttocks.each do |exercise|
#   Exercise.create(name: exercise, muscle_id: 16)
# end
puts "Done!"
