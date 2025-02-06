const express = require("express");
// const {route}= require('../app.js')

const router = express.Router();

router.post("/signup", signup);

module.exports = router;
