"use strict";
const path = require("path");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const errorMiddleware = require("./middleware/errorhandle");

const apiRouter = require("./routers/contacts");
const infoRouter = require("./routers/info");

app.use(express.json());
app.use(cors());

app.use(errorMiddleware.middlewareServerError);
app.use(errorMiddleware.middlewarePageNotFound);

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body")
);

app.use("/api", apiRouter);
app.use("/info", infoRouter);

app.listen(process.env.PORT || 3001, () => console.log("Server is running..."));
