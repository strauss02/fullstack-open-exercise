const Contact = require("../models/person")

exports.getAllContacts = async (req,res) =>{
    try {
        const contactsList = await Contact.find({})
        res.json(contactsList)        
    } catch (error) {
        res.send(error.message)
    }
}

exports.getById = async (req,res,next) =>{
    try {
        const id = req.params.id;
        const contactWithId = await Contact.findById(id)
        if(contactWithId){
            res.json(contactWithId);
        } else {
            res.status(404).end
        }
    } catch (error) {
        next(error)
    }
}

exports.removeById = async(req,res,next) =>{
    try {
        const id = req.params.id;
        await Contact.findByIdAndRemove(id)
        res.status(204).end()
    } catch (error) {
        next(error)
    }
}

