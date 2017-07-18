class Api::V1::TrainerProfilesController < ApplicationController
  before_action :restrict_access


  def show
    @trainer_profile = User.find_by(id: params[:id])
  end

  def update
    @trainer_profile = User.find_by(id: params[:id])
    if params[:updateProfile]
      @trainer_profile.trainer_profile.update(name: params[:name], gender: params[:gender], bio: params[:bio])
      if params[:avatar] && params[:avatar] != @trainer_profile.avatars.last.url
        Avatar.create(url: params[:avatar], user_id: @trainer_profile.id)
      end
      render :show
    # elsif params[:addExperience]
    elsif params[:addQualification]
      newqual = Qualification.create(name: params[:name], user_id: @trainer_profile.id)
      render json: { id: newqual.id, name: newqual.name }
    elsif params[:destroyQualification]
      qualification = Qualification.find_by(id: params[:qualification_id])
      qualification.destroy
      render json: { message: "The qualification has been removed"}
    end
  end

end
