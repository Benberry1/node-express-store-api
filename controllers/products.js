const ProductModel = require("../models/products");

// testing route
const getAllProductsStatic = async (req, res) => {
  const products = await ProductModel.find({});
  res.status(200).send({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  // query parameters
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  // featured parameter either true or false
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }

  // filter by company names as defined in the mongoose schema
  if (company) {
    queryObject.company = company;
  }

  // product name can be searched for. regex is used to allow for a search type of parameter.
  if (name) {
    queryObject.name = { $regex: name, $options: "i" };
  }

  // numericFilters allow search for price and rating
  if (numericFilters) {
    // list of mathematic operators and their equivalent in mongoose queries
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    // function below replaces the mathematical symbol with its mongoose equivalent
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );

    // if price or rating is used then the below function
    // separates the query operator and the numeric value and adds to query object ready to be searched
    const options = ["price", "rating"];
    filters = filters.split(",").forEach((item) => {
      const [field, operator, value] = item.split("-");
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  // all queries are collected into the query object before being submit to mongodb
  let result = ProductModel.find(queryObject);

  // products found are then sorted by default by their createdAt date,
  // otherwise by the input query parameter
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  // fields allows you to search for a particular part of the object. E.g., select only
  // price and name to be shown on response
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
    console.log(result);
  }

  // pagination below: page number can be entered, limit and based on those inputs
  // a set number of products will be skipped and shown. E.g, page=2, limit=10 then first
  // 10 items are skipped.
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  // await result as it is a mongoose query
  const products = await result;
  // nbHits is the total number of products returned via the parameters
  res.status(200).send({ products, nbHits: products.length });
};

module.exports = { getAllProducts, getAllProductsStatic };
