# frozen_string_literal: true

class CustomFormBuilder < ActionView::Helpers::FormBuilder
  def tag_input(method, _options = {})
    @template.react_component('TagInput',
                              props: { entityName: @object_name, fieldName: method, value: @object.send(method) },
                              prerender: false)
  end

  def text_area(method, options = {})
    super(method, wrap_class(options))
  end

  def text_field(method, options = {})
    super(method, wrap_class(options))
  end

  def number_field(method, options = {})
    super(method, wrap_class(options))
  end

  def select(method, choices = nil, options = {}, html_options = {}, &block)
    wrap_class(html_options)
    super
  end

  def num_range_field(method, _options = {})
    range = @object.send(method)

    begin_range = 0
    end_range = 0
    if range.is_a?(Range)
      begin_range = range.begin
      end_range = range.end
    end

    field_one = number_field(:method, value: begin_range, name: "#{@object_name}[#{method}][]", **options)
    field_two = number_field(:method, value: end_range, name: "#{@object_name}[#{method}][]", **options)
    field_one + field_two
  end

  private

  def wrap_class(options)
    options.reverse_merge!(class: <<-STRING.squish
     resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300
     focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
      dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500
    STRING
                          )
  end
end
