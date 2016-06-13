class ImportsController < ApplicationController
  before_action :set_import, only: [:show, :edit, :update, :destroy]

  skip_before_filter :verify_authenticity_token

  # POST /imports
  # POST /imports.json
  def create
    File.write('/Users/aiden/src/out.txt', params['Subject'])

    logger.debug "subject: " + params['Subject']
    render plain: :thanks
  end

  
  private
    # Use callbacks to share common setup or constraints between actions.
    def set_import
      @import = Import.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def import_params
      params.fetch(:import, {})
    end
end
