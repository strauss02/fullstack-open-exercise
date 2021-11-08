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
  let dataBase = returnDataBase();
  res.json(dataBase);
});

apiRouter.get("/persons/:id", (req, res) => {
  let dataBase = returnDataBase();
  try {
    res.json(dataBase[Number(req.params.id) - 1]);
  } catch (err) {
    res.status(404).json({ message: "no such person", status: 404 });
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
    res.json(dataBase);
  }
);

apiRouter.delete("/persons/:id/remove", middlewareNameNotExist, (req, res) => {
  let dataBase = returnDataBase();
  const currentUser = dataBase.indexOf(
    dataBase.find(({ id }) => id === req.params.id)
  );
  dataBase.splice(currentUser, 1);
  saveDataBase(dataBase);
  res.json(dataBase);
});

module.exports = apiRouter;
