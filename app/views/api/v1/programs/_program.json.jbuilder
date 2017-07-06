json.program_id program.id
json.client_id program.user.id
json.client program.user.user_profile.name
# json.trainer_id program.user.trainer.id
json.trainer_name program.user.trainer.trainer_profile.name
json.trainer_id program.user.trainer.id
json.create_date program.created_at.strftime("%b %d, %Y")
json.infoVisible false
json.exercises program.program_preps.each do |program_prep|
  # json.exercise_id program_prep.exercise.id
  json.name program_prep.exercise.name
  json.muscle program_prep.exercise.muscle.name
  json.quantity program_prep.quantity
  json.trainer_note program_prep.note
  json.exerciseInfoVisible false
  json.descriptions program_prep.exercise.descriptions.each do |description|
    json.note description.note
  end
  json.exerciseImagesVisible false
  json.images program_prep.exercise.exercise_images.each do |image|
    json.image image.url
  end
end