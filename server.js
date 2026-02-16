require('dotenv').config();
const app = require('./src/app');
const connectDB = require('./src/db/db');

const port = process.env.PORT || 3000;

connectDB();

app.listen(port, ()=>{
  console.log("Server is running on port:",port)
})

// server.js is the entry point of our application where we start the Express server and connect to the MongoDB database. We import the app from our app.js file and the connectDB function from our db.js file. We then call connectDB to establish a connection to the database before starting the server. Finally, we listen on the specified port and log a message indicating that the server is running.

// route folder contains all the route definitions for our application, such as auth.routes.js for authentication-related routes. The controllers folder contains the logic for handling requests and responses for each route, such as auth.controller.js for authentication-related actions. The models folder contains the Mongoose schemas and models for our database collections, such as user.model.js for the User collection. The db folder contains the logic for connecting to the MongoDB database, such as db.js.The app.js file is where we set up our Express server, configure middleware, and define routes. Finally, the server.js file is where we start the server and connect to the database.

// src folder contains all the source code for our application, including the main app.js file, the server.js file, and subfolders for routes, controllers, models, and database connection logic. This organization helps keep our code modular and maintainable.

// models folder contains the Mongoose schemas and models for our database collections. For example, user.model.js defines the schema for the User collection, including fields like username, email, password, and role. This allows us to interact with the database using these models in our controllers and routes.

// db folder contains the logic for connecting to the MongoDB database. The db.js file defines a function connectDB that uses Mongoose to establish a connection to the database using the connection string from the environment variable MONGO_URI. This function is called in server.js before starting the server to ensure that we have a successful connection to the database before handling any requests.

// controllers folder contains the logic for handling requests and responses for each route. For example, auth.controller.js contains functions for registering a user and logging in. These functions interact with the database using the models defined in the models folder and handle the business logic for authentication-related actions. The controllers are called from the routes defined in the routes folder when specific endpoints are accessed.

