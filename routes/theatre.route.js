const theatreMiddleware = require("../middlewares/theatre.middleware");

const { create, destory, getTheatre, getTheatres, updateTheatres,updateMovies } = require("../controllers/theatre.controller");
const express = require("express");
const router = express.Router(); // routes function takes express app objects as parameter

router.post(
  "/v1/theatres",
  create,
  theatreMiddleware.validatedMovieCreateRequest,
); // create
router.get("/v1/theatres/:id",getTheatre) // read 
router.delete("/v1/theatres/:id",destory); //delete
router.get("/v1/theatres",getTheatres);
router.patch("/v1/theatres/:id",updateTheatres); // updated
router.put("/v1/theatres/:id",updateTheatres);


router.patch("/v1/theatres/:id/movies",theatreMiddleware.validateUpdateMoviesRequest,updateMovies)





module.exports = router;
