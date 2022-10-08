// Implement Account class, there are a some methods for helping you,
// but you can write your own methods to, if it is in needed.

class Account {
  construnctor() {}

  users = [];
  // Array of objects must have this structure
  // {
  //   firstName: string
  //   lastName:string
  //   email:string
  //   age: number
  //   password: string
  //   profileId: string or number
  // }

  SignIn(email, password) {
    // User must provide email and password
    // After providing correct data, you must return accountId
  }

  SignUp(firstName, lastName, age, email, password, confirmPassword) {
    // In first step validate user provided information
    // For validation information use Validate method
  }

  GenerateUniqueProfileId() {
    // Must be return unique account ID
  }

  Validate() {
    // 1. First name and last name must not be empty, and must have min 3 character,
    // 2. Age must be above or equal to 18
    // 3. Email must be valid
    // 4. Password must be included numbers, upper cases, lower cases, one symbol, and must have min 8 characters
    // You must be implement PasswordValidation method, which is part of this class
  }

  DeleteAccount(profileId) {
    // Must delete user profile, by provided correct profileId
    // If user not found, then show message
  }

  ResetPassword(profileId, newPassword) {
    // Must update user's profile password, by provided profileId
  }

  UpdateProfile(profileId, profileInfo = {}) {
    // Must update profile info, can be optional parameters
    // In this function you can not update passwords, there is an separated method for this action
  }

  Profile(profileId) {
    // Must return user info (first name,  last name, email and age) by profileId
  }

  PasswordValidation() {
    // Must be validate is valid password was provided by user or not
  }
}
