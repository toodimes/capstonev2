class GoalsController < ApplicationController
  before_action :set_gon

  def index
    @user = User.find_by(id: params[:user_profile_id])
    @goals = @user.goals.order(id: :desc)
  end

  def new
    @user = User.find_by(id: params[:user_profile_id])
  end

  def create
    @user = User.find_by(id: params[:user_profile_id])
  end

  def edit
    @user = User.find_by(id: params[:user_profile_id])
    @goal = Goal.find_by(id: params[:id])
  end

  def update
    @user = User.find_by(id: params[:user_profile_id])
    @goal = Goal.find_by(id: params[:id])
  end

  def destroy
    @user = User.find_by(id: params[:user_profile_id])
    @goal = @user.goals.find_by(id: params[:id])
  end
end
