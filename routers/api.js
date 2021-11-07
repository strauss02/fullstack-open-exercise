const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");
const { throws } = require('assert');

// /api


//Get request for phoneBook data (3.1)
router.get('/persons', (req, res) => {
    const dataFilePath = path.resolve(__dirname, "../phoneBook.json");
    const phoneBookData = JSON.parse(fs.readFileSync(dataFilePath));
    res.json(phoneBookData);
})

//Get request for phoneBook person data (3.3)
router.get('/persons/:id', (req, res) => {
    const reqId = req.params.id;
    const dataFilePath = path.resolve(__dirname, "../phoneBook.json");
    const phoneBookData = JSON.parse(fs.readFileSync(dataFilePath));
    for (const person of phoneBookData) {
        if (Number(person.id) === Number(reqId)) {
            res.json(person);
        }
    }
    //TODO - error handler & throw error here
    res.status(400).send(`Error : bad request - no person with ID ${reqId}`);
})

//DELETE request by id (3.4)
router.delete("/persons/:id", (req, res) => {
    try {
        const reqId = req.params.id;
        const dataFilePath = path.resolve(__dirname, "../phoneBook.json");
        const phoneBookData = JSON.parse(fs.readFileSync(dataFilePath));
        console.log(phoneBookData);
        const newPhoneBookData = phoneBookData.filter((person) => Number(person.id) !== Number(reqId));
        console.log(newPhoneBookData);
        fs.writeFileSync(dataFilePath, JSON.stringify(newPhoneBookData));
        
        res.status(200).send(`Person ${reqId} is not on the list anymore!`).end();
    } catch (error) {
        throw {"status": error.status, "messege": error.messege};
    }
})



module.exports = router;