const productsService = require('../services/productsService');

const getProducts = async (req, res) => {
  const { id } = req.params;
  const [row] = await productsService.getProducts(id);
  res.status(200).json(row);
};

module.exports = { getProducts };
