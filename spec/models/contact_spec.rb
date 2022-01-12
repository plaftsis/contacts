require 'rails_helper'

RSpec.describe Contact, type: :model do

  let(:contact) { create(:contact) }

  it "has many audits" do
    expect(contact).to have_many(:audits).dependent(:destroy)
  end

  it "is not valid without a first_name" do
    contact.first_name  = nil
    expect(contact).to_not be_valid
  end

  it "is not valid without a last_name" do
    contact.last_name  = nil
    expect(contact).to_not be_valid
  end

  it "is not valid without an email" do
    contact.email  = nil
    expect(contact).to_not be_valid
  end

  it "has a valid email" do
    contact.email  = "user@example"
    expect(contact).to_not be_valid
  end

  it "has a unique email" do
    contact2 = build(:contact, email: contact.email)
    expect(contact2).to_not be_valid
  end

  it "is not valid without a phone_number" do
    contact.phone_number = nil
    expect(contact).to_not be_valid
  end

  it "has a valid phone_number" do
    contact.phone_number = "11111"
    expect(contact).to_not be_valid
  end

end
