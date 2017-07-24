class Api::V1::GoalsController < ApplicationController
  before_action :restrict_access

  def index
    user = User.find_by(id: params[:user_profile_id])
    @goals = user.goals.order(id: :desc)
  end

  def show
    user = User.find_by(id: params[:user_profile_id])
    @goal = user.goals.find_by(id: params[:id])
  end
  
  def create
    user = User.find_by(id: params[:user_profile_id])
    if params[:addGoal]
      @goal = Goal.create(name: params[:name], user_id: user.id, completed: false)
      render :show
    end
  end

  def update
    user = User.find_by(id: params[:user_profile_id])
    @goal = user.goals.find_by(id: params[:id])
    if params[:markComplete] && @goal.completed == false
      @goal.update(completed: true)
    elsif params[:markComplete] && @goal.completed == true
      @goal.update(completed: false)
    elsif params[:updateName]
      @goal.update(name: params[:name])
    end
    render :show
  end

  def destroy
    @user = User.find_by(id: params[:user_profile_id])
    goal = @user.goals.find_by(id: params[:id])
    goal.destroy
    render :index
  end
end
