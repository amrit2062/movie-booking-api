//const MovieMiddlewares = require("../middlewares/movie.middleware")

const { create } = require("../controllers/theatre.controller");
const express = require("express");
const router = express.Router();



router.post("/v1/theaters", create);





module.exports = router;
