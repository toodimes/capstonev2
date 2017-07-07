class PagesController < ApplicationController
  before_action :set_gon

  def index
    render "index.html.erb"
  end
end
