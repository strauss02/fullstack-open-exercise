"use strict";
const express = require("express");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const { Contact } = require("../routers/mongodb");

// /*
//     get database
// */
// function returnDataBase() {
//   let dataBase = fs.readFileSync(
//     path.resolve(__dirname, "../../database.json")
//   );
//   let dataBaseJson = JSON.parse(dataBase.toString());
//   return dataBaseJson;
// }

/*
    error 500
*/
function middlewareServerError(req, res, next) {
  if (res.statusCode !== 500) {
    next();
  } else {
    res.status(500).json({
      message: "Our servers had an internal problem please comeback later",
      status: 500,
    });
  }
}

/*
    error 404
*/
function middlewarePageNotFound(req, res, next) {
  if (res.statusCode !== 404) {
    next();
  } else {
    res.status(404).json({
      message: "page not exist",
      status: 404,
    });
  }
}

/*
    The name or number is missing
*/
function middlewareMissingNameOrNumber(req, res, next) {
  if (req.body.name && req.body.number && req.body.number.length >= 10) {
    next();
  } else {
    res.status(401).json({
      message: "must include name and valid number (10 digits)",
      status: 401,
    });
  }
}

/*
   The name already exists in the phonebook
*/
function middlewareNameAlreadyExist(req, res, next) {
  Contact.find()
    .then((allcontacts) => {
      for (let contact of allcontacts) {
        if (contact.name === req.body.name) {
          res.status(404).json({
            message: "contact already exist",
            status: 404,
          });
        }
      }
    })
    .catch((err) => {
      res.status(404).json({
        message: "Please try again later",
        status: 404,
      });
    });
  next();
}

/*
   The name not exists in the phonebook for -Delete
*/
function middlewareNameNotExist(req, res, next) {
  if (Contact.find({ _id: req.params.id })) {
    next();
  } else {
    res.status(404).json({
      message: "contact not exist",
      status: 404,
    });
  }
}

module.exports = {
  middlewareServerError,
  middlewarePageNotFound,
  middlewareMissingNameOrNumber,
  middlewareNameAlreadyExist,
  middlewareNameNotExist,
};
