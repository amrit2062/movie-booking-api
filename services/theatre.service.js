const Theatre = require("../models/theater.model");
const { ErrorType } = require("../utils/enums");

const createTheatre = async (data) => {
  try {
    //console.log(data);
    //if (data.name.length < 5) return { err: "Invlid name length", code: 422 };
    const response = await Theatre.create(data);
    //console.log(error.err);
    return response;
  } catch (error) {
    let err = {};
    if (error.name === ErrorType.Validation) {
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });

      return { err: err, code: 422 };
    }
    console.log(error);
    throw err;
  }
};

module.exports = { createTheatre };
