const Theatre = require("../models/theater.model");
const { ErrorType } = require("../utils/enums");
// data objects conataiming details of the theatre to be created
// returns objects with new theatre details
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
// parmas id the unique  id using we can identify the theatre to be deleted
//returns  the deleted theatre objects

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

// the data to be used to filter out  theatres based on city/pincode
// returns an object with the filtered content of theatre
const getAllTheatres = async () => {
  try {
    const response = await Theatre.find({});
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// the   unique id to identify the theatre to be  updated
//  data  objects to be used to updates the theatre
// it returns the new updated theatre object
const updateTheatres = async (id, data) => {
  try {
    const response = await Theatre.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      // no record found for the given id
      return {
        err: "No theatre found for the given  id ",
        code: 404,
      };
    }
    return response
  } catch (error) {
    if (error.name === ErrorType.Validation) {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      return { err: err, code: 422 };
    }
    throw error;
  }
};


module.exports = { createTheatre, deleteTheathre, getTheatre, getAllTheatres,updateTheatres};
