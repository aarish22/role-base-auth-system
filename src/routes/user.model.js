const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique:true,
  },
  email:{
    type:String,
    required:true,
    unique:true,
  },
  password:{
    type:String,
    required:true,
  },

  role:{
    type:String,
    enum:["user","artist"], // Define allowed roles
    default:"user",
  }
})

const userModel = mongoose.model("User",userSchema); // Create the User model using the defined schema. This model will be used to interact with the User collection in the MongoDB database, allowing us to perform operations such as creating new users, querying existing users, and updating user information based on the defined schema structure and validation rules.

module.exports = userModel;


//user.model.js defines the Mongoose schema and model for the User collection in our MongoDB database. We specify the fields for username, email, password, and role, along with their data types and validation rules. The role field is an enum that restricts values to either "user" or "artist", with a default value of "user". Finally, we create and export the userModel to be used in other parts of our application for database operations related to users.