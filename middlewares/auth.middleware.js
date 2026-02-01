const { errorResponseBody } = require("../utils/responsebody");

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

module.exports = {
    validateSignupRequest 
}
