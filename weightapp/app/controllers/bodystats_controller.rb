class BodystatsController < ApplicationController
	protect_from_forgery :except => :create 


	def new
		
	end

	def index
		@bodystats = Bodystat.all
	end


	def create
		render plain: params
		@bodystat = Bodystat.new(bodystat_params)
		@bodystat.save


	end

	private
		def bodystat_params
			params.require(:bodystat).permit(
				:date,
				:body_weight,
				:body_water,
				:body_fat,
				:bone_weight,
				:visceral_fat,
				:muscle_mass,
				:bmi,
				:bmr
			)
		end


end
