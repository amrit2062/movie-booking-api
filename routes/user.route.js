const { update } = require("../controllers/user.controller");
const userMiddleware = require("../middlewares/user.middleware");

const express = require("express");
const router = express.Router();

router.patch("/v1/user/:id", userMiddleware.valiadateUpdateUserRequest, update);

module.exports = router;
