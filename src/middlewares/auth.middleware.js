const jwt = require("jsonwebtoken");


function authArtist(req,res,next) {  // Middleware function to authenticate artists based on JWT token in cookies. It checks for the presence of a token, verifies it, and ensures that the user has the "artist" role before allowing access to protected routes. If the token is missing, invalid, or the user does not have the required role, it responds with appropriate error messages and status codes.
  const token = req.cookies.token;

  if(!token){
    console.log("No token provided");
    return res.status(401).send("Unauthorized");
  }
  
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if(decoded.role !== "artist"){
      return res.status(403).json({message:"Forbidden: Only artists can perform this action"});
    }
    req.user = decoded; // Attach the decoded token information (which includes the user's ID and role) to the req.user property. This allows subsequent middleware functions or route handlers to access the authenticated user's information for further processing, such as authorization checks or personalized responses.

    next(); // If the token is valid and the user has the "artist" role, call next() to pass control to the next middleware function or route handler in the Express.js application. This allows the request to proceed to the intended endpoint that requires artist authentication.
  }
  catch(err){
    console.log(err);
    res.status(401).json({message:"Unauthorized! Invalid token"});
  }
}

async function authUser(req,res,next) {
  const token = req.cookies.token;

  if(!token){
    console.log("No token provided");
    return res.status(401).send("Unauthorized");
  }

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if(decoded.role !== "user"){
      return res.status(403).json({message:"Forbidden: Only users can perform this action"});
    }
    req.user = decoded;

    next();
  }
  catch(err){
    console.log(err);
    res.status(401).json({message:"Unauthorized! Invalid token"});
  }
}

module.exports = {
  authArtist,
  authUser
}