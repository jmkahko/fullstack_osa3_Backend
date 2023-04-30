const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('Connecting to ', url)

mongoose.connect(url)
  .then(() => {
    console.log('Connect to MongoDB')
  })
  .catch(error => {
    console.log('Error connecting to MongoDB: ', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: function(valid) {
        if (/\d{2}-[0-9]{6,15}/.test(valid)) {
          return true
        } else if (/\d{3}-[0-9]{5,15}/.test(valid)) {
          return true
        } else {
          return false
        }
      }
    },
    required: true
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Persons', personSchema)