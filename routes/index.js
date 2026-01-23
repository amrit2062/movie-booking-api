const express = require("express");
const router = express.Router();

const movieRoutes = require("./movie.route");
const theatreRoutes = require("./theatre.route");



router.use("/api", movieRoutes);
router.use("/api",theatreRoutes)





module.exports = router;
