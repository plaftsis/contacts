FactoryBot.define do
  factory :audit do
    action { "update" }
    audited_changes { {} }
    association :contact
  end
end
