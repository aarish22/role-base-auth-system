const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res){
  const {username, email, password , role} = req.body;

  const existingUser = await userModel.findOne({
    $or:[
      {username},
      {email}
    ]
  })

  if (existingUser){
    return res.status(400).json({message:"Username or email already exists"});
  }

  const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before storing it in the database for security reasons, and use a salt rounds value of 10 for hashing. This helps protect user passwords in case of a database breach. Salt rounds determine the computational cost of hashing, with higher values providing better security but also increasing the time it takes to hash passwords. A value of 10 is a common choice that balances security and performance.

  const newUser = await userModel.create({
    username,
    email,
    password: hashedPassword,
    role
  })
  const token = jwt.sign({id:newUser._id, role:newUser.role}, process.env.JWT_SECRET, {expiresIn:"1h"})

  res.cookie("token", token)

  res.status(201).json({message:"User registered successfully", newUser:{
    username:newUser.username,
    email:newUser.email,
    role:newUser.role
  }})
}


async function loginUser(req,res) {
  const {username, email, password} = req.body;

  const user = await userModel.findOne({
    $or: [
      {username},
      {email}
    ]
  })
  if(!user){
    return res.status(400).json({message:"Invalid username or email"});
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if(!isPasswordValid){
    return res.status(400).json({message:"Invalid password"});
  }

  const token = jwt.sign(
    {id: user._id,
    role: user.role 
}, process.env.JWT_SECRET)


res.cookie("token", token)

res.status(200).json({message:"Login successful", user:{username:user.username, email:user.email, role:user.role }})
}

async function logoutUser(req,res) {
  res.clearCookie("token");
  res.status(200).json({message:"Logout successful"});
} 

module.exports = {
  registerUser, loginUser, logoutUser
}

// auth.controller.js contains the logic for handling authentication-related actions, such as user registration and login. In the registerUser function, we extract the username, email, password, and role from the request body. We check if a user with the same username or email already exists in the database. If so, we return a 400 status with an error message. If not, we create a new user in the database and generate a JWT token that includes the user's ID and role. We then set this token as a cookie in the response and return a success message along with the new user's information (excluding the password). This function will be called when a user attempts to register through the corresponding route defined in auth.routes.js.


// token is generated using the jsonwebtoken library, which allows us to create a signed token that can be used for authentication and authorization purposes. The token includes the user's ID and role, which can be used to verify the user's identity and determine their access level when they make subsequent requests to protected routes in our application. The token is set to expire after 1 hour for security reasons, ensuring that users will need to re-authenticate after a certain period of time.