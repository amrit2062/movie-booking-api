//const MovieControlller = require("../controllers/movie.controller");
const MovieMiddlewares = require("../middlewares/movie.middleware")

const {createMovie,
  deleteMovie, 
  getMovie,
  updateMovie,
} = require("../controllers/movie.controller");

const express = require("express");

const router = express.Router();

router.post("/v1/movies",MovieMiddlewares.validatedMovieCreateRequest,createMovie);
router.delete("/v1/movies/:id", deleteMovie);
router.get("/v1/movies/:id", getMovie);
router.put("/v1/movies/:id",updateMovie);
router.patch("//v1/movies/:id",updateMovie);




module.exports = router;