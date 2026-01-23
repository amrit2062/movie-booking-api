const theatreService = require("../services/theatre.service");
const {
  errorResponseBody,
  successResponseBody,
} = require("../utils/responsebody");

exports.create = async (req, res) => {
  try {
    const response = await theatreService.createTheatre(req.body);
    //console.log("hamro response -========", response)
       if (response.err) {
      errorResponseBody.err = response.err;
      errorResponseBody.message =
        "Validation failed on few parameters of the request body  ";
      return res.status(response.code).json({ errorResponseBody });
    }
    successResponseBody.data = response;
    //console.log(successResponseBody.data);
    successResponseBody.message = "successfully created the theatre";
    return res.status(201).json(successResponseBody);
  } catch (error) {
    errorResponseBody.err = error;
    return res.status(500).json(errorResponseBody);
  }
};
