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
  res.status(404).json({error: 'has not been implemented'})
})

app.post('/api/persons/', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({error: 'data missing name or number'})
  }

  const personNew = new Persons({
    name: body.name,
    number: body.number
  })

  personNew.save().then(savedPerson => {
    res.json(savedPerson)
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})