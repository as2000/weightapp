class BodystatsController < ApplicationController
protect_from_forgery :except => [:create, :mailgun_create]	

  def index
        @bodystats = Bodystat.order(date: :asc)
 
  end

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
    #logger.debug data
    statHash = Hash.new
    statHash[:bodystat] = Hash.new
    data.shift
    data.each do | stat |
      stat = stat.split(":")
      logger.debug stat 
      case stat[0] 
        #when "Time"
          #logger.debug "in time"
          #date = get_date(stat)
          #puts date.to_s
          #statHash[:bodystat][:date] = date.to_s
        when "Weight"
          statHash[:bodystat][:body_weight] = stat[1].tr("kg", '')
           logger.debug "in weight"
        when "Body Water"
          statHash[:bodystat][:body_water] = stat[1].tr("%", '')
        when "Body Fat"
          statHash[:bodystat][:body_fat] = stat[1].tr("%", '')
        when "Bone"
          statHash[:bodystat][:bone_weight] = stat[1].tr("%", '')
        when "BMI"
          statHash[:bodystat][:bmi] = stat[1].tr("%", '')
        when "Visceral Fat"
          statHash[:bodystat][:visceral_fat] = stat[1].tr("%", '')
        when "BMR"
          statHash[:bodystat][:bmr] = stat[1].tr(" kcal", '')
        when "Muscle Mass"
          statHash[:bodystat][:muscle_mass] = stat[1].tr("%", '')
      end
    end
    logger.debug "out case "
    logger.debug statHash[:bodystat]

    statHash.each do |stat|
      logger.debug stat
    end

  #date = DateTime.parse(statHash[:bodystat][:date])
  #@bodystat = Bodystat.new(bodystat_params)
  #@bodystat.date = date
  #@bodystat.save



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
