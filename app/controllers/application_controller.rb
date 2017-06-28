class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def validate_trainer
    unless current_user && current_user.is_trainer
      redirect_to "/"
    end
  end

  def validate_admin
    unless current_user && current_user.validate_admin
      redirect_to "/"
    end
  end

end
