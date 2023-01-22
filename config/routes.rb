Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root "landing/home#index"

  namespace :landing do
    resources :cars, only: [:index, :show]
  end

  constraints Rodauth::Rails.authenticated(:admin) do
    resource :locale, only: [] do
      post :set_locale
    end
    namespace :admin do
      resources :dashboard, only: [] do
        get '/', to: redirect('admin/dashboard/cars'), on: :collection
      end

      namespace :dashboard do
        resources :cars do
          post :index
          resources :images, controller: :car_images, only: [:destroy, :create, :index]
        end
        resources :configurations, except: [:destroy] do
          resources :images, controller: :configuration_images, only: [:destroy, :create, :index]
        end
      end
    end
  end
end
