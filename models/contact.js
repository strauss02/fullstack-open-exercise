const mongoose = require('mongoose')


const contactsSchema = new mongoose.Schema({
    // _id: {
    //   type: Number, 
    //   required: true, 
    //   unique: true
    // },
    name: {
      type: String, 
      required: true, 
      unique: true
    },
    number: {
      type: String,
      required: true
    },
})

contactsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Contact', contactsSchema);
