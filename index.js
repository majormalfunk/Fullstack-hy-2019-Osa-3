if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

morgan.token('type', function (req) { return JSON.stringify(req.body) })
var morganFormat = ':method :url :status :res[content-length] - :response-time ms :type'

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(morgan(morganFormat))

app.get('/', (request, response) => {
  response.redirect('/info')
})

// INFO
app.get('/info', (request, response, next) => {
  Person.count({}, function (err, count) {
    console.log(count)
    response.send(`<div>Puhelinluettelossa ${count} henkilön tiedot</div><div>${Date()}</div>`)
  })
    .catch(error => next(error))
})

// GET ALL PERSONS
app.get('/api/persons', (request, response, next) => {
  Person.find({}).then(persons => {
    response.json(persons.map(person => person.toJSON()))
  })
    .catch(error => next(error))
})

// GET ONE PERSON
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person.toJSON())
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

// DELETE ONE PERSON
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

// UPDATE ONE PERSON
app.put('/api/persons/:id', (request, response) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson.toJSON())
    })
    .catch(error => (error))

})

// ADD ONE PERSON
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then(savedPerson => {
      response.json(savedPerson.toJSON())
    })
    .catch(error => next(error))
})


const errorHandler = (error, request, response, next) => {
  console.log(error.message)
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'Malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
