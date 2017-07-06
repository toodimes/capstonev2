class Api::V1::ExercisesController < ApplicationController
  # before_action :validate_admin!, only: [:update]
  def index
    @exercises = Exercise.all
    render :index
  end

  def show
    @exercise = Exercise.find_by(id: params[:id])
  end

  def update
    @exercise = Exercise.find_by(id: params[:id])
    if params[:createNote]
      Description.create(note: params[:note], exercise_id: @exercise.id)
    elsif params[:createImage]
      ExerciseImage.create(url: params[:url], exercise_id: @exercise.id)
    elsif params[:deleteNote]
      note = Description.find_by(id: params[:noteID])
      note.destroy
    elsif params[:deleteGif]
      gif = ExerciseImage.find_by(id: params[:gifID])
      gif.destroy
    end
    render :show
  end

end
