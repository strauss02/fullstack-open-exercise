//Get info about phoneBook
exports.getInfo = async (req, res) => {
    try {
        await Contact.find({})
        .then((phoneBookData) => {
            res.json({"peopleNum": `PhoneBook has info for ${phoneBookData.length} people`,
                       "date": `${moment().format('llll')}`});
        })
        .catch( (error) => res.status(error.status).send(error.messege) );
    } catch (error) {
        throw {"status": error.status, "messege": error.messege};
    }
}
