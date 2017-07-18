class MessagesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_gon

  def index
    user = User.find_by(id: params[:current_user_id])
    @messages = Message.where(recipient_id: current_user.id)
  end 

  def show
    @sender = User.find_by(id: params[:id])
    # @messages = Message.where(recipient_id: current_user.id, user_id: params[:id])
  end

  def new
    
  end

end
