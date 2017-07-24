class Api::V1::UserProfilesController < ApplicationController
  before_action :restrict_access

  def index
    @user_profiles = User.where(trainer_application: false)
  end

  def show
    @user_profile = User.find_by(id: params[:id])
  end

  def update
    @user_profile = User.find_by(id: params[:id])
    if params[:updateProfile]
      @user_profile.user_profile.update(name: params[:name], gender: params[:gender], equipment: params[:equipment])
      if params[:avatar] != @user_profile.avatars.last.url
        Avatar.create(url: params[:avatar], user_id: @user_profile.id)
      end
    end
    render :show
  end
  

end
