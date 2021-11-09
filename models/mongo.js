const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://ramabadash:${password}@cluster0.vfocj.mongodb.net/phoneBook?retryWrites=true&w=majority`

mongoose.connect(url)

const contactsSchema = new mongoose.Schema({
  name: {type: String, required: true},
  number: {type: String, required: true},
})

const Contact = mongoose.model('Contact', contactsSchema)

const contact = new Contact({
  name: "rama",
  number: "01515161",
})

Contact
  .find({})
  .then(persons=> {
    console.log(persons);
    mongoose.connection.close();
})

contact.save().then(result => {
  console.log('contact saved!')
  mongoose.connection.close()
})