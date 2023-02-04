class CreateCarInquires < ActiveRecord::Migration[7.0]
  def change
    create_table :car_inquires do |t|
      t.string :driver_license_number, null: false
      t.string :phone_number, null: false
      t.string :passport_number, null: false

      t.string :telegram_phone_number, null: true
      t.string :viber_phone_number, null: true
      t.string :whatsapp_phone_number, null: true

      t.string :arrival_flight_number, null: false
      t.datetime :arrival_flight_at, null: false
      t.datetime :pickup_at, null: false
      t.datetime :return_at, null: false

      t.decimal :pickup_lat, null: false, precision: 16, scale: 10
      t.decimal :pickup_long, null: false, precision: 16, scale: 10

      t.decimal :return_lat, null: false, precision: 16, scale: 10
      t.decimal :return_long, null: false, precision: 16, scale: 10

      t.string :status, default: 'pending', null: false

      t.references :car, null: false, foreign_key: true

      t.timestamps
    end
  end
end
