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

// const generateId = () => {
//   const maxId = data.length > 0 ? Math.max(...data.map((n) => n.id)) : 0
//   return maxId + 1
// }

/* ================ Routing ============= */

app.use(express.static('./client'))

/* ================ Test Zone ============= */
/*
const mongoose = require('mongoose')
const password = 'dozen12' // process.argv[2]
const databaseName = 'phonebookDB'

const url = `mongodb+srv://ido:${password}@cluster0.8yoes.mongodb.net/${databaseName}?retryWrites=true&w=majority`

mongoose.connect(url)

const contactSchema = new mongoose.Schema({
  name: String,
  date: Date,
  number: Number,
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Contact = mongoose.model('Contact', contactSchema)
*/
/* ================ End Test Zone ============= */

app.get('/api/persons', (req, res) => {
  Contact.find({}).then((contacts) => {
    res.json(contacts)
  })
})

app.get('/api/info', (req, res) => {
  res.send(
    `Phonebook has info for ${data.length} people. <br><br> ${new Date()}`
  )
})

/**
 * Get a person according to his ID.
 */
app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id

  Contact.findById(id).then((contact) => res.json(contact))
  // .catch((err) => res.status(404).end())
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
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const newData = data.filter((person) => person.id !== id)
  fs.writeFileSync('./data.json', JSON.stringify(newData))

  res.status(204).end()
})

app.use(errorHandler)

/* ================ Listening Port ============= */
// const PORT = process.env.PORT || 3001

const PORT = process.env.PORT

app.listen(PORT, () => console.log('server running on ', PORT))
