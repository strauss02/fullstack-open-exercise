const express = require("express");
const router = express.Router();

const {getAllContacts,getById, removeById, newContact, nameIsExists, updateNumber} = require("../controllers/person")

router.get("/", getAllContacts)
router.get("/:id", getById)
router.delete("/:id", removeById)
router.post("/", newContact)
router.get("/name/:name", nameIsExists)
router.put("/updateNumber", updateNumber)




module.exports = router