json.id exercise.id
json.muscle exercise.muscle.name
json.name exercise.name
json.images exercise.exercise_images.each do |image|
  json.url image.url
end
json.descriptions exercise.descriptions.each do |description|
  json.note description.note
end
