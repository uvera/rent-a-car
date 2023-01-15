Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  constraints Rodauth::Rails.authenticated(:admin) do
    namespace :admin do
      resources :dashboard, only: [] do
        get "/", to: redirect('admin/dashboard/cars'), on: :collection
      end

      namespace :dashboard do
        resources :cars, only: [:index]
      end
    end
  end
end
