/* ============== Import Tools =============== */

require('dotenv').config()
const express = require('express')
const app = express()
const data = require('./data.json')
const fs = require('fs')
// const morgan = require('morgan')
const cors = require('cors')

const errorHandler = require('./errorHandler.js')
const Contact = require('./models/contact.js')

/* ================ Middleware ============= */

app.use(cors())
app.use(express.json())

// morgan.token('body', (req, res) => JSON.stringify(req.body))
// app.use(
//   morgan(':method :url :status :req[content-length] :response-time ms - :body')
// )
/* ================ Utility Functions ============= */

/* ================ Routing ============= */

app.use(express.static('./client'))

/* ================ Test Zone ============= */

/* ================ End Test Zone ============= */

app.get('/api/persons', (req, res) => {
  Contact.find({}).then((contacts) => {
    res.json(contacts)
  })
})

app.get('/api/info', async (req, res) => {
  const num = await Contact.countDocuments()
  res.send(`Phonebook has info for ${num} people. <br><br> ${new Date()}`)
})

/**
 * Get a person according to his ID.
 */
app.get('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  Contact.findById(id)
    .then((contact) => {
      if (contact) {
        res.json(contact)
      } else {
        res.status(404).end()
      }
    })
    .catch((err) => next(err))
})

/**
 * Allows user to create a new phonebook entry.
 */
app.post('/api/persons', async (req, res) => {
  const body = req.body
  const contacts = await Contact.find({}).then((res) => res)
  // Assert content not empty
  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'content missing' })
  } else if (contacts.some((contact) => contact.name === body.name)) {
    return res.status(400).json({
      thisis: 'sparta',
      error: 'name must be unique',
    })
  }
  const contact = await new Contact({
    name: body.name,
    number: body.number,
  })
  console.log('contact is:', contact)

  contact
    .save()
    .then((savedNote) => {
      console.log('save success zone')
      res.send('saved!')
    })
    .catch((err) => {
      console.log(
        `There was an error trying to save data. Error: ${err.message}`
      )
      res.end('There was an error while trying to save!')
    })
})

/**
 * Allows user to delete an existing phonebook entry.
 */
app.delete('/api/persons/:id', (req, res, next) => {
  const id = req.params.id

  Contact.findByIdAndRemove(id)
    .then((result) => {
      res.status(204).end()
    })
    .catch((err) => next(err))
})

app.use(errorHandler)

/* ================ Listening Port ============= */
// const PORT = process.env.PORT || 3001

const PORT = process.env.PORT

app.listen(PORT, () => console.log('server running on ', PORT))
