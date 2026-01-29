const { response } = require("express");
const theatreService = require("../services/theatre.service");
const {
  errorResponseBody,
  successResponseBody,
} = require("../utils/responsebody");

exports.create = async (req, res) => {
  try {
    const response = await theatreService.createTheatre(req.body);
    //console.log("hamro response -========", response)
    if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message =
        "Validation failed on few parameters of the request body  ";
      return res.status(response.code).json({ errorResponseBody });
    }
    successResponseBody.data = response;
    //console.log(successResponseBody.data);
    successResponseBody.message = "successfully created the theatre";
    return res.status(201).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
};

exports.destory = async (req, res) => {
  try {
    const response = await theatreService.deleteTheathre(req.params.id);
    if (response.err) {
      errorResponseBody.err = response.err;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = " successfully deleted the given theatre";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
};
exports.getTheatre = async (req, res) => {
  try {
    const response = await theatreService.getTheatre(req.params.id);
    if (response.err) {
      errorResponseBody.err = response.err;
      return res.status(response.code).json(errorResponseBody);
    }
    if (response.status == "404") {
      response.err;
    }

    successResponseBody.data = response;
    successResponseBody.message =
      "Successfully fetched the data of the theatre";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;

    return res.status(500).json(errorResponseBody);
  }
};

exports.getTheatres = async (req, res) => {
  try {
    const response = await theatreService.getAllTheatres(req.query);
    successResponseBody.data = response;
    successResponseBody.message = "Successfully fetched  all theatres";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
};

exports.updateTheatres = async (req, res) => {
  try {
    const response = await theatreService.updateTheatres(
      req.params.id,
      req.body,
    );
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
// theatre id :unique id of theatre for which we want to update movies
// moviesIds : array of movie ids are expected to be updated in theatre
//insert: boolean that tells wheather we want insert movies or remove them
// returns:  updated theatre objects
exports.updateMovies = async (req, res) => {
  try {
    const response = await theatreService.updateMovieTheatres(
      req.params.id,
      req.body.movieIds,
      req.body.insert,
    );
    if (response.err) {
      errorResponseBody.err = response.err;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message = " successfully updated movies in the theatre";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    console.log(error);
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
};

exports.getMovies = async (req, res) => {
  try {
    const response = await theatreService.getMoviesInTheatre(req.params.id);
    if (response.err) {
      errorResponseBody.err = response.err;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message =
      "Sucessfully fetched the movies for the theatre ";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
};

exports.checkMovie = async (req, res) => {
  try {
    const response = await theatreService.checkMovieInTheatre(
      req.params.theatreId,
      req.params.movieId,
    );
    if (response.err) {
      errorResponseBody.err = response.err;
      return res.status(response.code).json(errorResponseBody);
    }
    successResponseBody.data = response;
    successResponseBody.message =
      "Successfully checked if movies is present in the theatre ";
    return res.status(200).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
};
