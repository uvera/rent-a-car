# frozen_string_literal: true

class ReactFormBuilder < ActionView::Helpers::FormBuilder
  def tag_input(method, _options = {})
    @template.react_component('TagInput',
                              props: { entityName: @object_name, fieldName: method, value: @object.send(method) },
                              prerender: false)
  end
end
