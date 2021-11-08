"use strict";
const path = require("path");
const express = require("express");
const cors = require("cors");
const app = express();
const {
  middlewareServerError,
  middlewarePageNotFound,
} = require("./middleware/errorhandle");

const apiRouter = require("./routers/contacts");
const infoRouter = require("./routers/info");

app.use(express.json());
app.use(cors());

app.use(middlewareServerError);
app.use(middlewarePageNotFound);

// morgan.token("body", (req, res) => JSON.stringify(req.body));
// app.use(
//   morgan(":method :url :status :res[content-length] - :response-time ms :body")
// );

app.use("/api", apiRouter);
app.use("/info", infoRouter);

app.use("/", express.static("frontend")); // serve main path as static dir
app.get("/", function (req, res) {
  // serve main path as static file
  res.sendFile(path.resolve("../frontend/index.html"));
});

app.listen(process.env.PORT || 3001, () => console.log("Server is running..."));
