const user = require("../models/user.model");
const userService = require("../services/user.service");
const {
  errorResponseBody,
  successResponseBody,
} = require("../utils/responsebody");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const response = await userService.createUser(req.body);
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.AUTH_KEY,
      {expiresIn:'1h'}
    );
    console.log(jwt.verify(token,process.env.AUTH_KEY));

    successResponseBody.data = response;
    successResponseBody.token = token;
    successResponseBody.message = " successfully registered  a user";

    return res.status(201).json(successResponseBody);
  } catch (error) {
    console.log(error);
    errorResponseBody.err = error;
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
};
exports.signin = async (req, res) => {
  try {
    const email = req.body.email.toLowerCase().trim();

    const user = await userService.getUserByEmail(email);

    //  FIX: call instance method on user
    const isValidPassword = await user.isValidPassword(req.body.password);
    if (!isValidPassword) {
      throw { err: "Invalid password for the given email", code: 401 };
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.AUTH_KEY,
      {expiresIn:'1h'}
    );
   // console.log(jwt.verify(token, process.env.AUTH_KEY));

    successResponseBody.message = "Successfully logged in";
    successResponseBody.data = {
      email: user.email,
      role: user.userRole, // fixed
      status: user.userStatus, //  fixed
      token: token,
    };

    return res.status(200).json(successResponseBody);
  } catch (error) {
    if (error.err) {
      errorResponseBody.err = error.err;
      return res.status(error.code).json(errorResponseBody);
    }

    console.log(error);
    errorResponseBody.err = "Internal server error";
    return res.status(500).json(errorResponseBody);
  }
};
