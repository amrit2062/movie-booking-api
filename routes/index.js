const express = require("express");
const router = express.Router();

const movieRoutes = require("./movie.route");
const theatreRoutes = require("./theatre.route");
const authRoutes = require("./auth.route");
const userRoutes = require('./user.route');



router.use("/api", movieRoutes);
router.use("/api",theatreRoutes);
router.use("/api",authRoutes);
router.use('/api',userRoutes);






module.exports = router;
