class ContactsController < ApplicationController

  before_action :set_contact, only: [:show, :update, :destroy]

  # GET /contacts
  def index
    @contacts = Contact.order(first_name: :asc)
    render json: @contacts
  end

  # GET /contacts/:id
  def show
    render json: @contact
  end

  # POST /contacts
  def create
    @contact = Contact.new(contact_params)
    if @contact.save
      render json: @contact
    else
      render json: { errors: @contact.errors.as_json(full_messages: true) }, status: 400
    end
  end

  # PUT /contacts/:id
  def update
    if @contact.update(contact_params)
      render json: @contact
    else
      render json: { errors: @contact.errors.as_json(full_messages: true) }, status: 400
    end
  end

  # DELETE /contacts/:id
  def destroy
    if @contact.destroy
      render json: { message: 'Contact successfully deleted.' }, status: 200
    else
      render json: { error: 'Unable to delete contact.' }, status: 400
    end
  end

  private
  def contact_params
    params.permit(:first_name, :last_name, :email, :phone_number)
  end

  def set_contact
    @contact = Contact.find(params[:id])
  end
end
