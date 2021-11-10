/* ===== Import Tools ===== */

const mongoose = require('mongoose')

/* =================== */

// const password = process.argv[2]
// const databaseName = 'phonebookDB'

/* =================== */

const url = process.env.MONGODB_URI

console.log(`connectiong to ${url}`)
// const url = `mongodb+srv://ido:${password}@cluster0.8yoes.mongodb.net/${databaseName}?retryWrites=true&w=majority`

/* =================== */

mongoose
  .connect(url)
  .then((res) => {
    console.log('Connected to MongoDB')
  })
  .catch((err) => {
    console.log(`Connection failed to MongoDB. error: ${err.message}`)
  })

/* =================== */

const contactSchema = new mongoose.Schema({
  name: String,
  date: Date,
  number: Number,
})

contactSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

/* =================== */

module.exports = mongoose.model('Contact', contactSchema)

/* =================== */

// const Contact = mongoose.model('Contact', contactSchema)

/*
const contact = new Contact({
  name: process.argv[3],
  date: new Date(),
  number: process.argv[4],
})
*/

/*
if (process.argv.length <= 3) {
  mongoose.connect(url)

  console.log(
    `Seems like you only entered a password. So I'm  gonna give you all the entries.`
  )
  getAllContacts()
}
*/

/*
if (process.argv.length > 3) {
  mongoose.connect(url)

  contact.save().then((result) => {
    console.log(
      `added ${contact.name}, with the number of ${contact.number} to phoneBook.`
    )
    mongoose.connection.close()
  })
}
*/

// mongoose.connection.close()

/* =====================  */

/*
function getAllContacts() {
  Contact.find({}).then((result) => {
    result.forEach((contact) => {
      console.log(contact)
    })
    mongoose.connection.close()
  })
}
*/
