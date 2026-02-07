const jwt = require("jsonwebtoken");
const { errorResponseBody } = require("../utils/responsebody");
const userService = require("../services/user.service");
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


  const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];

    if (!token) {
      return res.status(403).json({ err: "No token provided" });
    }

    const decoded = jwt.verify(token, process.env.AUTH_KEY);

    const user = await userService.getUserById(decoded.id);

    req.userId = user._id;   // FIXED
    next();

  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ err: error.message });
    }

    if (error.code === 404) {
      return res.status(404).json({ err: "User does not exist" });
    }

    return res.status(500).json({ err: "Authentication failed" });
  }
};

  
module.exports = {
  validateSignupRequest,
  validateSigninRequest,
  isAuthenticated,
};
