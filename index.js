"use strict"
const express = require('express')
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const path = require("path");
const fs = require("fs");

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
  
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })