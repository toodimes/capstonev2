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
    if current_user && current_user.is_trainer || current_user && current_user.trainer_application
      gon.currentUser = current_user.trainer_profile.name
      gon.currentUserID = current_user.id
      gon.currentUserAvatar = current_user.avatars.last.url      
    elsif current_user
      gon.currentUser = current_user.user_profile.name
      gon.currentUserID = current_user.id
      gon.currentUserAvatar = current_user.avatars.last.url
    end
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

  def after_sign_in_path_for(resource)
    if request.env['omniauth.origin']
      if resource.trainer_application == true
        "/trainer_profiles/#{resource.id}/edit"
      else
        "/user_profiles/#{resource.id}/edit"
      end
    else
      root_path
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
