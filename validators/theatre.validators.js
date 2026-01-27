const { param, body } = require("express-validator");
const { validationResult } = require("express-validator");
const verify = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};
exports.updateMoviesValidators = [
  param("id").isMongoId().withMessage("Invalid theatre id"),

  body("movieIds")
    .isArray({ min: 1 })
    .withMessage("movieIds must be a non-empty array"),
  body("movieIds.*").isMongoId().withMessage("Invalid movie id"),
  body("insert").isBoolean().withMessage("insert must be true or false"),

  verify,
];

exports.getTheatreValidators = [
  param("id").isMongoId().withMessage("invalid theatre id"),
  verify,
];
