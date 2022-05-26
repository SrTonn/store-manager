const productsService = require('../services/productsService');

const getProducts = async (req, res) => {
  try {
    const { id } = req.params;
    const [row] = await productsService.getProducts(id);
    res.status(200).json(row);
  } catch (error) {
    return res.status(error.status).json({ message: error.message });
  }
};

module.exports = { getProducts };
