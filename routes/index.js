const express = require("express");
const router = express.Router();
// const MovieMiddlewares = require("../middlewares/movie.middleware");


const movieRoutes = require("./movie.route");



router.use("/api", movieRoutes);





module.exports = router;
