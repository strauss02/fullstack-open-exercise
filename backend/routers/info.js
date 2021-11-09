"use strict";
const express = require("express");
const infoRouter = express.Router();
const fs = require("fs");
const moment = require("moment");
const path = require("path");
const mongoose = require("mongoose");
const { Contact } = require("./mongodb");

/*
    get database
// */
// function returnDataBase() {
//   let dataBase = fs.readFileSync(
//     path.resolve(__dirname, "../../database.json")
//   );
//   let dataBaseJson = JSON.parse(dataBase.toString());
//   return dataBaseJson;
// }

// /*
//         save database
// */
// function saveDataBase(dataBaseJson) {
//   fs.writeFileSync("database.json", Buffer.from(JSON.stringify(dataBaseJson)));
// }

/*
        get all contacts info
*/
infoRouter.get("/", (req, res) => {
  Contact.find()
    .then((result) => {
      res.send(
        `<h4>Phonebook has info for ${
          result.length
        } people<h4><br><p>request sent on: ${moment()}<p>`
      );
      mongoose.connection.close();
    })
    .catch((err) => {
      console.log(err);
      mongoose.connection.close();
    });
});

module.exports = infoRouter;
