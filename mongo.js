const mongoose = require('mongoose')

const username = process.argv[2]
const password = process.argv[3]
const database = process.argv[4]
const nameParam = process.argv[5]
const numberParam = process.argv[6]

if (process.argv.length === 2) {
  console.log('give username as argument')
  process.exit(1)
} else if (process.argv.length === 3) {
  console.log('give password as argument')
  process.exit(1)
} else if (process.argv.length === 4) {
  console.log('give database as argument')
  process.exit(1)
} else {
  const url = `mongodb+srv://${username}:${password}@${database}?retryWrites=true&w=majority`

  mongoose.set('strictQuery', false)
  mongoose.connect(url)

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })

  const Persons = mongoose.model('Persons', personSchema)

  const person = new Persons({
    name: nameParam,
    number: numberParam
  })

  if (process.argv.length > 6) {
    person.save().then(result => {
      console.log(`added ${result.name} number ${result.number} to phonebook`)
      mongoose.connection.close()
    })
  }

  if (process.argv.length < 6) {
    Persons.find({}).then(result => {
      console.log('phonebook:')
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })
      mongoose.connection.close()
    })
  }
}