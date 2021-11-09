const Contact = require("../models/contact");

//Get All contacts
exports.getAllContacts = async (req, res) => {
    try {
        const phoneBookData = await Contact.find({});
        res.json(phoneBookData);
    } catch (error) {
        throw {"status": error.status, "messege": error.messege};
    }
}