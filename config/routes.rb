Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'users/registrations', sessions: 'users/sessions' }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_scope :user do
    get 'logout', to: 'devise/sessions#destroy'

    #MESSAGES ROUTES
    get "/users/:user_id/messages" => "messages#index"
    get "/users/:user_id/messages/new" => "messages#new"
    get "/users/:user_id/messages/:id" => "messages#show"
    post "/users/:user_id/messages" => "messages#create"
    get "/users/:user_id/messages/:id/edit" => "messages#edit"
    patch "/users/:user_id/messages/:id" => "messages#update"
    delete "/users/:user_id/messages" => "messages#destroy"
    #PROGRAM PREP ROUTES
    # get "/users/:user_id/program_preps" => "program_preps#index"
    # get "/users/:user_id/program_preps/new" => "program_preps#new"
    # #PROGRAM ROUTES
    # get "/users/:user_id/programs" => "programs#index"
    # get "/users/:user_id/programs/:id" => "programs#show"
  end

  
  root to: "pages#index"
  get "/avatars/new" => "avatars#new"
  post "/avatars" => "avatars#create"

  namespace :api do
    namespace :v1 do
      resources :exercises, except: [:new, :destroy, :create]
      resources :user_profiles do
        resources :goals, except: [:new, :show, :edit]
        resources :program_preps, except: [:edit, :show]
        resources :programs, except: [:new, :edit]
      end
    end
  end

  resources :user_profiles, except: [:create] do 
    resources :goals, only: [:index]
    resources :program_preps, only: [:index, :new]
    resources :programs, only: [:index, :show]
  end
  resources :trainer_profiles, except: [:create]
  resources :exercises

end
