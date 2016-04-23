class CreateBodystats < ActiveRecord::Migration
  def change
    create_table :bodystats do |t|
      t.date :date
      t.decimal :body_weight
      t.decimal :body_water
      t.decimal :body_fat
      t.decimal :bone_weight
      t.decimal :viseral_fat
      t.decimal :muscle_mass
      t.decimal :bmi
      t.decimal :bmr

      t.timestamps null: false
    end
  end
end
