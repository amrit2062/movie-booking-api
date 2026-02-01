
const express = require("express");
const { signup } = require("../controllers/auth.controller");
const router = express.Router(); // routes function takes express app objext as parameter

router.post(
  "/v1/auth/signup",
  signup,
);


 module.exports = router ;