"use strict"
const express = require('express')
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3001;
const infoRouter = require("./routers/info");
const apiRouter = require("./routers/api");
const morgan = require('morgan');
//MiddleWares
const {errorHandlerMiddleware} = require("./middlewares/errorHandler");


app.use(cors({
    origin: "*"
  }));
  
app.use(express.json()) // parses requests as json

// Use morgen as middleware (3.7 + 3.8)
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use( morgan(':method :url :status :req[content-length] :response-time ms - :body') )

//Routers Use
app.use('/api', apiRouter);
app.use('/info', infoRouter);

app.use(errorHandlerMiddleware);
  
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})