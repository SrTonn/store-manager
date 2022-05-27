const productsService = require('../services/productsService');

const getProducts = async (req, res) => {
  const { id } = req.params;
  const [row] = await productsService.getProducts(id);
  res.status(200).json(row);
};

const createProducts = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = await ProductsService.create({ name, quantity });

  const response = { id, name, quantity };

  res.status(201).json(response);
};

module.exports = {
  getProducts,
  createProducts,
};
