const {
  createMovie,
  deleteMovie,
  getMovie,
} = require("../controllers/movie.controller");

const express = require("express");

const router = express.Router();

router.post("/v1/movies", createMovie);
router.delete("/v1/movies/:id", deleteMovie);
router.get("/v1/movies/:id", getMovie);

module.exports = router;
