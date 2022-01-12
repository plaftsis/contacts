class Audit < ApplicationRecord
  belongs_to :contact

  VALID_ACTIONS = %w(update)

  validates :action, inclusion: { in: VALID_ACTIONS, allow_blank: false }
end
