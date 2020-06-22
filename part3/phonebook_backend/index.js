const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

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
  Person.find({}).then(persons =>{
    res.json(persons.map(person => person.toJSON()))
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id).then(person => {
    if(person){
      response.json(person.toJSON())
    }
    else{
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const generateId = () => {
  return Math.floor(Math.random() * 100 )
}

app.post('/api/persons', (request, response, next) => {
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
  

  const person = new Person({
    name: body.name,
    number: body.number,
    id: generateId(),
  })

  person.save()
  .then(savedPerson => savedPerson.toJSON())
  .then(savedAndFormattedPerson => {
    response.json(savedAndFormattedPerson)
  }) 
  .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => next(error))
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

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

app.get('/api/info', (req, res) => {
  //const num_people = persons.length
  Person.find({}).then(person =>
    res.send('<p>Phonebook has info for ' + person.length + ' people</p>' + Date().toString())
  )
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})