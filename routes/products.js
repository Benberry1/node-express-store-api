const express = require("express");
const {
  getAllProducts,
  getAllProductsStatic,
} = require("../controllers/products");
const router = express.Router();

// products route
router.get("/", getAllProducts);

// product testing route
router.get("/static", getAllProductsStatic);

module.exports = router;
