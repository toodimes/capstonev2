json.id message.id
json.expand false
json.sender_id message.user_id
json.sender_avatar message.user.avatars.last.url
json.recipient_avatar message.recipient.avatars.last.url
if message.user.trainer_profile
  json.sender_name message.user.trainer_profile.name
else
  json.sender_name message.user.user_profile.name
end
json.recipient_id message.recipient_id
if message.recipient.trainer_profile
  json.recipient_name message.recipient.trainer_profile.name
else
  json.recipient_name message.recipient.user_profile.name
end 
json.content message.content
json.sent_at message.created_at
json.read message.read