require 'test_helper'

class UsersSignupTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  test 'invalid signup information ' do 
  get signup_path 
    assert_no_difference 'User.count' do 
      post users_path, { user:  { name: "",
                                       email: "",
                                       password: "ddd",
                                       password_confirmation: "ccc" } }
      end
    assert_template 'users/new'
    assert_select 'div#error_explanation'
    assert_select 'div.field_with_errors'
  end
  
  test 'valid signup information' do
    assert_difference 'User.count' do
      post users_path, {user: { name: 'aiden scott',
                                email: 'aiden.scott12+test@googlemail.com',
                                password: 'password',
                                password_confirmation: 'password' }}
      follow_redirect!
      assert_template 'users/show'
      assert_not flash.empty?
    end
  end
end
