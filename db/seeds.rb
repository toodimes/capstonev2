Avatar.all.each do |avatar|
  avatar.update(url: Faker::LoremPixel.image)
end
puts "Done!"
