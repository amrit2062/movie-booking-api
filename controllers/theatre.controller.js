const theatreService = require("../services/theatre.service");
const {
  errorResponseBody,
  successResponseBody,
} = require("../utils/responsebody");

exports.create = async (req, res) => {
  try {
    const response = await theatreService.createTheatre(req.body);
    //console.log(response);
    successResponseBody.data = response;
    //console.log(successResponseBody.data);
    successResponseBody.message = "successfully created thr theatre";
    return res.status(201).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
};
