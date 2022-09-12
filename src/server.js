"use strict";

// 3rd Party Resources
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Esoteric Resources
const errorHandler = require("./error-handlers/500.js");
const notFound = require("./error-handlers/404.js");
const authRoutes = require("./router/index.js");

const itemRoutes = require("../src/router/item");

// Prepare the express app
const app = express();
app.get("/", (req, res) => {
  res.send("Home");
});

// App Level MW
app.use(cors());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);
app.use(itemRoutes);

// Catchalls
app.use(notFound);
app.use(errorHandler);

module.exports = {
  server: app,
  startup: (port) => {
    app.listen(port, () => {
      console.log(`Server Up on ${port}`);
    });
  },
};
