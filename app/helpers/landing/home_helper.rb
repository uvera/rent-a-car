module Landing
  module HomeHelper
    ATTACHMENT_REGEX = /{{(image:)(\d+)(:.*)?}}/

    # @param [String] key
    def render_tiptap_configuration(key)
      configuration = ::Configuration.find_by(key:)
      return nil unless configuration

      value = (configuration.value || {})[I18n.locale] || configuration.value[:en] || ''
      content_tag(:div, class: 'prose prose-sm') do
        value.gsub(ATTACHMENT_REGEX) do
          match = Regexp.last_match
          index = match[2].to_i
          leftover_match = match[3] || ''
          size = (leftover_match.match(/size=(.*):/).try(:[], 1) || '').sub(/:size=/, '').sub(/:.*/, '')
          classes = (leftover_match.match(/class=(.*):/).try(:[], 1) || '').sub(/:class=/, '').sub(/:.*/, '')
          image = configuration.image_files[index]
          image_tag(url_for(image), size:, class: "h-auto max-w-full #{classes}".strip).html_safe if image
        end.html_safe
      end
    end

    private_constant :ATTACHMENT_REGEX
  end
end
