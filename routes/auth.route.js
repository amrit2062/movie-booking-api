const express = require("express");
const { signup,signin, resetPassword } = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router(); // routes function takes express app objext as parameter

router.post("/v1/auth/signup", authMiddleware.validateSignupRequest, signup);
router.post("/v1/auth/signin",  authMiddleware.validateSigninRequest,signin)
router.patch("/v1/auth/reset",authMiddleware.isAuthenticated,authMiddleware.valiadateResetPasswordRequest,resetPassword);
module.exports = router;
