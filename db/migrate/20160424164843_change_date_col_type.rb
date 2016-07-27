class ChangeDateColType < ActiveRecord::Migration
  def change
  	change_column :bodystats, :date,  :datetime  	
  end
end
