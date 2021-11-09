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
  //let dataBase = returnDataBase();
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
  let dataBase = returnDataBase();
  try {
    const contact = dataBase.find(({ id }) => id === Number(req.params.id));
    res.json(contact);
  } catch (err) {
    res.status(404).json({ message: "no such contact", status: 404 });
  }
});

apiRouter.post(
  "/persons",
  middlewareMissingNameOrNumber,
  middlewareNameAlreadyExist,
  (req, res) => {
    let dataBase = returnDataBase();
    dataBase.push(new Person(req.body.name, req.body.number));
    saveDataBase(dataBase);
    res.status(200).json({
      message: "Success! Contact was added successfully",
    });
  }
);

apiRouter.delete("/persons/:id/remove", middlewareNameNotExist, (req, res) => {
  let dataBase = returnDataBase();
  let newdataBase = dataBase.filter(
    (contact) => contact.id !== Number(req.params.id)
  );
  saveDataBase(newdataBase);
  res.status(200).json({
    message: "Success! Contact was deleted successfully",
  });
});

module.exports = apiRouter;
