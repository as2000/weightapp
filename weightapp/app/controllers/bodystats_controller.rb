class BodystatsController < ApplicationController
protect_from_forgery :except => [:create, :mailgun_create]	


	def create
		render plain: "ok"
		date = DateTime.parse(params[:bodystat][:date])
		@bodystat = Bodystat.new(bodystat_params)
		@bodystat.date = date
		@bodystat.save
	end

  def mailgun_create
    logger.debug :hello
    render plain: "ok"

  end

	def destroy
	  @bodystat = Bodystat.find(params[:id])
	  @bodystat.destroy
	 
	  redirect_to bodystats_path
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
