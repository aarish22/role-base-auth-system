const musicModel = require("../models/music.model");
const {uploadFile} = require("../services/storage.service");
const albumModel = require("../models/album.model");
const jwt = require("jsonwebtoken");


async function createMusic(req,res) {

  const {title} = req.body;
  const file = req.file;

  const result = await uploadFile(file.buffer.toString("base64"))

  const music = await musicModel.create({
    uri: result.url,
    title,
    artist: req.user.id,
  })

  res.status(201).json({message:"Music created successfully", 
    music:{
      id: music._id,
      title: music.title,
      uri: music.uri,
      artist: music.artist,
    }
  })}

async function createAlbum(req,res) {
    const {title, musicIds} = req.body;

    const album = await albumModel.create({
      title,
      musics: musicIds,
      artist: req.user.id, // Assuming the authenticated user's ID is available in req.user.id, which is set by the authentication middleware. This associates the created album with the artist who is currently logged in.
    })
    res.status(201).json({message:"Album created successfully", 
      album:{
        id: album._id,
        title: album.title,
        musics: album.musics,
        artist: album.artist,
      }
    })
  }

async function getAllMusics(req,res){
  const musics = await musicModel.find().limit(20) // Limit the number of music entries returned to 20 for performance reasons. This helps prevent overwhelming the client with too much data and allows for faster response times, especially if the database contains a large number of music entries. You can adjust this limit as needed based on your application's requirements and expected data volume.

  res.status(200).json({musics})
}

async function getAllAlbums(req,res){
  const albums = await albumModel.find().limit

  res.status(200).json({albums})
}

module.exports = {
  createMusic,createAlbum,getAllMusics,getAllAlbums
}