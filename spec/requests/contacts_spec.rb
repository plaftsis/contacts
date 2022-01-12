require 'rails_helper'

RSpec.describe "Contacts", type: :request do
  describe "GET /contacts" do
    before do
      10.times { create(:contact) }
      get "/contacts"
    end

    it "should respond with HTTP Status 200" do
      expect(response.status).to eq(200)
    end

    it "should respond with array of contacts" do
      expect(JSON(response.body).length).to eq(10)
    end
  end

  describe "GET /contacts/:id" do
    before do
      @contact = create(:contact)
      get "/contacts/#{@contact.id}"
    end

    it "should respond with HTTP Status 200" do
      expect(response.status).to eq(200)
    end

    it "should respond with expected contact" do
      expect(JSON(response.body)['id']).to eq(@contact.id)
    end
  end

  describe "post /contacts" do
    context 'valid contact attributes' do
      before do
        contact = build(:contact)
        params = {
            first_name: contact.first_name,
            last_name: contact.last_name,
            email: contact.email,
            phone_number: contact.phone_number
        }
        post "/contacts", params: params
      end

      it "should respond with HTTP Status 200" do
        expect(response.status).to eq(200)
      end

      it "should respond with created contact" do
        expect(JSON(response.body)['id']).to eq(Contact.last.id)
      end
    end

    context 'invalid contact attributes' do
      before do
        contact = build(:contact)
        params = {
            first_name: contact.first_name,
            last_name: contact.last_name,
            email: contact.email
        }
        post "/contacts", params: params
      end

      it "should respond with HTTP Status 400" do
        expect(response.status).to eq(400)
      end

      it "should respond with expected error" do
        expect(JSON(response.body)['errors']).to eq({"phone_number" => ["Phone number can't be blank", "Phone number is not a number", "Phone number is too short (minimum is 10 characters)"]})
      end
    end

    context 'duplicate email' do
      before do
        contact = create(:contact)
        contact2 = build(:contact)
        params = {
            first_name: contact2.first_name,
            last_name: contact2.last_name,
            email: contact.email,
            phone_number: contact.phone_number
        }
        post "/contacts", params: params
      end

      it "should respond with HTTP Status 400" do
        expect(response.status).to eq(400)
      end

      it "should respond with expected message" do
        expect(JSON(response.body)['errors']).to eq({"email" => ["Email has already been taken"]})
      end
    end
  end

  describe "put /contacts/:id" do
    context 'valid contact attributes' do
      before do
        @contact = create(:contact)
        params = {
            phone_number: Faker::Number.number(digits: 10)
        }
        put "/contacts/#{@contact.id}", params: params
      end

      it "should respond with HTTP Status 200" do
        expect(response.status).to eq(200)
      end

      it "should respond with updated contact" do
        expect(JSON(response.body)['id']).to eq(@contact.id)
      end
    end

    context 'duplicate email' do
      before do
        contact = create(:contact)
        contact2 = create(:contact)
        params = {
            email: contact.email
        }
        put "/contacts/#{contact2.id}", params: params
      end

      it "should respond with HTTP Status 400" do
        expect(response.status).to eq(400)
      end

      it "should respond with expected message" do
        expect(JSON(response.body)['errors']).to eq({"email"=>["Email has already been taken"]})
      end
    end
  end

  describe "DELETE /contacts/:id" do
    before do
      contact = create(:contact)
      delete "/contacts/#{contact.id}"
    end

    it "should respond with HTTP Status 200" do
      expect(response.status).to eq(200)
    end

    it "should respond with expected message" do
      expect(JSON(response.body)['message']).to eq("Contact successfully deleted.")
    end
  end
end
