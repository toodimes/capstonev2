json.id user_profile.id
json.name user_profile.user_profile.name
json.avatar user_profile.avatars.last.url
json.gender user_profile.user_profile.gender
json.equipment user_profile.user_profile.equipment
json.paid user_profile.user_profile.paid
if user_profile.goals
  json.goals user_profile.goals.order(id: :desc).each do |goal|
    json.id goal.id
    json.name goal.name
    json.completed goal.completed
  end
end
json.trainer_id user_profile.trainer.id
json.trainer_name user_profile.trainer.trainer_profile.name
json.trainer_gender user_profile.trainer.trainer_profile.gender
json.trainer_bio user_profile.trainer.trainer_profile.bio
json.trainer_avatar user_profile.trainer.avatars.last.url