const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const args = process.argv
const password = args[2]
const url = `mongodb://puhelinluettelo:${password}@ds119445.mlab.com:19445/goosemon`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

if (args.length === 3) {
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
} else if (args.length === 5) {
  const person = new Person({
    name: `${args[3]}`,
    number: `${args[4]}`
  })
  console.log(`Lisätään ${person.name} numero ${person.number} luetteloon`)
  person.save().then(() => {
    mongoose.connection.close()
  })
} else {
  console.log('Virheelliset parametrit')
  mongoose.connection.close()
}

