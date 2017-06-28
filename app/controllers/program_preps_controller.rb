class ProgramPrepsController < ApplicationController
  before_action :validate_trainer

  def index
    @client = User.find_by(id: params[:user_id])
  end

  def show

  end

  def new
  end

  def edit
  end

  def update
  end

  def create
  end

  def destroy
  end

end
