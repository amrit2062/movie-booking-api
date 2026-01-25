const { errorResponseBody } = require("../utils/responsebody");

//  HTTP request object
//HTTP response object
// next middleware function
// whether the request is valid or not
const validatedMovieCreateRequest = async (req, res, next) => {
  // valadation of name
  if (!req.body.name) {
    errorResponseBody.message =
      "The name of the theatre is not present in the request";
    return res.status(400).json({ errorResponseBody });
  }
  // validate the present of pincode
  if (!req.body.pincode) {
    errorResponseBody.message =
      "The name of the theatre is not present in the  request";
    return res.status(400).json({ errorResponseBody });
  }
  // validation  for the presence of city
  if (!req.body.city) {
    errorResponseBody.message = "The city of the theatre is not present ";
    return res.status(400).json(errorResponseBody);
  }
  next(); // everything is fine to the next middleware
};
const validateUpdateMoviesRequest = async (req, res, next) => {
  //validation of insert parameter
  if (req.body.insert == undefined) {
    errorResponseBody.message =
      "The insert parameter in missing in the request";
    return res.status(400).json(errorResponseBody);
  }
  // validate movieIds presence
  if (!req.body.movieIds) {
    errorResponseBody.message =
      " No movies present in the request to be updated in theatre";
    return res.status(400).json(errorResponseBody);
  } // validate if movieIds is an array or not
  if (!(req.body.movieIds instanceof Array)) {
    errorResponseBody.message =
      "Expected array of movies but found something else ";
    return res.status(400).json(errorResponseBody);
  }
  //validate if movieids is empty or not
  if (req.body.movieIds.length == 0) {
    errorResponseBody.message = "No movies present in the array provided";
    return res.status(400).json(errorResponseBody);
  }
  // everything is fine
  next();
};

module.exports = { validatedMovieCreateRequest,validateUpdateMoviesRequest};
