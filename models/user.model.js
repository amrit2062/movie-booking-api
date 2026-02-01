const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please fill a valid email address",
      ],
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

    userStatus: {
      type: String,
      required: true,
      default: "APPROVED",
    },
  },
  {
    timestamps: true, // ✅ lowercase 'timestamps'
  },
);
userSchema.pre("save", async function () {
  // a  trigger to encrypt the  plain password before saving the user
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
}); 
const User = mongoose.model("User", userSchema);
module.exports = User;
