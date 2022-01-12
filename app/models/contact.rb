class Contact < ApplicationRecord
  has_many :audits, dependent: :destroy

  validates :first_name, :last_name, presence: true
  validates :email, presence: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }, uniqueness: { case_sensitive: false }
  validates :phone_number, presence: true, numericality: { only_integer: true }, length: { in: 10..14 }

  scope :start_with, -> (prefix) { where("lower(first_name) LIKE :prefix OR lower(last_name) LIKE :prefix", prefix: "#{prefix.downcase}%") }

  before_save :downcase_email
  after_update :log_changes

  private
  def downcase_email
    email.downcase!
  end

  def log_changes
    audited_changes = saved_changes.except("updated_at")
    audits.create(action: "update", audited_changes: audited_changes) unless audited_changes.empty?
  end
end
