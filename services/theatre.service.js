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

const deleteTheathre = async (id) => {
  try {
    const response = await Theatre.findByIdAndDelete(id);

    if (!response) {
      return {
        err: "No record of a theatre found for the given id",
        code: 404,
      };
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const getTheatre = async (id) => {
  try {
    const response = await Theatre.findById(id);
    if (!response) {
      // no record found for the given id
      return {
        err: "No theatre found for the given id",
        code: 404,
      };
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getAllTheatres = async () => {
  try {
    const response = await Theatre.find({});
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = { createTheatre, deleteTheathre, getTheatre, getAllTheatres };
