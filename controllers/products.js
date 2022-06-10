const getAllProducts = async (req, res) => {
  res.status(200).send({ msg: "products testing route" });
};

const getAllProductsStatic = async (req, res) => {
  res.status(200).send({ msg: "static products testing route" });
};

module.exports = { getAllProducts, getAllProductsStatic };
