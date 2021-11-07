const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");

// /api


//Get request for phoneBook data (3.1)
router.get('/persons', (req, res) => {
    const dataFilePath = path.resolve(__dirname, "../phoneBook.json");
    const phoneBookData = JSON.parse(fs.readFileSync(dataFilePath));
    res.json(phoneBookData);
})



module.exports = router;