const salesModel = require('../models/salesModel');
const { CustomError } = require('../utils/customError');

const getSales = async (id = null) => {
  if (id) {
    const row = await salesModel.getById(id);
    if (!row[0].length) throw new CustomError({ status: 404, message: 'Sale not found' });
    return row;
  }
  return salesModel.getAll();
};

module.exports = {
  getSales,
};
