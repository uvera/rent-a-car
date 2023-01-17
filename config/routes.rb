Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  constraints Rodauth::Rails.authenticated(:admin) do
    resource :locale, only: [] do
      post :set_locale
    end
    namespace :admin do
      resources :dashboard, only: [] do
        get "/", to: redirect('admin/dashboard/cars'), on: :collection
      end

      namespace :dashboard do
        resources :cars, only: [:index]
        resources :configurations, except: [:destroy]
      end
    end
  end
end
