const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const env = require("dotenv");
const mongoose = require("mongoose");

env.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/home", (req, res) => {
  return res.status(200).json({
    success: true,
    message: " welcome to the movie booking system develoed by amrit",
  });
});

app.listen(process.env.PORT, async () => {
  console.log(`server started on port ${process.env.PORT}!!`);
  try{
  await mongoose.connect(process.env.DB_URL); // connect to the  mongo server
  console.log("successfully connected mongodb");
  }
  catch(err){
    console.log("not able to  connect mongo", err);
  }
});
