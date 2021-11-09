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
  
const Contact = mongoose.model('Contact', contactSchema)
  
const contect = new Contact({
    name: process.argv[2],
    number: process.argv[3],
})

if(process.argv[2]){
    contect.save().then(result => {
        console.log(`Added ${process.argv[2]}-${process.argv[3]} to phonebook`)
        mongoose.connection.close()
    })
}
  
if(process.argv.length === 2){
    Contact.find({}).then(result => {
        result.forEach(contact =>{
            console.log(contact)
        })
        mongoose.connection.close()
    })
}
