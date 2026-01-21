const Movie = require("../models/movie.model");
const movieService = require("../services/movie.service");
const {
  successResponseBody,
  errorResponseBody,
} = require("../utils/responsebody");

exports.createMovie = async (req, res) => {
  try {
    // create movie
    const movie = await movieService.createMovie(req.body);

    successResponseBody.data = movie;
    successResponseBody.message = "sucessfully created the movie";
    return res.status(201).json({
      successResponseBody,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errorResponseBody,
    });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const response = await movieService.deleteMovie(req.params.id);
    successResponseBody.data = response;
    successResponseBody.message = "sucessfully deleted the movie";

    res.status(200).json({
      successResponseBody,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errorResponseBody,
    });
  }
};

exports.getMovie = async (req, res) => {
  try {
    const response = await movieService.getMovieById(req.params.id);
    if (response.err) {
      errorResponseBody.err = response.err;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    return res.status(200).json(successResponseBody);
  } catch (err) {
    console.log(err);
    res.status(500).json({ errorResponseBody });
  }
};
