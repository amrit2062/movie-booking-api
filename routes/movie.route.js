const { createmovie } = require("../controllers/movie.controller");

const express = require("express");
const router = express.Router();

router.post("/v1/movies", createmovie);

module.exports = router;
