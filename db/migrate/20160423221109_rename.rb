class Rename < ActiveRecord::Migration
  def change
  	    rename_column :bodystats, :viseral_fat, :visceral_fat
  end
end
