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
    super(method, wrap_class(options).reverse_merge(maxlength: 255))
  end

  def number_field(method, options = {})
    super(method, wrap_class(options).reverse_merge(max: 1_000_000))
  end

  def select(method, choices = nil, options = {}, html_options = {}, &block)
    wrap_class(html_options)
    super
  end

  def ransack_multi_select(method, choices = [], options = {})
    options.reverse_merge!(ransack: :q)
    name = "#{options[:ransack]}[#{method}][]" if options[:ransack]
    react_multi_select(name, choices, options)
  end

  def react_select(method, choices = [], options = {})

    options.reverse_merge!(select_label: '...', default_values: choices.first, class: '')

    @template.react_component 'Common.Forms.SingleSelect', props: {
      choices:,
      defaultValue: options[:default_value],
      name: "#{@object_name}[#{method}]",
      className: options[:class],
      selectLabel: options[:select_label]
    }
  end

  def react_multi_select(method, choices = [], options = {})

    options.reverse_merge!(select_label: '...', default_values: [], class: '')

    @template.react_component 'Common.Forms.MultiSelect', props: {
      choices:,
      defaultValues: options[:default_values],
      name: method,
      className: options[:class],
      selectLabel: options[:select_label]
    }
  end

  def num_range_field(method, options = {})
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

  def error_messages_for(method)
    errors = @object.errors.full_messages_for(method)
    return nil unless errors.any?

    @template.content_tag(:span, errors.join(', '), class: 'text-red-500')
  end

  private

  def wrap_class(options)
    options.reverse_merge!(class: <<-STRING.squish
     resize-none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300
     focus:ring-accent focus:border-accent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
      dark:text-white dark:focus:ring-accent dark:focus:border-accent
    STRING
    )
  end
end
