"use strict";
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("hello word");
});

app.listen(process.env.PORT || 3001, () => console.log("Server is running..."));
