//const MovieControlller = require("../controllers/movie.controller");
const MovieMiddlewares = require("../middlewares/movie.middleware");
const {
  createMovie,
  deleteMovie,
  getMovie,
  updateMovie,
  getMovies,
} = require("../controllers/movie.controller");

const express = require("express");
const router = express.Router(); // routes function takes express app objext as parameter

router.post(
  "/v1/movies",
  MovieMiddlewares.validatedMovieCreateRequest,
  createMovie,
); // create
router.delete("/v1/movies/:id", deleteMovie); // delete
router.get("/v1/movies/:id", getMovie); // read
router.put("/v1/movies/:id", updateMovie); // updated
router.patch("//v1/movies/:id", updateMovie);

router.get("/v1/movies", getMovies);

module.exports = router;
