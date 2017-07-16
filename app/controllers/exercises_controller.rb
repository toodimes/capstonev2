class ExercisesController < ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :validate_admin, except: [:index, :show]
  before_action :set_gon

  def index
    @exercises = Exercise.all
  end

  def show
    @exercise = Exercise.find_by(id: params[:id])
  end

  def new
    @muscles = Muscle.all
    @exercise = Exercise.new(name: "Exercise Name", equipment: false, muscle_id: 1)
    render "new.html.erb"
  end

  def create
    if params[:equipment]
      equipment = true
    else
      equipment = false
    end
    @exercise = Exercise.new(name: params[:name], equipment: equipment, muscle_id: params[:muscle_id])
    if @exercise.save
      render "show.html.erb"
    else
      @muscles = Muscle.all
      flash[:danger] = "Something went wrong, please try again."
      render "new.html.erb"
    end
  end

  def edit
    gon.api = ENV['API_KEY']
    @exercise = Exercise.find_by(id: params[:id])
  end

  def update
  end

  def destroy
  end
end
