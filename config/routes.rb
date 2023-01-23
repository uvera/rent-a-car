Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root 'landing/home#index'

  scope module: :landing do
    resources :cars, only: %i[index show]
    resources :terms, only: %i[index]
  end

  resource :locale, only: [] do
    post :set_locale
  end

  constraints Rodauth::Rails.authenticated(:admin) do
    namespace :admin do
      resources :dashboard, only: [] do
        get '/', to: redirect('admin/dashboard/cars'), on: :collection
      end

      namespace :dashboard do
        resources :cars do
          post :undiscard, on: :member
          post :index
          resources :images, controller: :car_images, only: %i[destroy create index]
        end
        resources :configurations, except: [:destroy] do
          resources :images, controller: :configuration_images, only: %i[destroy create index]
        end
      end
    end
  end
end
