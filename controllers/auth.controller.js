const userService = require("../services/user.service");
const {
  errorResponseBody,
  successResponseBody,
} = require("../utils/responsebody");

exports.signup = async (req, res) => {
  try {
    const response = await userService.createUser(req.body);

    successResponseBody.data = response;
    successResponseBody.message = " successfully registered  a user";
    return res.status(201).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
};
