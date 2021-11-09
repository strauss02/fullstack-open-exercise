const mongoose = require('mongoose')


const contactSchema = new mongoose.Schema({
    name: {type: String, required: true, unique:true},
    number: {type: String, required: true},
})

contactSchema.set('toJSON',{
    transform:(document, returnedObj) =>{
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})
  
module.exports = mongoose.model('Contact', contactSchema)