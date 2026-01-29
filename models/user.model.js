const mongoose = require("mongoose ");
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,

      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please fill a valid email address",
      ],
      lowercase:true,
      trim: true
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
    },
    userRole: {
      type: String,
      required: true,
      default: "CUSTOMER",
    },
    userstatus: {
      type: String,
      required: true,
      default: "APPROVED",
    },
  },
  { Timestamps: true },
);

const User = mongoose.model("User", userSchema);
module.exports = User;
