class Api::V1::ExercisesController < ApplicationController
  before_action :restrict_access

  def index
    @exercises = Exercise.all
    render :index
  end

  def show
    @exercise = Exercise.find_by(id: params[:id])
  end

  def create
    @exercise = Exercise.new(name: params[:name], muscle_id: params[:muscle_id], equipment: params[:equipment])
    if @exercise.save
      render :show
    else
      render json: {message: "Something went wrong, please try again"}
    end
  end

  def update
    @exercise = Exercise.find_by(id: params[:id])
    if params[:createNote]
      new_note = Description.create(note: params[:note], exercise_id: @exercise.id)
      render json: { id: new_note.id, note: new_note.note }
    elsif params[:createImage]
      new_image = ExerciseImage.create(url: params[:url], exercise_id: @exercise.id)
      render json: { id: new_image.id, url: new_image.url }
    elsif params[:updateInfo]
      @exercise.update(name: params[:name], muscle_id: params[:muscle_id], equipment: params[:equipment])
      render :show
    elsif params[:deleteNote]
      note = Description.find_by(id: params[:noteID])
      # binding.pry
      note.destroy
      render json: { message: "The Note has been deleted" }
    elsif params[:deleteGif]
      gif = ExerciseImage.find_by(id: params[:gifID])
      gif.destroy
      render json: { message: "The Image has been removed" }
    end
  end

end
