require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup 
    @user = User.new(name: "aiden", email: "aidenscott12@googlemail.com", 
                    password: "foobar", password_confirmation: "foobar")
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

  test "name should not be too long" do
    @user.name = "a" * 51
    assert_not @user.valid?
  end

  test "email should not be too long" do
    @user.email = ("a" * 244) + "@example.com"
    assert_not @user.valid?
  end

  test "email validation should accept valid emails" do
    emails = %w[aidenscott12@gmail.com USER@food.com A_US-ER@foo.bar.org irst.last@foo.jp alice+bob@baz.cn]
    emails.each do |email|
      @user.email = email
      assert @user.valid?, "#{email.inspect} should be valid"
    end
  end
  
  test "email validation sohuld reject invalid emails" do 
      invalid_addresses = %w[user@example,com user_at_foo.org user.name@example.
                                   foo@bar_baz.com foo@bar+baz.com]
      invalid_addresses.each do |email|
        @user.email = email
        assert_not @user.valid?, "#{email.inspect} should be invalid"
      end
  end

  test "uniqueness of email addresses" do
    duplicate_user = @user.dup
    @user.save
    assert_not duplicate_user.valid?
  end
  
  test "email addresses should be saved lower case" do
    mixed_case_email = "FOO@example.Com"
    @user.email = mixed_case_email
    @user.save
    assert_equal mixed_case_email.downcase, @user.reload.email
  end

  test "password should be present" do
    @user.password = @user.password_confirmation = " " * 6
    assert_not @user.valid?
  end

  test "password should have min length" do
   @user.password_confirmation = @user.password = "a" * 5
   assert_not @user.valid?
  end 
end 

