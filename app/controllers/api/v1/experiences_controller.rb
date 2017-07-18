class Api::V1::ExperiencesController < ApplicationController

  def index
    user = User.find_by(id: params[:trainer_profile_id])
    @experiences = user.experiences.order(id: :asc)
  end

  def show
    user = User.find_by(id: params[:trainer_profile_id])
    @experience = user.experiences.find_by(id: params[:id])
  end

  def update
    user = User.find_by(id: params[:trainer_profile_id])
    @experience = user.experiences.find_by(id: params[:id])
    @experience.update(title: params[:title], description: params[:description], company: params[:company], start_date: params[:start_date], end_date: params[:end_date])
    render :show
  end

  def create
    user = User.find_by(id: params[:trainer_profile_id])
    @experience = Experience.new(title: params[:title], description: params[:description], company: params[:company], start_date: params[:start_date], end_date: params[:end_date], user_id: user.id)
    if @experience.save
      render :show
    else
      render json: { message: "Something went wrong, please try again" }
    end
  end

  def destroy
    user = User.find_by(id: params[:trainer_profile_id])
    experience = user.experiences.find_by(id: params[:id])
    experience.destroy
    render json: { message: "The Experience has been removed from your profile" }
  end
end
