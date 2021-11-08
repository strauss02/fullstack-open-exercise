"use strict";
const express = require("express");
const infoRouter = express.Router();
const fs = require("fs");
const moment = require("moment");
const path = require("path");

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

infoRouter.get("/", (req, res) => {
  let dataBase = returnDataBase();
  res.send(
    `<h4>Phonebook has info for ${
      returnDataBase().length
    } people<h4><br><p>request sent on: ${moment()}<p>`
  );
});

module.exports = infoRouter;
