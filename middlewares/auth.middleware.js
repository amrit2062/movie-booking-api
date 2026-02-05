const { errorResponseBody } = require("../utils/responsebody");
//validatiors in user signup
// res=> http request object
//req=> http request object
//next=> next middleware

const validateSignupRequest = async (req, res, next) => {
  //validate name of the user
  if (!req.body.name) {
    errorResponseBody.err = "Name of the user not present in the request";
    return res.status(400).json(errorResponseBody);
  }

  ///validate the email of the user
  if (!req.body.email) {
    errorResponseBody.err = "Email ot the user not present in the request";
    return res.status(400).json(errorResponseBody);
  }
  //validate the password of the user
  if (!req.body.password) {
    errorResponseBody.err = "Password of the user not  present in the request";
    return res.status(200).json(errorResponseBody);
  }
  // request is valid
  next();
};
//validatiors in user signin
// res=> http request object
//req=> http request object
//next=> next middleware

const validateSigninRequest = async (req, res, next) => {
  //validate for the user email
  if (!req.body.email) {
    errorResponseBody.err = "No provided for  sign in";
    return res.status(400).json(errorResponseBody);
  }
  // validate for the  password presence
  if (!req.body.password) {
    errorResponseBody.err = "No Password provided for signin";
    return res.status(400).json(errorResponseBody);
  }

  //request is valid 
  next();
};
module.exports = {
  validateSignupRequest,
  validateSigninRequest,
};
