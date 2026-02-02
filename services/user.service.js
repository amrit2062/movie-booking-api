const User = require("../models/user.model");
const{USER_STATUS,USER_ROLE} = require("../utils/constants")

exports.createUser = async (data) => {
  try {
    if (!data.userRole || data.userRole == USER_ROLE.customer) {
      if (data.userStatus && data.userStatus !== USER_STATUS.approved) {
        throw {
          err: "No cannot set for the another status for the customer ",
          code: 400,
        };
      }
    }
    if (data.userRole && data.userRole !== USER_ROLE.customer) {
      data.userStatus = USER_STATUS.painding;
    }

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
