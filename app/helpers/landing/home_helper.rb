module Landing
  module HomeHelper
    ATTACHMENT_REGEX = /{{(image:)(\d+):(.*)}}/

    # @param [String] key
    def render_tiptap_configuration(key)
      configuration = ::Configuration.find_by(key:)
      return nil unless configuration

      value = (configuration.value || {})[I18n.locale] || configuration.value[:en] || ''
      content_tag(:div, class: 'prose prose-sm') do
        value.gsub(ATTACHMENT_REGEX) do
          index = Regexp.last_match(2).to_i
          size = Regexp.last_match(3)
          image = configuration.image_files[index]
          image_tag(url_for(image), size:, class: 'h-auto max-w-full').html_safe if image
        end.html_safe
      end
    end

    private_constant :ATTACHMENT_REGEX
  end
end
