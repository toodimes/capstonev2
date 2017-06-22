Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'users/registrations', sessions: 'users/sessions' }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_scope :user do
    get 'logout', to: 'devise/sessions#destroy'
  end

  
  root to: "pages#index"
  get "/avatars/new" => "avatars#new"
  post "/avatars" => "avatars#create"

  resources :user_profiles, except: [:create]

  resources :trainer_profiles, except: [:create]
  
end
