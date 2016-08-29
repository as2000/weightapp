class Bodystat < ActiveRecord::Base
  validates_presence_of :body_weight, :body_water, :body_fat, :bone_weight, :visceral_fat, :muscle_mass, :bmi, :bmr
end
