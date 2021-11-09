const mongoose = require('mongoose')

const url = process.env.MONGODB_URI
console.log('connecting to' + url);

mongoose.connect(url)
.then(()=>{
    console.log("connected")
})
.catch((err)=>{
    console.log('error connecting to MongoDB:', err.message);
})

const contactSchema = new mongoose.Schema({
    name: {type: String, required: true},
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