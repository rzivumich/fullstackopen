const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

var morgan = require('morgan')
morgan.token('info', function getInfo(req){
  const body = req.body
  return JSON.stringify({name: body.name, number: body.number})
})

app.use(morgan('tiny'))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :info'))

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: 'Ada Lovelace', 
    number: '39-44-5323523',
    id: 4,
  },
  {
    name: 'Dan Abramov', 
    number: '12-43-234345',
    id: 3
  },
  {
    name: 'Mary Poppendieck', 
    number: '39-23-6423122',
    id: 4
  }
]

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  response.json(person)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  return Math.floor(Math.random() * 100 )
}

app.post('/api/persons', (request, response) => {
  const body = request.body

  if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }
  else if(!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }
  else if(persons.some(el =>
    el.name === body.name)) {
    return response.status(400).json({
      error: 'name must be unique'
    })
  }
  

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/api/persons', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons = persons.concat(person)

  response.json(person)
})

app.get('/api/info', (req, res) => {
  const num_people = persons.length
  res.send('<p>Phonebook has info for ' + num_people + ' people</p>' + Date().toString())

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})