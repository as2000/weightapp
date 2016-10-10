module ApplicationHelper
  def full_title(page_title = "")
    base_title = "page"
    if page_title.empty?
      "unnamed #{base_title}"
    else 
      "#{page_title} - #{base_title}"
    end
  end

end
