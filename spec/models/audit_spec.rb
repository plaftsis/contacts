require 'rails_helper'

RSpec.describe Audit, type: :model do
  let(:audit) { create(:audit) }

  it "belongs to contact" do
    expect(audit).to belong_to(:contact)
  end

  it "is has a valid action" do
    audit.action = "create"
    expect(audit).to_not be_valid
  end

  it "is created when contact is updated" do
    contact = create(:contact)
    contact.update(email: Faker::Internet.safe_email)
    expect(contact.audits.count).to eq(1)
    expect(contact.audits.last.action).to eq("update")
    expect(contact.audits.last.audited_changes.key?("email")).to be_truthy
  end
end
