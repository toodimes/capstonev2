class Api::V1::ProgramsController < ApplicationController
  before_action :restrict_access
  
  def index
    @programs = Program.where(user_id: params[:user_profile_id]).order(id: :desc)
    render :index
  end

  def show
    @program = Program.find_by(user_id: params[:user_profile_id], id: params[:id])
    render :show
  end

  def create
    if params[:createProgram]
      @program = Program.new(user_id: params[:user_profile_id])
      exercises = ProgramPrep.where(user_id: params[:user_profile_id], status: "stored")
      if @program.save
        exercises.update(status: "sent", program_id: @program.id)
        render :show
      end
    end
  end

  def update
  end

  def destroy
  end

end
