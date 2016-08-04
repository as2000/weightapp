require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup 
    @user = User.new(name: "aiden", email: "aidenscott12@googlemail.com")
  end

  test "user valid?" do
    assert @user.valid?
  end
end

