const ProductsService = require('../services/productsService');

const getProducts = async (req, res) => {
  const { id } = req.params;
  const [row] = await ProductsService.getProducts(id);
  res.status(200).json(row);
};

const createProducts = async (req, res) => {
  const { name, quantity } = req.body;
  const { id } = await ProductsService.create({ name, quantity });

  const response = { id, name, quantity };

  res.status(201).json(response);
};

const updateProducts = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  await ProductsService.update({ id, name, quantity });

  const response = { id, name, quantity };
  res.status(200).json(response);
};

module.exports = {
  getProducts,
  createProducts,
  updateProducts,
};
