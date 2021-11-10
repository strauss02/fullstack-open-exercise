'use strict'
const express = require('express')
const app = express()
const cors = require('cors')
const PORT = process.env.PORT || 3001
const infoRouter = require('./back-end/routers/info')
const apiRouter = require('./back-end/routers/api')
const mongoose = require('mongoose')
require('dotenv').config()

// DB
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
  })
  .then(() => console.log('DB Connected'))
  .catch((error) => console.log(error))

//MiddleWares
// const morgan = require('morgan');
const {
  errorHandlerMiddleware,
} = require('./back-end/middlewares/errorHandler')

app.use(
  cors({
    origin: '*',
  })
)

app.use(express.json()) // parses requests as json

//Home Page - staticFile
app.use('/', express.static('./front-end'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + './front-end/index.html')
})

// Use morgen as middleware (3.7 + 3.8)
// morgan.token('body', (req, res) => JSON.stringify(req.body))
// app.use( morgan(':method :url :status :req[content-length] :response-time ms - :body') )

//Routers Use
app.use('/api', apiRouter)
app.use('/info', infoRouter)

app.use(errorHandlerMiddleware)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
