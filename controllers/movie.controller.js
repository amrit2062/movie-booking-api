const Movie = require("../models/movie.model");
const movieService = require("../services/movie.service");

const errorResponseBody = {
  err: {},
  data: {},
  message: "Something went wrong cannot process the request",
  success: false,
};

const successResponseBody = {
  err: {},
  data: {},
  message: "Sucessfully process the request",
  success: false,
};
exports.createMovie = async (req, res) => {
  try {
    // create movie
    const movie = await Movie.create(req.body);
    return res.status(201).json({
      success: true,
      error: {},
      data: movie,
      message: "successfully created a new movie",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: {},
      data: {},
      message: "internal server error ",
    });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const response = await Movie.deleteOne({
      _id: req.params.movieId,
    });
    res.status(200).json({
      success: true,
      error:{},
    data:response,  
  message:"sucessfully deleted the movie"
});
    
  } catch (err) {
    console.log(err);
    res.status(500).json({
      sucess: false,
      error: {},
      data: {},
      message: "sometime went wrong ",
    });
  }
};

exports.getMovie = async (req, res) => {
  try {
    const response = await movieService.getMovieById(req.params.id);
    if (!response) {
      errorResponseBodyesponseBody.err = response.err;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    return res.status(200).json(successResponseBody);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorResponseBody });
  }
};
