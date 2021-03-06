require("dotenv").config();
const connectDB = require("./db/connect");
const ProductModel = require("./models/products");
const jsonProducts = require("./data/products.json");

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await ProductModel.deleteMany();
    await ProductModel.create(jsonProducts);
    console.log("Success");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
