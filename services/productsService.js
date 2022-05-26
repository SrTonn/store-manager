const productsModel = require('../models/productsModel');

const error404 = { status: 404, message: 'Product not found' };

const getProducts = async (id = null) => {
  if (id) {
    const [row] = await productsModel.getById(id);
    if (!row.length) throw error404;
    return row;
  }
  return productsModel.getAll();
};

module.exports = {
  getProducts,
};
