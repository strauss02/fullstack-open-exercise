const express = require("express");
const router = express.Router();

const {getAllContacts,getById, removeById} = require("../controllers/person")

router.get("/", getAllContacts)
router.get("/:id", getById)
router.delete("/:id", removeById)


router.post("/api/persons", (request,response)=>{
    const body = request.body;
    const parsonName = body.name;
    const parsonNumber = body.number;
    const name = persons.find(person => person.name === parsonName);
    if(!parsonName || !parsonNumber){
        response.status(404).json({
            error: 'name or number is missing'
        });
    } else if (name){
        response.status(404).json({
            error: 'name must be unique'
        });
    } else {
        const person = {
            id: Math.floor(Math.random() * 555),
            name: body.name,
            number: body.number,
        };
        persons.unshift(person);
        response.json(person);
    }
})


module.exports = router