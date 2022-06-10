require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const productsRouter = require("./routes/products");
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

// product route
app.use("/api/v1/products", productsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
