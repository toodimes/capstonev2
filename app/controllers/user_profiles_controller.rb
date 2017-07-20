class UserProfilesController < ApplicationController
  before_action :authenticate_user!
  before_action :set_gon
  
  def index
    @users = User.where.not(trainer_id: nil).order(id: :asc)
  end

  def show
    @user = User.find_by(id: params[:id])
  end

  def new
    @user = User.find_by(id: current_user.id)
  end

  def edit
    @user = User.find_by(id: params[:id])
    if current_user && current_user.id == @user.id || current_user.id == @user.trainer_id || current_user.admin
      render "edit.html.erb"
    else
      flash[:danger] = "You are not authorized to edit this user."
      redirect_to "/"
    end
  end

  def update
    @user = UserProfile.find_by(user_id: params[:id])
    if current_user && current_user.id == @user.id
      @user.update(
        name: params[:name],
        gender: params[:gender],
        equipment: params[:equipment]
      )
      redirect_to "/user_profiles/#{@user.user.id}"
    else
      flash[:danger] = "You are not authorized to edit this user."
      redirect_to "/"
    end
  end

  def destroy
    user = User.find_by(id: params[:id])
    if current_user && current_user.id == user.id
      user.destroy
    else
      flash[:danger] = "You are not authorized to remove this user."
      redirect_to "/"
    end
  end
end
