Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  root "landing/home#index"

  get "/check.txt", to: proc { [200, {}, ["simple_check"]] }

  scope module: :landing do
    match "/404", via: :all, to: "errors#show"
    match "/403", via: :all, to: "errors#show"
    match "/500", via: :all, to: "errors#show"

    resources :cars, only: %i[index show] do
      resources :car_inquires,
                controller: :car_inquires,
                only: %i[create new show],
                shallow: true
    end
    resources :terms, only: %i[index]
    resources :contacts, only: %i[index]
  end

  resource :locale, only: [] do
    post :set_locale
  end

  constraints Rodauth::Rails.authenticate(:admin) do
    namespace :admin do
      match "/404", via: :all, to: "admin/errors#show"
      match "/403", via: :all, to: "admin/errors#show"
      match "/500", via: :all, to: "admin/errors#show"

      resources :dashboard, only: [] do
        get "/", to: redirect("admin/dashboard/cars"), on: :collection
      end

      namespace :dashboard do
        resources :car_inquires, only: %i[index] do
          post :refuse, on: :member
          post :approve, on: :member
        end
        resources :cars do
          post :undiscard, on: :member
          post :index
          resources :images,
                    controller: :car_images,
                    only: %i[destroy create index]
          resources :schedules,
                    controller: :car_schedules,
                    only: %i[index create update destroy],
                    shallow: true
        end
        resources :configurations, except: [:destroy] do
          resources :images,
                    controller: :configuration_images,
                    only: %i[destroy create index]
        end
      end
    end
  end
end
