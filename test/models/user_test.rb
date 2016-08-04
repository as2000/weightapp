require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup 
    @user = User.new(name: "aiden", email: "aidenscott12@googlemail.com")
  end

  test "user valid?" do
    assert @user.valid?
  end

  test "user name shouldn't be blank" do
    @user.name = ""
    assert_not  @user.valid?
  end


  test "email shouldn't be blank" do
    @user.email = ""
    assert_not  @user.valid?
  end
end

