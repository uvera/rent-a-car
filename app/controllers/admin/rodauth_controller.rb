class Admin::RodauthController < ApplicationController
  layout 'admin/rodauth/application'
  # used by Rodauth for rendering views, CSRF protection, and running any
  # registered action callbacks and rescue_from handlers
end
