const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Persons = require('./models/persons')

const errorHandler = (error, req, res, next) => {
  console.log(error.message)

  if (error.message === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

const unknownEndPoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

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
  Persons.find({})
  .then(person => {
    res.json(person)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Persons.findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => { next(error) })
})

app.delete('/api/persons/:id', (req, res, next) => {
  Persons.findByIdAndRemove(req.params.id)
    .then(removed => {
      res.status(204).end()
    })
    .catch(error => { next(error) })
})

app.post('/api/persons/', (req, res, next) => {
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
  .catch(error => { next(error) })
})

app.use(unknownEndPoint)
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})