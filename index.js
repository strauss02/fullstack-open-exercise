"use strict"
const express = require('express')
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const path = require("path");
const fs = require("fs");
const moment = require("moment");

app.use(cors({
    origin: "*"
  }));
  
app.use(express.json()) // parses requests as json


  app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
  })
  
//Get request for phoneBook data (3.1)
app.get('/api/persons', (request, response) => {
    const dataFilePath = path.resolve(__dirname, "./phoneBook.json");
    const phoneBookData = JSON.parse(fs.readFileSync(dataFilePath));
    response.json(phoneBookData);
})

//Get request for phoneBook info & request time (3.2)
app.get('/info', (request, response) => {
    const dataFilePath = path.resolve(__dirname, "./phoneBook.json");
    const phoneBookData = JSON.parse(fs.readFileSync(dataFilePath));
    
    response.send(`<p>PhoneBook has info for ${phoneBookData.length} people</p>
    <p>${moment().format('llll')}</p>`);
})
  
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })