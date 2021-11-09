"use strict";
const express = require("express");
const apiRouter = express.Router();
const fs = require("fs");
const path = require("path");
const {
  middlewareMissingNameOrNumber,
  middlewareNameAlreadyExist,
  middlewareNameNotExist,
} = require("../middleware/errorhandle");
const mongoose = require("mongoose");
const { Contact } = require("./mongodb");

/*
    get database
*/
function returnDataBase() {
  let dataBase = fs.readFileSync(
    path.resolve(__dirname, "../../database.json")
  );
  let dataBaseJson = JSON.parse(dataBase.toString());
  return dataBaseJson;
}

/*
        save database
    */
function saveDataBase(dataBaseJson) {
  fs.writeFileSync("database.json", Buffer.from(JSON.stringify(dataBaseJson)));
}

/*
  create new id
*/
function returnID() {
  let database = returnDataBase();
  let currentId = Math.floor(Math.random() * 200);
  if (database.find(({ id }) => id === currentId)) {
    returnID();
  } else {
    return currentId;
  }
}

/*
  create new contact
*/
class Person {
  constructor(name, phoneNumber) {
    this.id = returnID();
    this.name = name;
    this.number = phoneNumber;
  }
}

apiRouter.get("/persons", (req, res) => {
  Contact.find()
    .then((dataBase) => {
      res.json(dataBase);
    })
    .catch((err) => {
      res
        .status(404)
        .json({ message: "had problems loading contacts", status: 404 });
    });
});

apiRouter.get("/persons/:id", (req, res) => {
  Contact.findById(req.params.id)
    .then((dataBase) => {
      res.json(dataBase);
    })
    .catch((err) => {
      res
        .status(404)
        .json({ message: "had problems loading contacts", status: 404 });
    });
});

apiRouter.post(
  "/persons",
  middlewareMissingNameOrNumber,
  middlewareNameAlreadyExist,
  (req, res) => {
    const contact = new Contact({
      name: req.body.name,
      number: req.body.number,
    });
    contact
      .save()
      .then((result) => {
        res.status(200).json({
          message: "Success! Contact was added successfully",
        });
      })
      .catch((err) => {
        res.status(401).json({
          message: "Failed! Contact was Not added",
        });
      });
  }
);

apiRouter.delete("/persons/:id/remove", middlewareNameNotExist, (req, res) => {
  Contact.findByIdAndRemove(req.params.id)
    .then((reuslt) => {
      res.status(200).json({
        message: "Success! Contact was deleted successfully",
      });
    })
    .catch((err) => {
      res.status(401).json({
        message: "Failed! Contact not deleted successfully",
      });
    });
});

apiRouter.put("/persons/update", middlewareMissingNameOrNumber, (req, res) => {
  Contact.findOneAndUpdate({ name: req.body.name }, { number: req.body.number })
    .then((reuslt) => {
      res.status(200).json({
        message: "Success! Contact was updated successfully",
      });
    })
    .catch((err) => {
      res.status(401).json({
        message: "Failed! Contact not updated successfully",
      });
    });
});

module.exports = apiRouter;
