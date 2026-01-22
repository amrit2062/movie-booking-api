const badRequestResponse = {
  success: false,
  err: "",
  data: {},
  message: "Malformed Request | bad request",
};

const validatedMovieCreateRequest = async (req, res, next) => {
  // validate the movie name
  if (!req.body.name) {
    badRequestResponse.err = "the name movie is not present in the request";
    return res.status(400).json({ badRequestResponse });
  }
  // validate the movie description
  if (!req.body.description) {
    badRequestResponse.err =
      "The description of the movie is not present in the request ";
    return res.status(400).json({ badRequestResponse });
  }
  //console.log(req.body.casts instanceof Array);
  // validate the movie casts
  if (
    !req.body.casts ||
    !(req.body.casts instanceof Array) ||
    req.body.casts.length <= 0
  ) {
    badRequestResponse.err =
      "The casts of  the movie is not presert in  the request";
    return res.status(400).json(badRequestResponse);
  }
  
  // validate director of the movie
  if (!req.body.director) {
    // if (!req.body.trailerUrl) {
      badRequestResponse.err =
        "The director of  movie is not present in the request";
      return res.status(400).json({ badRequestResponse });
    // }
  }

  // vaqlidate the trailer url
  if (!req.body.trailerUrl) {
    badRequestResponse.err =
      "The trailer of the movie is not present in the request";
    return res.status(400).json({ badRequestResponse });
  }
  // validate the relase data of the movie
  if (!req.body.releaseDate) {
    badRequestResponse.err =
      "The  movie relase date  is not present in the request";
    return res.status(400).json({ badRequestResponse });
  }

  next();
};

module.exports = { validatedMovieCreateRequest };
