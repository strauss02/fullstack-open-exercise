const Contact = require("../models/contact");
const moment = require("moment");

//Get All contacts
exports.getAllContacts = async (req, res, next) => {
  try {
    await Contact.find({})
      .then((phoneBookData) => res.json(phoneBookData))
      .catch((error) => {
        next({ status: 500, messege: "Can't get the phonebook" });
      });
  } catch (error) {
    next({ status: error.status, messege: error.messege });
  }
};

//Get All names
exports.isNameThere = async (req, res, next) => {
  try {
    const { name } = req.params;
    await Contact.find({ name })
      .then((nameData) => {
        if (nameData.length > 0) res.status(200).send(true);
        else res.send(false);
      })
      .catch((error) => {
        next({ status: error.status, messege: error.messege });
      });
  } catch (error) {
    next({ status: error.status, messege: error.messege });
  }
};

//Get contact by id
exports.getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Contact.find({ _id: id })
      .then((phoneBookContact) => res.json(phoneBookContact))
      .catch((error) => {
        next({ status: 404, messege: `bad request - no person with ID ${id}` });
      });
  } catch (error) {
    next({ status: error.status, messege: error.messege });
  }
};

//Get info about phoneBook
exports.getInfo = async (req, res, next) => {
  try {
    await Contact.find({})
      .then((phoneBookData) => {
        res.json({
          peopleNum: `PhoneBook has info for ${phoneBookData.length} people`,
          date: `${moment().format("llll")}`,
        });
      })
      .catch((error) => {
        next({ status: error.status, messege: error.messege });
      });
  } catch (error) {
    next({ status: error.status, messege: error.messege });
  }
};

// Add a new contact by "name" and "number"
exports.addContact = async (req, res, next) => {
  try {
    const { name, phoneNumber } = req.body;
    //Check if one of the details has not been entered
    if (!name || !phoneNumber) {
      next({ status: 400, messege: "Must enter name and number" });
    }
    const contact = new Contact({ name, number: phoneNumber });
    contact
      .save()
      .then((savedContact) => res.status(200).send(true))
      .catch((error) => {
        next({
          status: 400,
          messege:
            "Can't add new contact, number has to have 8 digits, name has to have 3 letters",
        });
      });
  } catch (error) {
    next({ status: error.status, messege: error.messege });
  }
};

//Update contact phone number by name
exports.updateContact = async (req, res, next) => {
  try {
    const { name, phoneNumber } = req.body;
    //Check if one of the details has not been entered
    if (!name || !phoneNumber) {
      next({ status: 400, messege: "Must enter name and number" });
    }
    Contact.findOneAndUpdate({ name }, { number: phoneNumber })
      .then((savedContact) => res.status(200).send(true))
      .catch((error) => {
        next({
          status: 400,
          messege: "Can't update contact, try to choose another name or number",
        });
      });
  } catch (error) {
    next({ status: error.status, messege: error.messege });
  }
};

//Delete contact from phoneBook by id
exports.deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(id);
    Contact.deleteOne({ _id: id })
      .then(() =>
        res.status(204).send(`Person ${id} is not on the list anymore!`)
      )
      .catch((error) => {
        console.log(error);
        next({ status: 400, messege: "Can't delete contact" });
      });
  } catch (error) {
    next({ status: error.status, messege: error.messege });
  }
};
