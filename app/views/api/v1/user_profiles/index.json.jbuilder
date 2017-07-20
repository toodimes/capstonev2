json.array! @user_profiles.each do |user_profile|
  json.partial! 'user_profile.json.jbuilder', user_profile: user_profile
end