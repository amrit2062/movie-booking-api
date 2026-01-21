const Movie = require("../models/movie.model");

const getMovieById = async (id) => {
  const movie = Movie.findById(id);
  console.log("movie found", movie.id);
  if (!movie) {
    return {
      err: "No movie found for the corresponding id provided",
      code: 404,
      message: "something went wrong , unable to the fetch the movie",
      data: {},
    };
  }
  return movie;
};

module.exports = { getMovieById };
