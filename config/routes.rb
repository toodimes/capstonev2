Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'users/registrations', sessions: 'users/sessions' }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_scope :user do
    get 'logout', to: 'devise/sessions#destroy'
  end

  
  root to: "pages#index"
  get "/avatars/new" => "avatars#new"
  post "/avatars" => "avatars#create"

  namespace :api do
    namespace :v1 do
      resources :exercises, except: [:new, :create, :destroy]
      resources :user_profiles do
        resources :goals, except: [:new, :show, :edit]
        resources :program_preps, except: [:edit, :show]
        resources :programs, except: [:new, :edit]
      end
      resources :trainer_profiles
      resources :messages, except: [:update, :edit]
    end
  end

  resources :user_profiles, except: [:create] do 
    resources :goals, only: [:index]
    resources :program_preps, only: [:index, :new]
    resources :programs, only: [:index, :show]
  end
  resources :trainer_profiles, except: [:create]
  resources :messages, only: [:index, :show]
  resources :exercises

end
