# # users = User.all
# # User.all.each do |user|
# #   3.times do 
# #     Message.create(user_id: user.id, recipient_id: users.sample.id, content: Faker::StarWars.quote)
# #   end
# # end
# avatars = Avatar.all
# avatars.each do |avatar|
#   avatar.update(url: "http://lorempixel.com/#{Faker::Number.between(400,500)}/#{Faker::Number.between(400,500)}/people")
# end
puts "Done!"
