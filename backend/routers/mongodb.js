const mongoose = require("mongoose");
require("dotenv").config();
const uniqueValidator = require("mongoose-unique-validator");

mongoose
  .connect(process.env.DBURL)
  .then((result) => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
const Schema = mongoose.Schema;
const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    number: {
      type: String,
      minLength: 8,
      required: true,
    },
  },
  { timestamps: true }
);

contactSchema.plugin(uniqueValidator);

const Contact = mongoose.model("Contact", contactSchema);

module.exports = { Contact };
