const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const musicRoutes = require('./routes/music.routes');

const app = express();


app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRoutes);
app.use('/api/music',musicRoutes);


module.exports = app;


// app.js is the main application file where we set up our Express server, configure middleware, and define routes. We import necessary modules, create an Express app, and use middleware for parsing JSON and cookies. We also set up a route for authentication-related endpoints. Finally, we export the app to be used in the server.js file where we start the server.