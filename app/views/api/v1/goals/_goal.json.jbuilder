# json.id user.id
# json.name user.user_profile.name
# json.gender user.user_profile.gender
# json.equipment user.user_profile.equipment
# json.email user.email
# json.goals user.goals.order(id: :desc).each do |goal|
#   json.goal_id goal.id
#   json.name goal.name
#   json.completed goal.completed
# end
json.id goal.id
json.name goal.name
json.completed goal.completed