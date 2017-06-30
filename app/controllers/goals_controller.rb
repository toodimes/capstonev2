class GoalsController < ApplicationController
  def index
    @user = User.find_by(id: params[:user_profile_id])
    @goals = @user.goals.order(id: :desc)
  end

  def new
    @user = User.find_by(id: params[:user_profile_id])
  end

  def create
    @user = User.find_by(id: params[:user_profile_id])
    # new_goal = Goal.new(
    #   name: params[:name],
    #   user_id: @user.id
    # )
    # if new_goal.save
    #   flash[:success] = "The gaol has been added"
    #   redirect_to "/user_profiles/#{@user.id}/goals"
    # else
    #   flash[:danger] = "Something went wrong, try again"
    #   render "new.html.erb"
    # end
  end

  def edit
    @user = User.find_by(id: params[:user_profile_id])
    @goal = Goal.find_by(id: params[:id])
  end

  def update
    @user = User.find_by(id: params[:user_profile_id])
    @goal = Goal.find_by(id: params[:id])
    # @goal.update(
    #   name: params[:name],
    #   completed: params[:completed]
    # )
    # redirect_to "/user_profiles/#{@user.id}/goals"
  end

  def destroy
    @user = User.find_by(id: params[:user_profile_id])
    @goal = @user.goals.find_by(id: params[:id])
    # @goal.update(completed: true)
    # redirect_to "/user_profiles/#{@user.id}/goals"
  end
end
