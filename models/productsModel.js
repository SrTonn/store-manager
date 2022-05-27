const connection = require('../db');

const getAll = () => connection.execute('SELECT * FROM StoreManager.products');

const getById = (id) => connection.execute(
  'SELECT * FROM StoreManager.products WHERE id = ?', [id],
);

const create = async ({ name, quantity }) => {
  const [result] = await connection.execute(
    'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );

  return {
    id: result.insertId,
  };
};

module.exports = {
  getAll,
  getById,
  create,
};
