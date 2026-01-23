const mongoose = require("mongoose");

// the schema is the theater to store dn

const theatreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: 5,
    },
    description: String,
    city: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    address: String,
  },
  { timestamps: true },
);

const Theatre = mongoose.model("theater", theatreSchema); // create a new  model
module.exports = Theatre; // returing the model
