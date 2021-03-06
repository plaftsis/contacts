FactoryBot.define do
  factory :contact do
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    email { Faker::Internet.safe_email }
    phone_number { Faker::Number.number(digits: 10) }
  end
end
