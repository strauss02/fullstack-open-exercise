"use strict";
const express = require("express");
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
  if (req.body.name && req.body.number) {
    next();
  } else {
    res.status(401).json({
      message: "must include name and number",
      status: 401,
    });
  }
}

/*
   The name already exists in the phonebook
*/
function middlewareNameAlreadyExist(req, res, next) {
  let dataBase = returnDataBase();
  if (
    !dataBase[
      dataBase.indexOf(dataBase.find(({ name }) => name === req.body.name))
    ]
  ) {
    next();
  } else {
    res.status(404).json({
      message: "contact already exist",
      status: 404,
    });
  }
}

/*
   The name not exists in the phonebook for -Delete
*/
function middlewareNameNotExist(req, res, next) {
  let dataBase = returnDataBase();
  if (
    dataBase[
      dataBase.indexOf(dataBase.find(({ id }) => id === Number(req.params.id)))
    ]
  ) {
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
