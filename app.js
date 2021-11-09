require('dotenv').config()
const express = require("express");
const app  = express();
const cors = require('cors')
app.use(cors())
app.use(express.json());


const contactRouter = require('./routers/contact')
const eroorHandler = require('./middleware/errorHandler')
const mongoose = require("mongoose");
const errorHandler = require('./middleware/errorHandler');
const url = process.env.MONGODB_URI
console.log('connecting to' + url);

mongoose.connect(url)
.then(()=>{
    console.log("connected")
})
.catch((err)=>{
    console.log('error connecting to MongoDB:', err.message);
})


app.use("/", express.static(`./A Phonebook/Front`));
app.get("/", (req, res) => {
  res.sendFile("./A Phonebook/Front/index.html");
});

app.use("/api/persons", contactRouter)

app.get("/info" , (request,response)=>{
    response.send(
        `<h4> Phonebook has info for ${persons.length} people.</h4>
        <div> ${new Date()} </div>`
    );
});

app.use(errorHandler)

app.listen(process.env.PORT || 3001, () => console.log("Server is running..."));