const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { USER_STATUS, USER_ROLE } = require("../utils/constants");
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
      enum: {
        values: [USER_ROLE.customer, USER_ROLE.admin, USER_ROLE.client],
        message: "Invalid user role for given  ",
      },
      default: USER_ROLE.customer,
    },

    userStatus: {
      type: String,
      required: true,
      enum: {
        values: [
          USER_STATUS.approved,
          USER_STATUS.painding,
          USER_STATUS.rejected,
        ],
        message: "Invalid the user status for the given",
      },

      default: USER_STATUS.approved,
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
