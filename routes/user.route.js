const { update } = require("../controllers/user.controller");

const express = require("express");
const router = express.Router();

router.patch("/v1/user/:id", update);

module.exports = router;
