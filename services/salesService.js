const salesModel = require('../models/salesModel');

const error404 = { status: 404, message: 'Sale not found' };

const getSales = async (id = null) => {
  if (id) {
    const row = await salesModel.getById(id);
    if (!row[0].length) throw error404;
    return row;
  }
  return salesModel.getAll();
};

module.exports = {
  getSales,
};
