require("dotenv").config();
const express = require("express");
const app = express();
const notFoundMiddleware = require("./middleware/notFound");
const errorMiddleware = require("./middleware/errorHandler");

// middleware
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res
    .status(200)
    .send('<h1>Store API</h1><a href="/api/v1/products">Products</a>');
});

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
