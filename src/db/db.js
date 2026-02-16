const mongoose = require('mongoose');

async function connectDB(){
  try{
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to DB successfully");
  }
  catch(err){
    console.log("Error connecting to DB:",err);
  }
}

module.exports = connectDB;


//db.js is responsible for establishing a connection to the MongoDB database using Mongoose. We define an asynchronous function connectDB that attempts to connect to the database using the connection string stored in the environment variable MONGO_URI. If the connection is successful, we log a success message; if there is an error, we catch it and log an error message. Finally, we export the connectDB function to be used in our server.js file where we start the server and connect to the database.