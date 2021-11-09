const express = require('express');
const router = express.Router();
const { getInfo } = require("../controller/contact");

// /info

//Get request for phoneBook info & request time (3.2) + Get info from mongoDB (3.13)
router.get("/", getInfo);


module.exports = router;