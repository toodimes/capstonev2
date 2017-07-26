class Api::V1::MessagesController < ApplicationController
  before_action :restrict_access

  def index
    user = User.find_by(id: params[:current_user_id])
    @messages = Message.where(recipient_id: params[:current_user_id]).or(Message.where(user_id: params[:current_user_id])).order(id: :asc)
    render :index
  end

  def show
    user = User.find_by(id: params[:current_user_id])
    @messages = Message.where(recipient_id: user.id, user_id: params[:id]).or(Message.where(user_id: user.id, recipient_id: params[:id])).order(id: :asc)
    render :index
  end

  def new
    @users = User.all.order(id: :asc)
    render :new
  end

  def create
    # user = User.find_by(id: params[:user_profile_id])
    user = User.find_by(id: params[:sender_id])
    recipient = User.find_by(id: params[:recipient_id])
    @message = Message.create(user_id: params[:sender_id], recipient_id: params[:recipient_id], content: params[:content])
    # UserMailMailer.message_email(user, recipient).deliver
    #DO THE MESSAGE FOR THE VUE TO PUSH INTO THE END OF THE ARRAY
    render :show
  end

  def destroy
    message = Message.find_by(id: params[:id])
    message.destroy
    render json: { message: "The message has been successfully deleted" }
  end

end
