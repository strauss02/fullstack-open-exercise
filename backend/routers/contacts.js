"use strict";
const express = require("express");
const apiRouter = express.Router();
const fs = require("fs");
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

apiRouter.get("/api/persons", (req, res) => {
  let dataBase = returnDataBase();
  res.json(dataBase);
});

module.exports = apiRouter;
