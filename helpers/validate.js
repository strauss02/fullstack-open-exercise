"use strict"
const path = require("path");
const fs = require("fs");

//Generates a new id and checks if it is unique, if not invents a new one and repeats the process. If unique will return it
function generateId() {
    const id = Math.floor(Math.random()* 10000);;
    const dataFilePath = path.resolve(__dirname, "../phoneBook.json");
    const phoneBookData = JSON.parse(fs.readFileSync(dataFilePath));
    for (const person of phoneBookData) {
        if (Number(person.id) === Number(id)) {
            return generateId(); //The id already exists, create a new one
        }
    }
    return id;
}

//Gets name and path to the data and check if he is uniq 
function validateName(name, path) {
    const phoneBookData = JSON.parse(fs.readFileSync(path));
    for (const person of phoneBookData) {
        if (String(person.name) === String(name)) {
            return false; //The name already exists
        }
    }
    return true;
}

module.exports = {generateId, validateName};