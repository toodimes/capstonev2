class Api::V1::GoalsController < ApplicationController
  # before_action :validate_user_or_trainer! only: [:create, :update, :destroy]

  def index
    @user = User.find_by(id: params[:user_profile_id])
    @goals = @user.goals.order(id: :desc)
    render :index
  end
  
  def create
    @user = User.find_by(id: params[:user_profile_id])
    # if current_user && current_user.id == @user.id || current_user && current_user.id == @user.trainer.id
    if params[:addGoal]
      Goal.create(name: params[:name], user_id: @user.id, completed: false)
      render :index
    end
    # else
    #   render json: { errors: "You are not authorized to make changes to this account." }, status: 403
    # end
  end

  def update
    @user = User.find_by(id: params[:user_profile_id])
    goal = @user.goals.find_by(id: params[:id])
    # if current_user && current_user.id == @user.id || current_user && current_user.id == @user.trainer.id
    if params[:markComplete]
      goal.update(completed: true)
    elsif params[:markIncomplete]
      goal.update(completed: false)
    elsif params[:updateName]
      goal.update(name: params[:name])
    end
    render :index
    # else
    #   render json: { errors: "ErroR!" }, status: 403
    # end
  end

  def destroy
    @user = User.find_by(id: params[:user_profile_id])
    goal = @user.goals.find_by(id: params[:id])
    goal.destroy
    render :index
  end
end
