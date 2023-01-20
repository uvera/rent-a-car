module ApplicationHelper
  include Pagy::Frontend

  def signal_react_rerender
    content_tag(:span, nil, data: { signal_react_rerender: true }, class: 'hidden')
  end
end
