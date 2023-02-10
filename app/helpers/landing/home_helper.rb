module Landing
  module HomeHelper
    ATTACHMENT_REGEX = /{{(image:)(\d+)(:.*)?}}/

    # @param [String] key
    def render_tiptap_configuration(key)
      configuration = ::Configuration.find_by(key:)
      return nil unless configuration

      value = (configuration.value || {})[I18n.locale] || configuration.value[:en] || ''
      content_tag(:div, class: 'prose prose-sm max-w-full') do
        value.gsub(ATTACHMENT_REGEX) do
          match = Regexp.last_match
          index = match[2].to_i
          leftover_match = match[3] || ''
          size = size_value(leftover_match)
          classes = classes_value(leftover_match)
          center = center_value(leftover_match)

          image = configuration.image_files[index]
          center_content_tag(center) do
            image_tag(url_for(image), size:, class: "#{classes}".strip).html_safe if image
          end
        end.html_safe
      end
    end

    private

    def center_content_tag(condition, &block)
      if condition
        content_tag(:div, class: 'w-full flex justify-center') do
          yield block
        end
      else
        yield block
      end
    end

    def size_value(leftover_match)
      match_key(leftover_match, 'size')
    end

    def classes_value(leftover_match)
      match_key(leftover_match, 'class')
    end

    def center_value(leftover_match)
      boolish_string = match_key(leftover_match, 'center')
      ActiveModel::Type::Boolean.new.cast boolish_string
    end

    def match_key(leftover_match, key)

      matched_string = (leftover_match.match(/#{key}=(.*):/).try(:[], 1) || '')

      matched_string.sub(/:#{key}=/, '')
                    .sub(/:.*/, '')
    end

    private_constant :ATTACHMENT_REGEX
  end
end
