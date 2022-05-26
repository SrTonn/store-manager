const productsModel = require('../models/productsModel');
const { CustomError } = require('../utils/customError');

const getProducts = async (id = null) => {
  if (id) {
    const [row] = await productsModel.getById(id);
    if (!row.length) throw new CustomError({ status: 404, message: 'Product not found' });
    return row;
  }
  return productsModel.getAll();
};

module.exports = {
  getProducts,
};
