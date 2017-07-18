json.clientTrainer program_prep.user.trainer.id
json.id program_prep.id
json.muscle program_prep.exercise.muscle.name
json.name program_prep.exercise.name
json.exercise_id program_prep.exercise.id
json.quantity program_prep.quantity
json.status program_prep.status
json.infoVisible false
json.updateVisible false
json.note program_prep.note
json.images program_prep.exercise.exercise_images.each do |image|
  json.image_id image.id
  json.url image.url
end
json.descriptions program_prep.exercise.descriptions.each do |description|
  json.note_id description.id
  json.note description.note
end