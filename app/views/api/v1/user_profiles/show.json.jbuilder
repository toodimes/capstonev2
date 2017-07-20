# json.partial! @user_profile, partial: "user_profile", as: :user_profile
json.partial! 'user_profile.json.jbuilder', user_profile: @user_profile
# json.user_profiles @user_profiles.each do |user|
  # json.partial! user, as: :user_profile
# end