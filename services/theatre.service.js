const Theatre = require("../models/theater.model");

const createTheatre = async (data) => {
  try {
    // console.log(data);
    const response = await Theatre.create(data);
    // console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = { createTheatre };
