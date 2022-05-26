const salesService = require('../services/salesService');

const serializeGetAll = (sale) => ({
  saleId: sale.sale_id,
  productId: sale.product_id,
  quantity: sale.quantity,
  date: sale.date,
});

const serializeGetById = (sale) => ({
  productId: sale.product_id,
  quantity: sale.quantity,
  date: sale.date,
});

const getSales = async (req, res) => {
  try {
    const { id } = req.params;
    const [response] = await salesService.getSales(+id);

    const newResponse = response.map(id ? serializeGetById : serializeGetAll);

    res.status(200).json(newResponse);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = { getSales };
