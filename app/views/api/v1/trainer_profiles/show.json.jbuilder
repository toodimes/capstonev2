json.id @trainer_profile.id
json.name @trainer_profile.trainer_profile.name
json.gender @trainer_profile.trainer_profile.gender
json.avatar @trainer_profile.avatars.last.url
json.bio  @trainer_profile.trainer_profile.bio
if @trainer_profile.experiences
  json.experiences @trainer_profile.experiences.each do |experience|
    json.id experience.id
    json.start_date experience.start_date
    json.end_date experience.end_date
    json.title experience.title
    json.description experience.description
    json.company experience.company
  end
end
if @trainer_profile.qualifications
  json.qualifications @trainer_profile.qualifications.each do |qualification|
    json.id qualification.id
    json.name qualification.name
  end
end
if @trainer_profile.users
  json.clients @trainer_profile.users.each do |client|
    json.id client.id
    json.client client.user_profile.name
    json.avatar client.avatars.last.url
  end
end