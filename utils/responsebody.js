
// This object will be  used as a tmplate for the error responses
const errorResponseBody = {
  err: {},
  data: {},
  message: "Something went wrong cannot process the request",
  success: false,
};
// This object will be used as a template for the success responses
const successResponseBody = {
  success: true,
  message: "Sucessfully process the request",
  data: {},
};

module.exports = {
  errorResponseBody,
  successResponseBody,
};
