module FormResponses
  extend ActiveSupport::Concern

  def form_respond_fail(template)
    respond_to do |format|
      format.html do
        flash[:error] = I18n.t('flash.update.error')
        render template
      end
      format.turbo_stream do
        flash.now[:error] = I18n.t('flash.update.error')
        render template
      end
    end
  end
end
