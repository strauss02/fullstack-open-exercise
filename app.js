/* ============== Import Tools =============== */

const express = require('express')
const app = express()
const data = require('./data.json')
const fs = require('fs')
const morgan = require('morgan')
const cors = require('cors')

const errorHandler = require('./errorHandler.js')

/* ================ Middleware ============= */

app.use(cors())
app.use(express.json())

// morgan.token('body', (req, res) => JSON.stringify(req.body))
// app.use(
//   morgan(':method :url :status :req[content-length] :response-time ms - :body')
// )
/* ================ Utility Functions ============= */

const generateId = () => {
  const maxId = data.length > 0 ? Math.max(...data.map((n) => n.id)) : 0
  return maxId + 1
}

/* ================ Routing ============= */

app.use(express.static('./client'))

app.get('/api/persons', (req, res) => {
  res.send(data)
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
  const id = Number(req.params.id)
  const person = data.find((person) => person.id === id)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

/**
 * Allows user to create a new phonebook entry.
 */
app.post('/api/persons', (req, res) => {
  const body = req.body

  // Assert content not empty
  if (!body.name || !body.number) {
    return res.status(400).json({ error: 'content missing' })
  } else if (data.some((person) => person.name === body.name)) {
    return res.status(400).json({
      error: 'name must be unique',
    })
  }
  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
    date: new Date(),
  }
  const newData = data.concat(person)
  fs.writeFileSync('./data.json', JSON.stringify(newData))
  res.json(person)
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

const PORT = 3001
app.listen(PORT, () => console.log('server running on ', PORT))
