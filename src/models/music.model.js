const mongoose= require('mongoose');


const musicSchema = new mongoose.Schema({
  uri:{
      type:String,
      required:true,
  },
  title:{
    type:String,
    required:true
  },
  artist:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User", // Reference to the User model, assuming artists are users in the system 
    required:true, 
  }
})

const musicModel = mongoose.model("Music", musicSchema);

module.exports = musicModel; // music.model.js defines the Mongoose schema and model for the Music collection in our MongoDB database. We specify the fields for uri, title, and artist, along with their data types and validation rules. The artist field is a reference to the User model, indicating that each music entry is associated with a user who is the artist. Finally, we create and export the musicModel to be used in other parts of our application for database operations related to music entries.