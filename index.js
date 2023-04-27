const express = require('express')
const app = express()

app.use(express.json())

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
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})