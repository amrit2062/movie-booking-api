const express = require("express");
const { signup } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router(); // routes function takes express app objext as parameter

router.post("/v1/auth/signup", authMiddleware.validateSignupRequest, signup);

module.exports = router;
