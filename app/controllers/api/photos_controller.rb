class Api::PhotosController < ApplicationController
  before_filter :require_current_user!, :only => [:create, :update]

  def create
    @photo = Photo.new(params[:photo])
    @photo.owner_id = current_user.id
    if @photo.save
      render :json => @photo
    else
      render(
        :json => @photo.errors.full_messages,
        :status => :unprocessible_entity
      )
    end
  end

  def update
    update_params = params[:photo].dup
    update_params.delete("created_at")
    update_params.delete("id")

    @photo = Photo.find(params[:id])
    if @photo.update_attributes(update_params)
      render :json => @photo
    else
      render(
        :json => @photo.errors.full_messages,
        :status => :unprocessible_entity
      )
    end
  end

  def index
    @photos = Photo.where("owner_id = ?", params[:user_id])
    render :json => @photos
  end
end
