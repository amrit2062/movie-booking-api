const Movie = require("../models/movie.model");
const movieService = require("../services/movie.service");
const {
  successResponseBody,
  errorResponseBody,
} = require("../utils/responsebody");

exports.createMovie = async (req, res) => {
  try {
    // create movie
    const response = await movieService.createMovie(req.body);
    if (response.err) {
      ((errorResponseBody.err = response.err),
        (errorResponseBody.err = response.code),
        (errorResponseBody.message =
          "validation failed on few parameters of the request body "));

      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
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

exports.updateMovie = async (req, res) => {
  try {
    const response = await movieService.updateMovie(req.params.id, req.body);
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message =
        "the update that  we are trying to apply does not validated the schema ";
      return res.status(response.code).json({ errorResponseBody });
    }
    successResponseBody.data = response;
    return res.status(200).json({ successResponseBody });
  } catch (err) {
    console.log(err);
    errorResponseBody.err = err;
    res.status(500).json({ errorResponseBody });
  }
};

exports.getMovies = async (req, res) => {
  try {
    const response = await movieService.fetchMovies(req.query);
    if (response.error) {
      errorResponseBody.err = response.err;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    return res.status(200).json(successResponseBody);
  } catch (error) {
    console.log(error);
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
};
