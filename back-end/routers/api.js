const express = require('express')
const router = express.Router()

const { getAllContacts, getContactById, addContact, deleteContact, isNameThere, updateContact } = require('../controller/contact')
const { validatePhoneNumber } = require('../middlewares/validator')
// /api


//Get request for phoneBook data (3.1) + using extenal function that takes information from MongoDB(3.13)
router.get('/persons', getAllContacts)

//Get request for phoneBook person data (3.3) + Get singel contact by id from mongoDB (3.13)
router.get('/persons/:id', getContactById)

//Rerurn  true / false if name exsists
router.get('/persons/names/:name', isNameThere)

//DELETE request by id (3.4) + + Delete contact by id from mongoDB (3.15)
router.delete('/persons/:id', deleteContact)

//Add a new person phone data gets in body {"phoneNumber": .... , "name": ....} (3.5 + 3.6) + Add new contact to mongoDB (3.14)
router.post('/persons',validatePhoneNumber,addContact)

//Update contact phone number by name
router.put('/persons',validatePhoneNumber, updateContact)

module.exports = router