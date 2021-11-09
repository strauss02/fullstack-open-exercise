const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");
const {generateId, validateName} = require("../helpers/validate");
const { getAllContacts, getContactById, addContact } = require("../controller/contact");


const dataFilePath = path.resolve(__dirname, "../phoneBook.json");

// /api


//Get request for phoneBook data (3.1) + using extenal function that takes information from MongoDB(3.13) 
router.get('/persons', getAllContacts);

//Get request for phoneBook person data (3.3) + Get singel contact by id from mongoDB (3.13)
router.get('/persons/:id', getContactById);

//DELETE request by id (3.4)
router.delete("/persons/:id", (req, res) => {
    try {
        const reqId = req.params.id;
        const phoneBookData = JSON.parse(fs.readFileSync(dataFilePath));
        const newPhoneBookData = phoneBookData.filter((person) => Number(person.id) !== Number(reqId)); //Filter objects with the given id
        fs.writeFileSync(dataFilePath, JSON.stringify(newPhoneBookData));
        
        res.status(204).send(`Person ${reqId} is not on the list anymore!`).end();
    } catch (error) {
        throw {"status": error.status, "messege": error.messege};
    }
})

//Add a new person phone data gets in body {"phoneNumber": .... , "name": ....} (3.5 + 3.6) + Add new cintact to mongoDB (3.14)
router.post("/persons",addContact);


module.exports = router;