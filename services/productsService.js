const ProductsModel = require('../models/productsModel');

const error404 = { status: 404, message: 'Product not found' };
const error409 = { status: 409, message: 'Product already exists' };

const getProducts = async (id = null) => {
  if (id) {
    const [row] = await ProductsModel.getById(id);
    if (!row.length) throw error404;
    return row;
  }
  return ProductsModel.getAll();
};

const create = async ({ name, quantity }) => {
  const [allProducts] = await getProducts();
  allProducts.forEach((product) => {
    if (product.name === name) throw error409;
  });

  const { id } = await ProductsModel.create({ name, quantity });
  return {
    id,
  };
};

const update = async ({ id, name, quantity }) => {
  await getProducts(id);

  return ProductsModel.update({ id, name, quantity });
};

const remove = async (id) => {
  await getProducts(id);

  await ProductsModel.remove(id);
};

module.exports = {
  getProducts,
  create,
  update,
  remove,
};
