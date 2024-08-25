class ErrorsController < ApplicationController
  layout "landing/application"

  def show
    @exception = request.env["action_dispatch.exception"]
    @status_code =
      @exception.try(:status_code) ||
        ActionDispatch::ExceptionWrapper.new(
          request.env,
          @exception,
        ).status_code

    @message = "milorad"
    render template: "errors/#{view_for_code(@status_code)}",
           status: @status_code
  end
end
