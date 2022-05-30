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

const create = async (salesProducts) => {
  const id = await salesModel.addSale();

  const insertedSalesProductsPromise = [];
  salesProducts.map(({ productId, quantity }) => insertedSalesProductsPromise.push(
    salesModel.addSalesProducts(id, productId, quantity),
  ));

  const insertedSalesProducts = await Promise.all(insertedSalesProductsPromise);

  return {
    id,
    itemsSold: insertedSalesProducts,
  };
};

module.exports = {
  getSales,
  create,
};
