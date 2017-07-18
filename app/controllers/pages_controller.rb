class PagesController < ApplicationController
  before_action :set_gon

  def index
    @exercises = Exercise.all.limit(8).shuffle
    @muscles = []
    @exercises.each do |exercise|
      unless @muscles.include?(exercise.muscle)
        @muscles << exercise.muscle
      end
    end
    render "index.html.erb"
  end
end
