const mongoose = require('mongoose')

const url = `mongodb+srv://amitfikler:Fikler77@cluster0.x1wij.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url).then(()=>{
    console.log("connected")
})

const contactSchema = new mongoose.Schema({
    content: String,
    date: Date,
    important: Boolean,
})
  
const Contact = mongoose.model('Contact', contactSchema)
  
const note = new Contact({
    content: 'HTML is Easy',
    date: new Date(),
    important: true,
})
  
note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })
