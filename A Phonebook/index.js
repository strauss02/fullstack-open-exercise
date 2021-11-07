const { request, response } = require("express")
const express = require("express")
const app  = express()
const morgan = require('morgan')
app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/api/persons", (request,response)=>{
    response.json(persons)
})

app.get("/info" , (request,response)=>{
    response.send(
        `<h4> Phonebook has info for ${persons.length} people.</h4>
        <div> ${new Date()} </div>`
    )
})

app.get("/api/persons/:id", (request,response)=>{
    const id = Number(request.params.id)
    const person = persons.find(note => note.id === id)
    if(person){
        response.json(person)
    } else{
        response.status(404).end()
    }
})



app.delete("/api/persons/:id", (request,response)=>{
    const id = Number(request.params.id)
    persons = persons.filter(note => note.id !== id)
    response.status(204).end()
})


app.post("/api/persons", (request,response,next)=>{
    const body = request.body
    const parsonName = body.name
    const parsonNumber = body.number
    const name = persons.find(person => person.name === parsonName)
    if(!parsonName || !parsonNumber){
        response.status(404).json({
            error: 'name or number is missing'
        })
    } else if (name){
        response.status(404).json({
            error: 'name must be unique'
        })
    } else {
        const person = {
            id: Math.floor(Math.random() * 555),
            name: body.name,
            number: body.number,
        }
        persons = persons.concat(person)
        response.json(person)
    }
})



const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})