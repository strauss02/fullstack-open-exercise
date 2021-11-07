"use strict"
const express = require('express')
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const path = require("path");
const fs = require("fs");
const moment = require("moment");
const infoRouter = require("./routers/info");
const apiRouter = require("./routers/api");

app.use(cors({
    origin: "*"
  }));
  
app.use(express.json()) // parses requests as json


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})
  
//Routers Use
app.use('/api', apiRouter);
app.use('/info', infoRouter);
  
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })