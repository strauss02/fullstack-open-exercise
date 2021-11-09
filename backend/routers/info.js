"use strict";
const express = require("express");
const infoRouter = express.Router();
const fs = require("fs");
const moment = require("moment");
const path = require("path");
const mongoose = require("mongoose");
const { Contact } = require("./mongodb");

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
