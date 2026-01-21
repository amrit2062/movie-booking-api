
const errorResponseBody = {
  err: {},
  data: {},
  message: "Something went wrong cannot process the request",
  success: false,
};

const successResponseBody = {
  err: {},
  data: {},
  message: "Sucessfully process the request",
  success: false,
};

module.exports = {
    errorResponseBody,
    successResponseBody
}