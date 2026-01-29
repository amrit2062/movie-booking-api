const { Query } = require("mongoose");
const Theatre = require("../models/theater.model");
const { ErrorType } = require("../utils/enums");
const {
  errorResponseBody,
  successResponseBody,
} = require("../utils/responsebody");
const Movie = require("../models/movie.model");
// data objects conataiming details of the theatre to be created
// returns objects with new theatre details
const createTheatre = async (data) => {
  try {
    //console.log(data);
    //if (data.name.length < 5) return { err: "Invlid name length", code: 422 };
    const response = await Theatre.create(data);
    //console.log(error.err);
    return response;
  } catch (error) {
    let err = {};
    if (error.name === ErrorType.Validation) {
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });

      return { err: err, code: 422 };
    }
    console.log(error);
    throw err;
  }
};
// parmas id the unique  id using we can identify the theatre to be deleted
//returns  the deleted theatre objects

const deleteTheathre = async (id) => {
  try {
    const response = await Theatre.findByIdAndDelete(id);

    if (!response) {
      return {
        err: "No record of a theatre found for the given id",
        code: 404,
      };
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const getTheatre = async (id) => {
  try {
    const response = await Theatre.findById(id);
    if (!response) {
      // no record found for the given id
      return {
        err: "No theatre found for the given id",
        code: 404,
      };
    }
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// the data to be used to filter out  theatres based on city/pincode
// returns an object with the filtered content of theatre
const getAllTheatres = async (data) => {
  try {
    // const response = await Theatre.find({});
    // return response;
    let query = {};
    let pagination = {};

    if (data && data.city) {
      // This checks whather city is present in query params or not
      query.city = data.city;
    }
    if (data && data.pincode) {
      // This checks whather pincode is present in query params or not
      query.pincode = data.pincode;
    }

    if (data && data.name) {
      // this checks whather name is present  is query params or not
      query.name = data.name;
    }
    // console.log(query);
    // if(data && data.search){
    //   query.search = data.search

    // }

    if (data && data.movieId) {
      let movie = await Movie.findById(data.movieId);
      query.movies = { $all: movie };
    }
    if (data && data.limit) {
      pagination.limit = data.limit;
    }
    if (data && data.skip) {
      //  for first page we skip as 0
      let perPage = data.limit ? data.limit : 3;
      pagination.skip = data.skip * perPage;
    }
    const response = await Theatre.find(query, {}, pagination); // pincode:
    //console.log(response);
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// the   unique id to identify the theatre to be  updated
//  data  objects to be used to updates the theatre
// it returns the new updated theatre object
const updateTheatres = async (id, data) => {
  try {
    const response = await Theatre.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      // no record found for the given id
      return {
        err: "No theatre found for the given  id ",
        code: 404,
      };
    }
    return response;
  } catch (error) {
    if (error.name === ErrorType.Validation) {
      let err = {};
      Object.keys(error.errors).forEach((key) => {
        err[key] = error.errors[key].message;
      });
      return { err: err, code: 422 };
    }
    throw error;
  }
};
// theatreId => unique id of the thatre for which we want be the update  movies
// movieIds=> array of the movie ids that are expected to be the updated theatre
// insert=> boolean that tells wheather we want insert movies or remove thems
// returns => updated theatre object

const updateMovieTheatres = async (theatreId, movieIds, insert) => {
  // const theatre = await Theatre.findById(theatreId);
  // if (!theatre) {
  //   return {
  //     err: "No such theatre found for the id provided",
  //     code: 404,
  //   };
  try {
    let theatre;
    if (insert) {
      return await Theatre.findByIdAndUpdate(
        { _id: theatreId },
        //{$push: {movies:{$each: movieIds}}}// push is like normal push of the arrays
        { $addToSet: { movies: { $each: movieIds } } },
        { new: true },
      );
    } else {
      theatre = await Theatre.findByIdAndUpdate(
        { _id: theatreId },
        { $pull: { movies: { $in: movieIds } } },
        { new: true },
      );
    }
    //const theatre = await Theatre.findById(theatreId);
    return theatre.populate("movies");
  } catch (error) {
    if (error.name == "TypeError") {
      return {
        code: 404,
        err: "No theatre found for the given id",
      };
    }
    console.log("Error is ", error);
    throw error;
  }
};

//if (insert) {
// we need to add movies
//let previousMovies = new Set(theatre.movies)
//console.log(previousMovies);
// moviesIds.forEach((movieId) => {
//   if(previousMovies.has(movieId))
//   theatre.movies.push(movieId);
//});

//await Theatre.updateOne(
//{ _id: theatreId },
//{$push: {movies:{$each: movieIds}}}// push is like normal push of the arrays
// { $addToSet: { movies: { $each: movieIds } } },
// );
// await theatre.update({
//   $push: { movies: { $each: moviesIds }}
// });
//  } else {
// // we need to  remove movies
// let savedMoviesIds = theatre.movies;
// moviesIds.forEach((movieId) => {
//   savedMovieIds = savedMoviesIds.filter((smi) => smi == movieId);
// }) ;
//   // theatre.movies = savedMoviesIds;
//   await Theatre.updateOne(
//     { _id: theatreId },
//     { $pull: { movies: { $in: movieIds } } },
//   );
// }

//   const theatres = await Theatre.findById(theatreId);
//   // await theatre.save();
//   return theatre.populate("movies");
// };

const getMoviesInTheatre = async (id) => {
  try {
    const theater = await Theatre.findById(id, {
      name: 1,
      movies: 1,
      address: 1,
    }).populate("movies");
    if (!theater) {
      return {
        err: "No theater with the given id found",
        code: 404,
      };
    }
    return theater;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
const checkMovieInTheatre = async (theatreId, movieId) => {
  try {
    let response = await theater.findById(theatreId);
    if (!response) {
      return {
        err: "No such theatre  found for the given id",
        code: 404,
      };
    }

    return response.movies.indexOf(movieId);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  createTheatre,
  deleteTheathre,
  getTheatre,
  getAllTheatres,
  updateTheatres,
  updateMovieTheatres,
  getMoviesInTheatre,
  checkMovieInTheatre,
};
