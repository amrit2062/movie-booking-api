const mongoose = require("mongoose");

//  the schema of the movie resource to be stored in the db

const movieSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 2,
    },
    description: {
      type: String,
      required: true,
      minLength: 5,
    },
    casts: {
      type: [String],
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    trailerUrl: {
      type: String,
      required: true,
    },
    langauage: {
      type: String,
      required: true,
      default: "english",
    },
    releaseDate: {
      type: String,
      required: true,
    },

    relaseStatus: {
      type: String,
      required: true,
      default: "RELEASED",
    },
   
  },
  { timestamps: true },
);

const Movie = mongoose.model("Movie", movieSchema); // create a new model
module.exports = Movie; // returing the model
