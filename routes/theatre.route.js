const theatreMiddleware = require("../middlewares/theatre.middleware");

const { create, destory, getTheatre, getTheatres } = require("../controllers/theatre.controller");
const express = require("express");
const router = express.Router();

router.post(
  "/v1/theatres",
  create,
  theatreMiddleware.validatedMovieCreateRequest,
);
router.get("/v1/theatres/:id",getTheatre)
router.delete("/v1/theatres/:id",destory);
router.get("/v1/theatres",getTheatres);

module.exports = router;
