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
   
   # logger.debug params['body-plain']
    
    data = params['body-plain'].split("\r\n")
    logger.debug data
        #case data[0]
          #when "Time"
            #date = get_date(data[1])
            #puts date.to_s
            #statHash[:bodystat][:date] = date.to_s
          #when "Weight"
            #statHash[:bodystat][:body_weight] = data[1].tr("kg", '')
          #when "Body Water"
            #statHash[:bodystat][:body_water] = data[1].tr("%", '')
          #when "Body Fat"
            #statHash[:bodystat][:body_fat] = data[1].tr("%", '')
          #when "Bone"
            #statHash[:bodystat][:bone_weight] = data[1].tr("%", '')
          #when "BMI"
            #statHash[:bodystat][:bmi] = data[1].tr("%", '')
          #when "Visceral Fat"
            #statHash[:bodystat][:visceral_fat] = data[1].tr("%", '')
          #when "BMR"
            #statHash[:bodystat][:bmr] = data[1].tr(" kcal", '')
          #when "Muscle Mass"
            #statHash[:bodystat][:muscle_mass] = data[1].tr("%", '')
        #end
        data.shift
        data.each do | stat |
         logger.debug stat 
        end
        render plain: statHash

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
