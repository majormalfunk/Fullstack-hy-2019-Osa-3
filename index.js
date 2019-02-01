const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

morgan.token('type', function (req, res) { return JSON.stringify(req.body) });
var morganFormat = ':method :url :status :res[content-length] - :response-time ms :type';

app.use(cors())
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(morgan(morganFormat))

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '045-1236543'
  },
  {
    id: 2,
    name: 'Arto Järvinen',
    number: '041-21423123'
  },
  {
    id: 3,
    name: 'Lea Kutvonen',
    number: '040-4323234'
  },
  {
    id: 4,
    name: 'Martti Tienari',
    number: '09-784232'
  }
]

app.get('/', (request, response) => {
  response.redirect('/info')
})

// INFO
app.get('/info', (request, response) => {
  const count = persons.length;
  response.send(`<div>Puhelinluettelossa ${count} henkilön tiedot</div><div>${Date()}</div>`)
})

// GET ALL PERSONS
app.get('/api/persons', (request, response) => {
  response.json(persons)
})

const findPersonById = (id) => {
  return persons.find(person => person.id === id)
}
const findPersonByName = (name) => {
  return persons.find(person => person.name === name)
}

// GET ONE PERSON
app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = findPersonById(id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
})

// DELETE ONE PERSON
app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter (person => person.id !== id);
  response.status(204).end();
})

const generateId = () => {
  return Math.floor(Math.random() * Math.floor(Number.MAX_SAFE_INTEGER));
}

// ADD ONE PERSON
app.post('/api/persons', (request, response) => {
  const body = request.body

  if (body.name === undefined) {
    console.log("Name:", body.name)
    return response.status(400).json({
      error: 'Field {name} missing'
    })
  }
  if (body.number === undefined) {
    return response.status(400).json({
      error: 'Field {number} missing'
    })
  }
  const testPerson = findPersonByName(body.name);
  if (testPerson) {
    return response.status(400).json({
      error: `Person with name ${body.name} already exists`
    })
  }

  const person = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(person)

  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
