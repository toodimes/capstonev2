json.array! @users.each do |user|
  json.id  user.id
  if user.user_profile
    json.name user.user_profile.name
  else
    json.name user.trainer_profile.name
  end
  json.trainer user.is_trainer
  json.avatar user.avatars.last.url
end