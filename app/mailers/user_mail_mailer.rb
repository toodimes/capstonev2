class UserMailMailer < ApplicationMailer
  default from: 'notifications@example.com'

  def welcome_email(user)
    @user = user
    @url  = 'http://norxcuses.com/users/sign_in'
    mail(to: @user.email, subject: 'Welcome to NoRxCuses.com')
  end

  def message_email(sender, recipient)
    @sender = sender
    @recipient = recipient
    @url = 'http://norxcuses.com/messages'
    mail(to: @recipient.email, subject: 'You have a new message')
  end
end
