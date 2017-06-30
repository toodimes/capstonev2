class ProgramPrepsController < ApplicationController
  # before_action :validate_trainer
  before_action :validate_user_or_trainer

  def index
    @user = User.find_by(id: params[:user_profile_id])
    @exercises = @user.program_preps.where(status: "stored")
  end

  def new
    @user = User.find_by(id: params[:user_profile_id])
  end

end
