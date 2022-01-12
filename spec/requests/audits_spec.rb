require 'rails_helper'

RSpec.describe "Audits", type: :request do
  describe "GET /contacts/:contact_id/audits" do
    before do
      contact = create(:contact)
      contact.update(email: Faker::Internet.safe_email)
      get "/contacts/#{contact.id}/audits"
    end

    it "should respond with HTTP Status 200" do
      expect(response.status).to eq(200)
    end

    it "should respond with expected audits" do
      expect(JSON(response.body).length).to eq(1)
      expect(JSON(response.body).first['audited_changes'].key?('email')).to be_truthy
    end
  end
end
