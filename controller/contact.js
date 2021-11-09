const Contact = require("../models/contact");

//Get All contacts
exports.getAllContacts = async (req, res) => {
    try {
        await Contact.find({})
        .then((phoneBookData) => res.json(phoneBookData))
        .catch((error) => res.status(error.status).send(error.messege));
         
    } catch (error) {
        throw {"status": error.status, "messege": error.messege};
    }
}

//Get contact by id
exports.getContactById = async (req, res) => {
    try {
        const { id } = req.params;
        await Contact.find({_id: id})
        .then((phoneBookContact) => res.json(phoneBookContact))
        .catch(() => {
            res.status(404).send({"messege":  `bad request - no person with ID ${id}`});
        });
    } catch (error) {
        throw {"status": error.status, "messege": error.messege};
    }
}

