const express = require('express');
const router = express.Router();
const path = require("path");
const fs = require("fs");
const {generateId, validateName} = require("../helpers/validate");
const {getAllContacts} = require("../controller/contact");


const dataFilePath = path.resolve(__dirname, "../phoneBook.json");

// /api


//Get request for phoneBook data (3.1) + using extenal function that takes information from MongoDB(3.13) 
router.get('/persons', getAllContacts);

//Get request for phoneBook person data (3.3)
router.get('/persons/:id', (req, res) => {
    try {
        const reqId = req.params.id;
        const phoneBookData = JSON.parse(fs.readFileSync(dataFilePath));
        for (const person of phoneBookData) {
            //If the ID matches, you will return the object that match in the phonebook
            if (Number(person.id) === Number(reqId)) {
                res.json(person);
            }
        }
        throw {"status": 404, "messege":  `bad request - no person with ID ${reqId}`};
    } catch (error) {
        throw {"status": error.status, "messege": error.messege};
    }
})

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

//Add a new person phone data gets in body {"phoneNumber": .... , "name": ....} (3.5 + 3.6)
router.post("/persons", (req, res) => {
    try {
        const name = req.body.name;
        const phoneNumber = req.body.phoneNumber;
        //Check if one of the details has not been entered 
        if (!name || !phoneNumber) {
            throw {"status": 400, "messege": "Must enter name and number"};
        }
        const id = generateId(); //Generate a unique id by using an external function
        const phoneBookData = JSON.parse(fs.readFileSync(dataFilePath));
        //Check if the name is unique base on "validateName" function
        if (!validateName(name, dataFilePath)) {
            throw {"status": 400, "messege": `The name ${name} is not available, try another name`};
        }
        phoneBookData.push({"id": id, "name": name, "number": phoneNumber}); //Add new phone data
        fs.writeFileSync(dataFilePath, JSON.stringify(phoneBookData)); //Update data on the file
        res.send(true).end();
    } catch (error) {
        throw {"status": error.status, "messege": error.messege};
    }
})


module.exports = router;