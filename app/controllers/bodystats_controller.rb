class BodystatsController < ApplicationController
  require 'date'
  protect_from_forgery :except => [:mailgun_create]

  def index
        @bodystats = Bodystat.order(date: :desc)
        @time_weight_array = generate_time_weight_array(@bodystats)


  end

  def create
    render plain: "ok"
    date = DateTime.parse(params[:date])
    @bodystat = Bodystat.new(bodystat_params)
    @bodystat.date = date
    @bodystat.save
  end

  def mailgun_create
    #split the email body on newline
    data = params['body-plain'].split("\r\n")
    statHash = Hash.new
    data.shift
    data.each do | stat |
      stat = stat.split(":", 2)
      case stat[0]
        when "Time"
          time = stat[1].split(", ").first
          date = stat[1].split(", ").last
          dt = date +" " + time
          ts = DateTime.strptime(dt,"%m/%d/%Y %R")
          statHash[:date] = ts
        when "Weight"
          if stat[1].end_with? "lb"
            statHash[:body_weight] = stat[1].tr("lb", '').to_f * 0.454
          else
            statHash[:body_weight] = stat[1].tr("kg", '')
          end
        when "Body Water"
          statHash[:body_water] = stat[1].tr("%", '')
        when "Body Fat"
          statHash[:body_fat] = stat[1].tr("%", '')
        when "Bone"
          if stat[1].include? "BMI"
            stat = stat[1].split(',')
            statHash[:bone_weight] = stat[0].tr("kg", '')
            statHash[:bmi] = stat[1].tr("BMI:", '')
          else
            statHash[:bone_weight] = stat[1].tr("kg", '')
          end

        when "BMI"
          statHash[:bmi] = stat[1].tr("%", '')
        when "Visceral Fat"
          statHash[:visceral_fat] = stat[1].tr("%", '')
        when "BMR"
          statHash[:bmr] = stat[1].tr(" kcal", '')
        when "Muscle Mass"
          statHash[:muscle_mass] = stat[1].tr("%", '')
      end
    end
    @bodystat = Bodystat.new(statHash)
    @bodystat.save
    render plain: "200"
  end

  def destroy
    @bodystat = Bodystat.find(params[:id])
    @bodystat.destroy

    redirect_to bodystats_path
  end

  def show
    render json: Bodystat.order(date: :asc)
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

    def array_to_json(array)
      out = "["
      array.each do |item|
        out += item.to_s + ","
      end
      out.chomp! ","
      out +="]"
    end

    def generate_time_weight_array(bodystats)
      weight_array = Array.new
      date_array = Array.new
        bodystats.reverse.each do | stat |

          weight_array << stat[:body_weight].to_r * 2.205
          date_string = stat[:date].to_s
          date_array << stat[:date].to_i * 1000 #milliseconds
        end
        time_weight_array = array_to_json(date_array.zip(weight_array))
    end


end
