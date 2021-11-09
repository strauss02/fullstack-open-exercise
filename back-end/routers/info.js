const express = require('express');
const router = express.Router();
const { getInfo } = require("../controller/contact");

// /info

//Get request for phoneBook info & request time (3.2)
router.get("/", getInfo);


module.exports = router;