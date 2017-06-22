class AvatarsController < ApplicationController
  before_action :authenticate_user!

  def new
  end

  def create
    Avatar.create(
      url: params[:url],
      user_id: current_user.id
    )
    if current_user.trainer_application || current_user.trainer
      redirect_to "/trainer_profiles/#{current_user.id}"
    else
      redirect_to "/user_profiles/#{current_user.id}"
    end
  end
end
