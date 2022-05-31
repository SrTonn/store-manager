const salesModel = require('../models/salesModel');
const ProductsModel = require('../models/productsModel');

const error404 = { status: 404, message: 'Sale not found' };
const error422 = { status: 422, message: 'Such amount is not permitted to sell' };

const getSales = async (id = null) => {
  if (id) {
    const row = await salesModel.getById(id);
    if (!row[0].length) throw error404;
    return row;
  }
  return salesModel.getAll();
};

const checkProductQuantity = async (salesProducts) => {
  const hasProductQuantityPromise = salesProducts.map(async ({ productId, quantity }) => {
    const [products] = await ProductsModel.getById(productId);

    return products[0].quantity <= quantity;
  });
  const hasProductQuantity = await Promise.all(hasProductQuantityPromise);
  if (hasProductQuantity.includes(true)) throw error422;
};

const create = async (salesProducts) => {
  await checkProductQuantity(salesProducts);

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

const update = async (id, productId, quantity) => {
  await getSales(id);

  await salesModel.updateSale(id, productId, quantity);

  return {
    saleId: +id,
    itemUpdated: [{ productId, quantity }],
  };
};

const remove = async (id) => {
  await getSales(id);

  salesModel.removeSale(id);
};

module.exports = {
  getSales,
  create,
  update,
  remove,
};
