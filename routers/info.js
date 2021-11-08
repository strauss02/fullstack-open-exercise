const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");
const moment = require("moment");

// /info


//Get request for phoneBook info & request time (3.2)
router.get("/", (req, res) => {
    const dataFilePath = path.resolve(__dirname, "../phoneBook.json");
    const phoneBookData = JSON.parse(fs.readFileSync(dataFilePath));
    
    res.send(`<p>PhoneBook has info for ${phoneBookData.length} people</p>
    <p>${moment().format('llll')}</p>`);
});


module.exports = router;