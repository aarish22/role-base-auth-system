const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,},
  musics:[{
    type: mongoose.Schema.Types.ObjectId, // Array of ObjectIds referencing the Music model, indicating that an album can contain multiple music entries
    ref: "Music",
  }],
  artist: {
    type: mongoose.Schema.Types.ObjectId, // ObjectId referencing the User model, indicating that each album is associated with a user who is the artist
    ref: "User",
    required: true,
  }
})

const albumModel = mongoose.model("album", albumSchema);

module.exports = albumModel; // album.model.js defines the Mongoose schema and model for the Album collection in our MongoDB database. We specify the fields for title, musics, and artist, along with their data types and validation rules. The musics field is an array of ObjectIds that reference the Music model, indicating that an album can contain multiple music entries. The artist field is a reference to the User model, indicating that each album is associated with a user who is the artist. Finally, we create and export the albumModel to be used in other parts of our application for database operations related to albums.