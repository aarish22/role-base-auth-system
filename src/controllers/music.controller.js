const musicModel = require("../models/music.model");
const {uploadFile} = require("../services/storage.service");
const albumModel = require("../models/album.model");
const jwt = require("jsonwebtoken");


async function createMusic(req,res) {
  const token = req.cookies.token;

  if(!token){
    console.log("No token provided");
    return res.status(401).send("Unauthorized");
  }

  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (decoded.role !== "artist"){
      return res.status(403).json({message:"Forbidden: Only artists can create music entries"});
    }
  

  const {title} = req.body;
  const file = req.file;

  const result = await uploadFile(file.buffer.toString("base64"))

  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: decoded.id,
  })

  res.status(201).json({message:"Music created successfully", 
    music:{
      id: music._id,
      title: music.title,
      uri: music.uri,
      artist: music.artist,
    }
  })}
    catch(err){
    console.log(err);
    res.status(401).json({message:"Unauthorized! Invalid token"});
  }
}

module.exports = {
  createMusic,
}

