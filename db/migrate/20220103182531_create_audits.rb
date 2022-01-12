class CreateAudits < ActiveRecord::Migration[6.1]
  def change
    create_table :audits do |t|
      t.string :action, null: false
      t.json :audited_changes
      t.references :contact, null: false, foreign_key: true

      t.timestamps
    end
  end
end
