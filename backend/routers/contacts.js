"use strict";
const express = require("express");
const apiRouter = express.Router();
const fs = require("fs");
const path = require("path");
const errorMiddleware = require("../middleware/errorhandle");

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
  create new contact
*/
class Person {
  constructor(name, phoneNumber) {
    this.id = Math.floor(Math.random() * 200);
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
  errorMiddleware.middlewareMissingNameOrNumber,
  errorMiddleware.middlewareNameAlreadyExist,
  (req, res) => {
    let dataBase = returnDataBase();
    dataBase.push(new Person(req.body.name, req.body.number));
    saveDataBase(dataBase);
    res.json(dataBase);
  }
);

apiRouter.delete("/persons/:id/remove", (req, res) => {
  let dataBase = returnDataBase();
  try {
    const currentUser = dataBase.indexOf(
      dataBase.find(({ id }) => id === req.params.id)
    );
    dataBase.splice(currentUser, 1);
    saveDataBase(dataBase);
    res.json(dataBase);
  } catch {
    res.status(404).json({ message: "no such person", status: 404 });
  }
});

module.exports = apiRouter;
