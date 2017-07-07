class ApplicationController < ActionController::Base
  protect_from_forgery with: :null_session

  def restrict_access
    authenticate_or_request_with_http_token do |api_key, options|
      ENV["API_KEY"] == api_key
      # User.find_by(api_key: api_key, email: request.headers['X-User-Email'])
      # true
    end
  end

  def set_gon
    gon.api = ENV['API_KEY']
  end

  def validate_trainer
    unless current_user && current_user.is_trainer
      redirect_to "/"
    end
  end

  def validate_admin
    unless current_user && current_user.admin
      redirect_to "/"
    end
  end

  # def validate_user_or_trainer
  #   client = User.find_by(id: params[:user_profile_id])
  #   unless current_user && current_user.id == client.id || current_user && current_user.id == client.trainer.id || current_user && current_user.admin
  #     flash[:danger] = "You are not an authorized trainer for this account."
  #     redirect_to "/"
  #   end
  # end

end
