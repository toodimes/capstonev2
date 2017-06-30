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
    get "/users/:user_id/program_preps" => "program_preps#index"
    get "/users/:user_id/program_preps/new" => "program_preps#new"
    get "/users/:user_id/program_preps/:id" => "program_preps#show"
    post "/users/:user_id/program_preps" => "program_preps#create"
    get "/users/:user_id/program_preps/:id/edit" => "program_preps#edit"
    patch "/users/:user_id/program_preps/:id" => "program_preps#update"
    delete "/users/:user_id/program_preps" => "program_preps#destroy"
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
      end
    end
  end

  resources :user_profiles, except: [:create] do 
    resources :goals, only: [:index]
    resources :program_preps, only: [:index, :new]
  end
  resources :trainer_profiles, except: [:create]
  resources :exercises

end
