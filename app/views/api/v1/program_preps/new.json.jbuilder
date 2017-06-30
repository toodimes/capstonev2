json.array! @exercises.each do |exercise|
  json.id exercise.id
  json.muscle exercise.muscle.name
  json.name exercise.name
  json.images exercise.exercise_images.each do |image|
    json.image_id image.id
    json.url image.url
  end
  json.descriptions exercise.descriptions.each do |description|
    json.note_id description.id
    json.note description.note
  end
end