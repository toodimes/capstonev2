class UserProfilesController < ApplicationController
  before_action :set_gon
  
  def index
    @users = User.where.not(trainer_id: nil).order(id: :asc)
  end

  def show
    @user = User.find_by(id: params[:id])
  end

  def new
    @user = User.find_by(id: current_user.id)
    # @goals = user.goals
  end

  # def create
  #   @user = User.find_by(id: params[:id])
  # end

  def edit
    @user = User.find_by(id: params[:id])
  end

  def update
    @user = UserProfile.find_by(user_id: params[:id])
    @user.update(
      name: params[:name],
      gender: params[:gender],
      equipment: params[:equipment]
    )
    redirect_to "/user_profiles/#{@user.user.id}"
  end

  def destroy
    user = User.find_by(id: params[:id])
  end
end
