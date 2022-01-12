class CreateContacts < ActiveRecord::Migration[6.1]
  def change
    create_table :contacts do |t|
      t.string :first_name, null: false, index: true
      t.string :last_name, null: false, index: true
      t.string :email, null: false, index: true
      t.string :phone_number, null: false, index: true

      t.timestamps
    end
  end
end
