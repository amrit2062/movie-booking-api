const errorResponseBody = {
  err: {},
  data: {},
  message: "Something went wrong cannot process the request",
  success: false,
};

const successResponseBody = {
  success: true,
  message: "Sucessfully process the request",
  data: {},
};

module.exports = {
  errorResponseBody,
  successResponseBody,
};
