const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const env = require("dotenv");
const mongoose = require("mongoose");
//const movie = require("./models/movie.model");
const routes = require("./routes/index");

env.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.set('debug', true);


// app.get("/home/:id", (req, res) => {
//   console.log(req.body,req.query,req.params);
app.get("/home", (req, res) => {
  return res.status(200).json({
    success: true,
    message: " welcome to the movie booking system develoed by amrit",
  });
}); 

// api routes 
app.use("/mba",routes);

app.listen(process.env.PORT, async () => {
  console.log(`server started on port ${process.env.PORT}!!`);
  try {
    await mongoose.connect(process.env.DB_URL); // connect to the  mongo server
    console.log("successfully connected mongodb");
    // await movie.create({
    //   name: "Bacchan Pandey",
    //   description: "comedy kabdi series ",
    //   casts: ["amrit", "thapa", "kc", "rai"],
    //   director: "rambabu rai",
    //   trailerUrl: "http://bacchanpandey/trailer/1",
    //   langauage: "Hindi",
    //   releaseDate: "18-03-2022",
    //   relaseStatus: "RELEASED",
    // });
  } catch (err) {
    console.log("not able to  connect mongo", err);
  }
});
