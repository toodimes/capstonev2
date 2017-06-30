class Api::V1::ProgramPrepsController < ApplicationController

  def index
    @user = User.find_by(id: params[:user_profile_id])
    @program_preps = @user.program_preps.where(status: "stored").order(id: :asc)
    render :index
  end

  def new
    @exercises = Exercise.all
    render :new
  end

  def create
    @user = User.find_by(id: params[:user_profile_id])
    program_preps = params[:program_prep_ids]
    existing_program_preps = @user.program_preps.where(status: "stored").order(id: :asc)
    program_preps.each do |program_prep|
      if existing_program_preps.find_by(exercise_id: program_prep) == nil
        ProgramPrep.create(exercise_id: program_prep,
                           quantity: 1,
                           user_id: @user.id,
                          )
      end
    end
    @program_preps = @user.program_preps.where(status: "stored").order(id: :asc)
    render :index
  end

  def update
    @user = User.find_by(id: params[:user_profile_id])
    exercise = ProgramPrep.find_by(id: params[:id])
    if params[:removeExercise]
      exercise.update(status: "removed")
    elsif params[:updateQuantity]
      exercise.update(quantity: params[:quantity])
    end
    @program_preps = @user.program_preps.where(status: "stored").order(id: :asc)
    render :index
  end

  def destroy
    @user = User.find_by(id: params[:user_profile_id])
    program_prep = @user.program_preps.find_by(id: params[:id])
    # if params[:currentUser] == @user.trainer.id
    program_prep.update(status: "removed")
    @program_preps = @user.program_preps.where(status: "stored").order(id: :asc)
    render :index
  end

end
