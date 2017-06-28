class Api::V1::ExercisesController < ApplicationController
  def index
    @exercises = Exercise.all
    render :index
  end

  def show
    @exercise = Exercise.find_by(id: params[:id])
  end

  def edit
    @exercise = Exercise.find_by(id: params[:id])
  end

end
