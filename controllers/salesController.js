const salesService = require('../services/salesService');

const getSales = async (req, res) => {
  const { id } = req.params;
  const [response] = await salesService.getSales(+id);

  res.status(200).json(response);
};

const createSales = async (req, res) => {
  const response = await salesService.create(req.body);

  res.status(201).json(response);
};

const updateSales = async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body[0];

  const response = await salesService.update(id, productId, quantity);

  res.status(200).json(response);
};

const deleteSales = async (req, res) => {
  const { id } = req.params;

  await salesService.remove(id);

  res.status(204).end();
};

module.exports = {
  getSales,
  createSales,
  updateSales,
  deleteSales,
};
