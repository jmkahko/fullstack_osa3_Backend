const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Persons = require('./models/persons')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

morgan.token('bodyData', function getType (res) {
  return JSON.stringify({name: res.body.name, number: res.body.number})
})
app.use(morgan(':method :url :status :response-time ms :bodyData'))

let persons = [
  {
    "name": "Janne Kähkönen",
    "number": "050-1234567",
    id: 1
  },
  {
    "name": "Aku Ankka",
    "number": "050-313",
    id: 2
  },
  {
    "name": "Roope-Setä",
    "number": "050-3131",
    id: 3
  },
  {
    "name": "Tupu",
    "number": "050-3132",
    id: 4
  },
  {
    "name": "Hupu",
    "number": "050-3133",
    id: 5
  },
  {
    "name": "Lupu",
    "number": "041-1234",
    id: 6
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Full Stack open -kurssin osa3</h1>')
})

app.get('/info', (req, res) => {
  const date = new Date()
  res.send('Phonebook has info for ' + persons.length + ' people <br/>' + date.toDateString() + " " + date.toTimeString())
})

app.get('/api/persons', (req, res) => {
  Persons.find({}).then(person => {
    res.json(person)
  })
})

app.get('/api/persons/:id', (req, res) => {
  Persons.findById(req.params.id)
    .then(person => {
      res.json(person)
    })
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

const generateId = () => {
  return Math.floor(Math.random() * 1000000000)
}

app.post('/api/persons/', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({error: 'data missing name or number'})
  }

  const findOldPerson = persons.find(person => person.name === body.name)

  if (findOldPerson) {
    return res.status(405).json({error: 'name must be unique'})
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId()
  }

  persons = persons.concat(person)

  res.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})