class CreateCarSchedules < ActiveRecord::Migration[7.0]
  def change
    create_table :car_schedules do |t|
      t.datetime :start_date, null: false
      t.datetime :end_date, null: false
      t.string :comment, null: true
      t.references :car, null: false, foreign_key: true

      t.timestamps
    end
  end
end
