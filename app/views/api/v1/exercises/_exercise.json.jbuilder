json.id exercise.id
json.muscle exercise.muscle.name
json.name exercise.name
json.equipment exercise.equipment
json.infoVisible false
if exercise.exercise_images
  json.images exercise.exercise_images.each do |image|
    json.id image.id
    json.url image.url
  end
end
if exercise.descriptions
  json.descriptions exercise.descriptions.each do |description|
    json.id description.id
    json.note description.note
  end
end
json.muscles Muscle.all.each do |muscle|
  json.id muscle.id
  json.name muscle.name
  json.avatar muscle.avatar
end
