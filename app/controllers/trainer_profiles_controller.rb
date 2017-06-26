class TrainerProfilesController < ApplicationController
  def index
    @trainers = User.where(trainer_id: nil).order(id: :asc)
  end

  def show
    @trainer = User.find_by(id: params[:id])
    @clients = @trainer.users
  end

  def new
    @trainer = User.find_by(id: current_user.id)
    if current_user && current_user.trainer_profile.name == "Name"
      render "new.html.erb"
    else
      flash[:danger] = "You already have a profile. You are being re-routed to edit your profile."
      redirect_to "/trainer_profiles/#{@trainer.id}/edit"
    end
  end

  # def create
  # end

  def edit
    @trainer = User.find_by(id: params[:id])
  end

  def update
    @trainer = TrainerProfile.find_by(user_id: params[:id])
    @trainer.update(
      name: params[:name],
      gender: params[:gender],
      experience: params[:experience],
      qualifications: params[:qualifications]
    )
    redirect_to "/trainer_profiles/#{@trainer.user.id}"
  end

  def destroy
  end
end
