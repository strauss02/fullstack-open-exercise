const Contact = require("../models/person")

exports.getAllContacts = async (req,res,next) =>{
    try {
        const contactsList = await Contact.find({})
        res.json(contactsList)        
    } catch (error) {
        next(error)
    }
}

exports.getById = async (req,res,next) =>{
    try {
        const id = req.params.id;
        const contactWithId = await Contact.findById(id)
        res.json(contactWithId);
    } catch (error) {
        next({
            status: 400,
            message: 'invalid id'
        });
    }
}

exports.removeById = async(req,res,next) =>{
    try {
        const id = req.params.id;
        await Contact.findByIdAndRemove(id)
        res.status(204).end()
    } catch (error) {
        next({status: 400, message: "invalid id"})
    }
}

exports.newContact = async(req,res,next) =>{
    try {
        const body = req.body;
        if(!body.name || !body.number){
            next({
                status: 404,
                message: 'name or number is missing'
            });
        }
        const person = new Contact ({
            name: body.name,
            number: body.number,
        });
        person.save().then(savedPerson => {
            res.json(savedPerson)
        }).catch(err =>
            next({
                status: 404,
                message: 'name is taken'
            })
        )
    } catch (error) {
        next()
    }
}

exports.nameIsExists = async(req,res,next)=>{
    try {
        const _name = req.params.name;
        console.log(_name)
        const nameExist = await Contact.find({name: _name})
        if(nameExist.length){
            res.send(nameExist[0].id)
        }else{
            res.send(false)
        }
    } catch (error) {
        
    }
}

exports.updateNumber = async(req,res,next)=>{
    Contact.findOneAndUpdate({ id: req.params.name}, { number: req.body.number })
    .then(console.log('updated'))
    .catch(err =>(
        next(err)
    )
}


