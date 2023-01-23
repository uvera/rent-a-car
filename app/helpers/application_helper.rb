module ApplicationHelper
  include Pagy::Frontend

  def signal_react_rerender
    content_tag(:span, nil, data: { signal_react_rerender: true }, class: 'hidden')
  end

  def site_title
    site_name = Configuration.value_site_name || {}
    site_name[I18n.locale]
  end

  def page_title(title)
    content_for(:page_title, title)
  end

  def entity_title(title)
    content_for(:entity_title, title)
  end
end
