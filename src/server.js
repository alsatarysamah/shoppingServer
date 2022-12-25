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
const orderRoutes = require("../src/router/order");



// Prepare the express app
const app = express();
app.use(cors("*"));

app.get("/", (req, res) => {
  res.send("Home");
});

// App Level MW
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(authRoutes);
app.use(itemRoutes);
app.use(orderRoutes);


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
