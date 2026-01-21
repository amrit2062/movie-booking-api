const Movie = require("../models/movie.model");

const  createMovie = async(data)=>{
    const movie = Movie.create(data);
    return movie;
}
const deleteMovie = async(id)=>{
    const response = await Movie.findByIdAndDelete(id);
    return response 

}

const getMovieById = async (id) => {
  const movie = await Movie.findById(id);
  console.log("movie found", movie);
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

module.exports = { getMovieById ,createMovie,deleteMovie};
