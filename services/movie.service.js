const Movie = require("../models/movie.model");
const { ErrorType } = require("../utils/enums");

//  data objects contained details  of the new movie to the created
//return the new movie objects is created  for this function 
const createMovie = async (data) => {
  try {
    const movie = await Movie.create(data);
    return movie;
  } catch (error) {
    if (error.name === ErrorType.Validation) {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      //   console.log(err);
      //   return { err: err, code: 422 };
      return {
        err,
        code: 422,
      };
    } else {
      // throw error;
      const movie = Movie.create(data);
      return movie;
    }
  }
};
//     const movie = Movie.create(data);
//     return movie;
// }

//id which will be used to identify  the movie id to be deleted 
// its return to the object containning for the detailas of the  movie is deleted
const deleteMovie = async (id) => {
  try {
    const response = await Movie.findByIdAndDelete(id);
    if (!response) {
      return {
        err: "No movie record  found for the id provided",
        code: 404,
      };
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
  return response;
};
// id used to the identify which the movie  to be fetch 
// its return containing object its movie is  fetched
const getMovieById = async (id) => {
  const movie = await Movie.findById(id);
  console.log("movie found", movie);
  if (!movie) {
    return {
      err: "No movie found for the corresponding id provided",
      code: 404,
      message: "something went wrong , unable to the fetch the movie",
      data: {},
    };
  }
  return movie;
};

// id which will be to the identify to the movie will be updateded
// data object that contaning  actual data which will be the updateded in data 
// The functions is returns new updated movie details 

const updateMovie = async (id, data) => {
  try {
    const movie = await Movie.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    return movie;
  } catch (error) {
    if (error.name === ErrorType.Validation) {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      console.log(err);
      return { err: err, code: 422 };
    } else {
      throw error;
    }
  }
};
//filter wil fetch us in filtering data based on the conditional
//return with objects conataning  all the movie fetched based on the filter 
const fetchMovies = async (filter) => {
  let query = {};
  if (filter.name) {
    query.name = filter.name;
  }
  let movies = await Movie.find(query);
  if (!movies) {
    return {
      err: "not able to find the queries movies",
      code: 404,
    };
  }
  return movies;
};

module.exports = {
  getMovieById,
  createMovie,
  deleteMovie,
  updateMovie,
  fetchMovies,
};
