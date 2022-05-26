const salesService = require('../services/salesService');

const getSales = async (req, res) => {
  const { id } = req.params;
  const [response] = await salesService.getSales(+id);

  res.status(200).json(response);
};

module.exports = { getSales };
