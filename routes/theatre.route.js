const theatreMiddleware = require("../middlewares/theatre.middleware");
const authMiddleware = require("../middlewares/auth.middleware");

const {
  create,
  destory,
  getTheatre,
  getTheatres,
  updateTheatres,
  updateMovies,
  getMovies,
  checkMovie
} = require("../controllers/theatre.controller");
const express = require("express");
const router = express.Router(); // routes function takes express app objects as parameter
const validator = require("../validators/theatre.validators");
const { getMovie } = require("../controllers/movie.controller");

router.post(
  "/v1/theatres",
  create,
  theatreMiddleware.validatedMovieCreateRequest,
); // create
router.get("/v1/theatres/:id", validator.getTheatreValidators, getTheatre); // read
router.delete("/v1/theatres/:id",authMiddleware.isAuthenticated,destory); //delete
router.get("/v1/theatres", getTheatres);
router.patch("/v1/theatres/:id", updateTheatres); // updated
router.put("/v1/theatres/:id", updateTheatres);

router.patch(
  "/v1/theatres/:id/movies",
  theatreMiddleware.validateUpdateMoviesRequest,
  validator.updateMoviesValidators,
  updateMovies,
);

router.get("/v1/theatres/:id/movies",getMovies)
router.get("/v1/theatres/:theatreId/movies/:movieId", checkMovie)


module.exports = router;
