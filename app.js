require("dotenv").config();
require("express-async-errors");
const path = require("path");
const express = require("express");
const app = express();
const productsRouter = require("./routes/products");
const notFoundMiddleware = require("./middleware/notFound");
const errorMiddleware = require("./middleware/errorHandler");

// middleware
app.use(express.json());

// static site
app.use("/", express.static(path.join(__dirname, "public")));

// products route
app.use("/api/v1/products", productsRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

module.exports = app;
