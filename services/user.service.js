const User = require("../models/user.model");

exports.createUser = async (data) => {
  try {
    const response = await User.create(data);
    console.log(response);
    return response;
  } catch (error) {
    //console.log(error);
    if (error.name === "validatorError") {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      throw { err: err, code: 422 };
    }
    throw error;
  }
};
