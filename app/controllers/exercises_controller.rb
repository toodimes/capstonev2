class ExercisesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :validate_admin, except: [:index, :show]

  def index
    @exercises = Exercise.all
  end

  def show
    @exercise = Exercise.find_by(id: params[:id])
  end

  def new
  end

  def create
  end

  def edit
    @exercise = Exercise.find_by(id: params[:id])
  end

  def update
  end

  def destroy
  end
end
