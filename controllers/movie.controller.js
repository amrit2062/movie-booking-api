const Movie = require("../models/movie.model");

exports.createmovie = async (req, res) => {
  try {
    // create movie
    const movie = await Movie.create(req.body);
    return res.status(201).json({
      success: true,
      error: {},
      data: movie,
      message: "successfully created a new movie",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      error: {},
      data: {},
      message: "internal server error ",
    });
  }
};
