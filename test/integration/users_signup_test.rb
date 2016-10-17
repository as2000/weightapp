require 'test_helper'

class UsersSignupTest < ActionDispatch::IntegrationTest
  # test "the truth" do
  #   assert true
  # end

  test 'invalid signup information ' do 
    get users_new_path 
    assert_no_difference 'User.count' do 
      post users_path, { user:  { name: "",
                                       email: "",
                                       password: "ddd",
                                       password_confirmation: "ccc"}}
      end
    assert_template 'users/new'
    assert_select 'div#error_explanation'
    assert_select 'div.field_with_errors'
  end
end
