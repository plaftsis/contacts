class AuditsController < ApplicationController

  # GET /contacts/:contact_id/audits
  def index
    contact = Contact.find(params[:contact_id])
    @audits = contact.audits.order(created_at: :desc)
    render json: @audits
  end
end
