const express = require('express')
const app = express()
const data = require('./data.json')
const fs = require('fs')
const morgan = require('morgan')

app.use(express.json())

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0
  return maxId + 1
}

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
  console.log(id)
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

/* =============================== 

Previous task methods

================================= */
let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true,
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false,
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true,
  },
]

app.post('/api/notes', (req, res) => {
  const body = req.body

  if (!body.content) {
    return res.status(404).json({ error: 'content missing' })
  }
  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  }
  notes = notes.concat(note)
  res.json(note)
})

app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
  res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  console.log(id)
  const note = notes.find((note) => note.id === id)

  if (note) {
    res.json(note)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter((note) => note.id !== id)

  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => console.log('server running on ', PORT))
