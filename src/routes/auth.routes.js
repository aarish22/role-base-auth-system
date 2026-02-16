const express = require('express');
const authController = require('../controllers/auth.controller');

const router = express.Router();



router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);
router.post('/logout', authController.logoutUser);

module.exports = router;


// auth.routes.js is where we define the routes related to authentication, such as user registration and login. We import the Express router and set up endpoints for handling these actions. The actual logic for registering a user or logging in will be implemented in the corresponding controller functions, which will be called when these routes are accessed. Finally, we export the router to be used in our main app.js file.